import { PhotoMemory } from '../types';

const DB_NAME = 'WifeBirthdayAppDB';
const DB_VERSION = 1;
const STORE_NAME = 'memories';
const STORAGE_KEY = 'forever_with_you_wife_memories';
const LEGACY_STORAGE_KEY = 'fairytale_birthday_memories_v4';

/**
 * Open or create IndexedDB instance for large photo storage
 */
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Compresses an image file to a lightweight, crystal-clear Web-ready JPEG Base64
 * (Prevents browser freeze and QuotaExceeded errors on 5MB-20MB phone/PC photos)
 */
export function compressImageFile(
  file: File, 
  maxWidth = 1200, 
  maxHeight = 1600, 
  quality = 0.85
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Scale down proportionally if larger than maximum bounds
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(result);
          return;
        }

        // Crisp image rendering
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to optimized JPEG
        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedDataUrl);
      };

      img.onerror = () => resolve(result);
      img.src = result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Save memories to both IndexedDB (unlimited capacity) and LocalStorage (fallback)
 */
export async function saveMemoriesToStorage(memories: PhotoMemory[]): Promise<void> {
  // 1. Try saving to IndexedDB (permanent browser storage)
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    
    // Clear and put all
    store.clear();
    for (const mem of memories) {
      store.put(mem);
    }
    
    await new Promise<void>((resolve, reject) => {
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch (err) {
    console.warn('IndexedDB save failed, falling back to localStorage:', err);
  }

  // 2. Try saving to localStorage (both keys for max safety)
  try {
    const serialized = JSON.stringify(memories);
    localStorage.setItem(STORAGE_KEY, serialized);
    localStorage.setItem(LEGACY_STORAGE_KEY, serialized);
  } catch (err) {
    console.warn('LocalStorage save warning (possibly exceeded quota):', err);
  }
}

/**
 * Load memories from IndexedDB, falling back to LocalStorage
 */
export async function loadMemoriesFromStorage(defaultMemories: PhotoMemory[]): Promise<PhotoMemory[]> {
  // 1. Try IndexedDB first (most reliable for large custom uploaded photos)
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const request = store.getAll();

    const items = await new Promise<PhotoMemory[]>((resolve, reject) => {
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });

    if (items && items.length > 0) {
      return items;
    }
  } catch (err) {
    console.warn('IndexedDB load failed, trying localStorage:', err);
  }

  // 2. Fallback to LocalStorage (checking both active and legacy keys)
  try {
    const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {
    // ignore
  }

  return defaultMemories;
}
