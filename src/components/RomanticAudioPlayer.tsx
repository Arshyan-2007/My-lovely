import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Volume2, VolumeX, Music, Sparkles, Play, Pause, Heart } from 'lucide-react';

interface MelodyNote {
  freq: number;
  time: number;
  duration: number;
}

export const RomanticAudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.65);
  const [themeMode, setThemeMode] = useState<'fairytale' | 'musicbox' | 'harp'>('fairytale');
  const [showControls, setShowControls] = useState<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const loopTimerRef = useRef<number | null>(null);
  const activeOscillatorsRef = useRef<{ stop: () => void }[]>([]);

  // Frequency definitions for romantic chords
  const NOTES: Record<string, number> = {
    // Octave 3 & 4
    F3: 174.61, A3: 220.00, C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00,
    Bb3: 233.08, D3: 146.83, G3: 196.00, Bb2: 116.54, C3: 130.81, F2: 87.31,
    C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880.00
  };

  const getAudioContext = useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(volume, ctx.currentTime);
      masterGain.connect(ctx.destination);

      audioCtxRef.current = ctx;
      masterGainRef.current = masterGain;
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return { ctx: audioCtxRef.current, masterGain: masterGainRef.current! };
  }, [volume]);

  const playTone = useCallback((freq: number, startTime: number, duration: number, style: 'fairytale' | 'musicbox' | 'harp') => {
    const { ctx, masterGain } = getAudioContext();
    if (!ctx || !masterGain) return;

    // Primary bell/piano tone
    const osc = ctx.createOscillator();
    const overtoneOsc = ctx.createOscillator();
    const noteGain = ctx.createGain();

    if (style === 'musicbox') {
      osc.type = 'sine';
      overtoneOsc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);
      overtoneOsc.frequency.setValueAtTime(freq * 2, startTime);
    } else if (style === 'harp') {
      osc.type = 'triangle';
      overtoneOsc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);
      overtoneOsc.frequency.setValueAtTime(freq * 1.5, startTime);
    } else {
      // Fairytale Piano-Celesta Hybrid
      osc.type = 'sine';
      overtoneOsc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);
      overtoneOsc.frequency.setValueAtTime(freq * 2.01, startTime);
    }

    // Soft romantic envelope
    const attack = style === 'musicbox' ? 0.02 : 0.05;
    const release = duration * 1.5;

    noteGain.gain.setValueAtTime(0.0001, startTime);
    noteGain.gain.linearRampToValueAtTime(style === 'musicbox' ? 0.14 : 0.16, startTime + attack);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + attack + release);

    // Warm Lowpass Filter for dreamy ambiance
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(style === 'musicbox' ? 2400 : 1800, startTime);

    osc.connect(filter);
    overtoneOsc.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(masterGain);

    osc.start(startTime);
    overtoneOsc.start(startTime);
    osc.stop(startTime + attack + release + 0.1);
    overtoneOsc.stop(startTime + attack + release + 0.1);

    activeOscillatorsRef.current.push({
      stop: () => {
        try {
          osc.stop();
          overtoneOsc.stop();
        } catch {
          // already stopped
        }
      }
    });
  }, [getAudioContext]);

  const schedulePhrase = useCallback(() => {
    if (!isPlaying) return;
    const { ctx } = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const beat = 0.55; // Gentle and slow romantic waltz/ballad tempo

    // Romantic Arpeggio Sequence: Fmaj7 -> Dm9 -> Bbmaj9 -> C9sus4
    const chords: { bass: number; notes: number[]; melody: { offset: number; note: number }[] }[] = [
      {
        bass: NOTES.F2,
        notes: [NOTES.F3, NOTES.A3, NOTES.C4, NOTES.E4, NOTES.A4],
        melody: [
          { offset: 0, note: NOTES.C5 },
          { offset: beat * 2, note: NOTES.E5 },
          { offset: beat * 3.5, note: NOTES.F5 },
          { offset: beat * 5, note: NOTES.E5 }
        ]
      },
      {
        bass: NOTES.D3,
        notes: [NOTES.D3, NOTES.F3, NOTES.A3, NOTES.C4, NOTES.E4],
        melody: [
          { offset: 0, note: NOTES.D5 },
          { offset: beat * 2, note: NOTES.F5 },
          { offset: beat * 4, note: NOTES.A5 },
          { offset: beat * 6, note: NOTES.G5 }
        ]
      },
      {
        bass: NOTES.Bb2,
        notes: [NOTES.Bb2, NOTES.D3, NOTES.F3, NOTES.A3, NOTES.D4],
        melody: [
          { offset: 0, note: NOTES.F5 },
          { offset: beat * 2, note: NOTES.D5 },
          { offset: beat * 4, note: NOTES.C5 },
          { offset: beat * 6, note: NOTES.A4 }
        ]
      },
      {
        bass: NOTES.C3,
        notes: [NOTES.C3, NOTES.G3, NOTES.Bb3, NOTES.D4, NOTES.G4],
        melody: [
          { offset: 0, note: NOTES.Bb4 },
          { offset: beat * 2, note: NOTES.C5 },
          { offset: beat * 4, note: NOTES.E5 },
          { offset: beat * 6, note: NOTES.G5 }
        ]
      }
    ];

    let chordStartTime = now + 0.1;
    const chordDuration = beat * 8;

    chords.forEach((chord) => {
      // Bass note
      playTone(chord.bass, chordStartTime, chordDuration, themeMode);

      // Delicate arpeggiated harp notes
      chord.notes.forEach((freq, idx) => {
        const noteTime = chordStartTime + idx * (beat * 0.7);
        playTone(freq, noteTime, 1.8, themeMode);
      });

      // Upper romantic melody line
      chord.melody.forEach((m) => {
        playTone(m.note, chordStartTime + m.offset, 2.2, themeMode);
      });

      chordStartTime += chordDuration;
    });

    const totalLoopDurationMs = (chordStartTime - now) * 1000;
    loopTimerRef.current = window.setTimeout(() => {
      schedulePhrase();
    }, Math.max(100, totalLoopDurationMs - 400));
  }, [isPlaying, getAudioContext, playTone, themeMode, NOTES]);

  useEffect(() => {
    if (isPlaying) {
      schedulePhrase();
    } else {
      if (loopTimerRef.current) {
        clearTimeout(loopTimerRef.current);
        loopTimerRef.current = null;
      }
      activeOscillatorsRef.current.forEach((item) => item.stop());
      activeOscillatorsRef.current = [];
    }

    return () => {
      if (loopTimerRef.current) clearTimeout(loopTimerRef.current);
    };
  }, [isPlaying, schedulePhrase]);

  useEffect(() => {
    if (masterGainRef.current && audioCtxRef.current) {
      masterGainRef.current.gain.linearRampToValueAtTime(volume, audioCtxRef.current.currentTime + 0.1);
    }
  }, [volume]);

  const togglePlay = () => {
    setHasInteracted(true);
    setIsPlaying((prev) => !prev);
  };

  return (
    <>
      {/* Floating Music Indicator & Quick Toggle */}
      <div className="fixed top-4 right-4 z-40 flex items-center gap-2">
        {!hasInteracted && !isPlaying && (
          <button
            onClick={togglePlay}
            className="flex items-center gap-2 rounded-full border border-[#F3C4D2] bg-[#FFF5F8]/95 px-3.5 py-1.5 text-xs font-medium text-[#7C2D43] shadow-md backdrop-blur-md transition-all hover:bg-[#FFEBF1] hover:scale-105 active:scale-95 animate-pulse"
          >
            <Sparkles className="h-3.5 w-3.5 text-[#D48B47]" />
            <span>Play Romantic Music</span>
          </button>
        )}

        <div className="relative">
          <button
            onClick={() => setShowControls((v) => !v)}
            className={`group relative flex h-11 w-11 items-center justify-center rounded-full border border-[#ECD1D8] bg-[#FFF9F7]/90 text-[#6B3144] shadow-md backdrop-blur-md transition-all hover:border-[#E4B1C0] hover:text-[#4A1525] hover:scale-105 active:scale-95 ${
              isPlaying ? 'ring-2 ring-[#F7B6CA]/50' : ''
            }`}
            aria-label="Romantic Music Settings"
            title="Romantic Music Player"
          >
            {isPlaying ? (
              <span className="relative flex items-center justify-center">
                <Music className="h-5 w-5 text-[#8A2846] animate-bounce" style={{ animationDuration: '2s' }} />
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#E5829D] opacity-75"></span>
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#D4597C]"></span>
                </span>
              </span>
            ) : (
              <VolumeX className="h-5 w-5 text-[#9E6E7E]" />
            )}
          </button>

          {/* Expanded Music Player Tray */}
          {showControls && (
            <div className="absolute right-0 mt-2 w-72 rounded-2xl border border-[#ECD1D8] bg-[#FFFBF9]/95 p-4 shadow-xl backdrop-blur-md transition-all">
              <div className="flex items-center justify-between border-b border-[#F4E1E6] pb-2.5">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#5B2134]">
                  <Heart className="h-4 w-4 fill-[#E5829D] text-[#E5829D]" />
                  <span>Fairytale Melodies</span>
                </div>
                <button
                  onClick={togglePlay}
                  className="flex items-center gap-1 rounded-full bg-[#F3B8C9] px-2.5 py-1 text-xs font-medium text-[#441221] hover:bg-[#EFA7BC] transition-colors"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="h-3 w-3" /> Pause
                    </>
                  ) : (
                    <>
                      <Play className="h-3 w-3" /> Play
                    </>
                  )}
                </button>
              </div>

              {/* Sound Theme Selection */}
              <div className="mt-3">
                <label className="text-[11px] font-medium text-[#875567]">Instrument Soundscape</label>
                <div className="mt-1.5 grid grid-cols-3 gap-1">
                  {(
                    [
                      { id: 'fairytale', label: 'Celesta' },
                      { id: 'musicbox', label: 'Music Box' },
                      { id: 'harp', label: 'Harp' }
                    ] as const
                  ).map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setThemeMode(m.id)}
                      className={`rounded-lg py-1.5 text-[11px] font-medium transition-all ${
                        themeMode === m.id
                          ? 'border border-[#E4A7B8] bg-[#FDE9EE] text-[#4A1525] shadow-xs'
                          : 'border border-transparent bg-[#F9ECEF]/60 text-[#7A4B5B] hover:bg-[#F9ECEF]'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Volume Slider */}
              <div className="mt-3.5 flex items-center gap-2">
                <Volume2 className="h-4 w-4 text-[#875567] shrink-0" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="h-1.5 w-full cursor-pointer accent-[#C65B79] rounded-lg bg-[#EED8DF]"
                />
                <span className="text-[11px] font-mono text-[#875567] w-7 text-right">
                  {Math.round(volume * 100)}%
                </span>
              </div>

              <p className="mt-2.5 text-[10px] text-center text-[#996A7C] italic">
                Sweet piano & celestial notes composed for her special day.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
