import React, { useState } from 'react';
import { Sparkles, Wind, CheckCircle2, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ThemeConfig } from '../utils/theme';

interface BirthdayCakeInteractiveProps {
  recipientName: string;
  theme: ThemeConfig;
}

export const BirthdayCakeInteractive: React.FC<BirthdayCakeInteractiveProps> = ({
  recipientName,
  theme
}) => {
  const [isBlown, setIsBlown] = useState<boolean>(false);

  const handleBlow = () => {
    setIsBlown(true);
    confetti({
      particleCount: 95,
      spread: 100,
      origin: { y: 0.6 },
      colors: [theme.primary, '#F59E0B', '#F472B6', '#FFF', '#E11D48']
    });
  };

  const handleRelight = () => {
    setIsBlown(false);
  };

  const displayName = recipientName?.trim() || 'Meri Jaan';

  return (
    <div className="flex flex-col items-center w-full px-2 sm:px-4">
      {/* Interactive 3D Vector Birthday Cake */}
      <div 
        className="relative w-full max-w-[480px] aspect-[5/4] select-none my-2 flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
        onClick={() => (!isBlown ? handleBlow() : null)}
        title={!isBlown ? "Click to make a wish and blow the candles!" : "Candles blown!"}
      >
        <svg
          viewBox="0 0 540 450"
          className="w-full h-full filter drop-shadow-2xl overflow-visible"
        >
          <defs>
            {/* Ambient Candle Light Glow */}
            <radialGradient id="candleAmbientGlow" cx="50%" cy="30%" r="60%">
              <stop offset="0%" stopColor="#FFF1B8" stopOpacity={!isBlown ? "0.65" : "0"} />
              <stop offset="50%" stopColor="#FFD166" stopOpacity={!isBlown ? "0.25" : "0"} />
              <stop offset="100%" stopColor="#FFD166" stopOpacity="0" />
            </radialGradient>

            {/* Cake Stand Glass Shading */}
            <linearGradient id="glassPedestal" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#CBD5E1" stopOpacity="0.85" />
              <stop offset="25%" stopColor="#FFFFFF" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#94A3B8" stopOpacity="0.75" />
              <stop offset="75%" stopColor="#FFFFFF" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#64748B" stopOpacity="0.85" />
            </linearGradient>

            {/* Bottom Tier Velvet Sponge Shading */}
            <linearGradient id="cakeBottomTier" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F9D7E3" />
              <stop offset="15%" stopColor="#FFF5F8" />
              <stop offset="50%" stopColor="#FCE4EC" />
              <stop offset="85%" stopColor="#F9D2E1" />
              <stop offset="100%" stopColor="#E69FB8" />
            </linearGradient>

            {/* Top Tier Velvet Sponge Shading */}
            <linearGradient id="cakeTopTier" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFF5F8" />
              <stop offset="25%" stopColor="#FFFFFF" />
              <stop offset="60%" stopColor="#FCE7F0" />
              <stop offset="100%" stopColor="#F2B7CE" />
            </linearGradient>

            {/* Draped Strawberry / Rose Glaze with 3D Depth */}
            <linearGradient id="strawberryGlaze" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#9F1239" />
              <stop offset="20%" stopColor="#E11D48" />
              <stop offset="50%" stopColor="#FB7185" />
              <stop offset="80%" stopColor="#E11D48" />
              <stop offset="100%" stopColor="#881337" />
            </linearGradient>

            {/* Frosting Swirl Gradient */}
            <linearGradient id="frostingSwirl" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="60%" stopColor="#FFF1F5" />
              <stop offset="100%" stopColor="#FBCFE8" />
            </linearGradient>

            {/* Sugar Pearl 3D Ball */}
            <radialGradient id="pearlSphere" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="40%" stopColor="#FEF08A" />
              <stop offset="85%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#B45309" />
            </radialGradient>

            {/* Wide Royal Ribbon Banner Gradient */}
            <linearGradient id="royalRibbonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFFDF7" />
              <stop offset="50%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#FFFDF7" />
            </linearGradient>

            <linearGradient id="goldBorderGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#B45309" />
              <stop offset="25%" stopColor="#FDE68A" />
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="75%" stopColor="#FEF3C7" />
              <stop offset="100%" stopColor="#92400E" />
            </linearGradient>

            {/* Candle Body 1 (Striped Gold & Pink) */}
            <linearGradient id="candleBody" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F472B6" />
              <stop offset="25%" stopColor="#FDF2F8" />
              <stop offset="50%" stopColor="#F472B6" />
              <stop offset="75%" stopColor="#FBCFE8" />
              <stop offset="100%" stopColor="#DB2777" />
            </linearGradient>

            {/* Flame Outer Halo */}
            <radialGradient id="flameOuter" cx="50%" cy="60%" r="50%">
              <stop offset="0%" stopColor="#FFFBEB" />
              <stop offset="40%" stopColor="#FBBF24" />
              <stop offset="80%" stopColor="#F97316" />
              <stop offset="100%" stopColor="#EF4444" stopOpacity="0" />
            </radialGradient>

            {/* Flame Inner Core */}
            <radialGradient id="flameInner" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="60%" stopColor="#67E8F9" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
            </radialGradient>

            {/* High-Contrast Luxury Carmine Velvet Wax & 24K Gold (A, Heart, S) */}
            <linearGradient id="boldCrimsonWax" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FB7185" />
              <stop offset="25%" stopColor="#E11D48" />
              <stop offset="65%" stopColor="#BE123C" />
              <stop offset="100%" stopColor="#881337" />
            </linearGradient>

            <linearGradient id="boldGoldBevel" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFFBEB" />
              <stop offset="20%" stopColor="#FDE047" />
              <stop offset="55%" stopColor="#F59E0B" />
              <stop offset="85%" stopColor="#D97706" />
              <stop offset="100%" stopColor="#78350F" />
            </linearGradient>

            <radialGradient id="boldRubyHeart" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#FECDD3" />
              <stop offset="30%" stopColor="#F43F5E" />
              <stop offset="65%" stopColor="#BE123C" />
              <stop offset="100%" stopColor="#701A35" />
            </radialGradient>

            {/* Solid Deep Contrast Shadow - prevents any blending into background */}
            <filter id="candleHighContrastShadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="3.5" stdDeviation="3" floodColor="#3F0413" floodOpacity="0.55" />
            </filter>

            {/* Drop Shadows */}
            <filter id="cakeShadow" x="-10%" y="-10%" width="120%" height="130%">
              <feDropShadow dx="0" dy="12" stdDeviation="10" floodColor="#701A35" floodOpacity="0.16" />
            </filter>
            <filter id="standShadow" x="-20%" y="-20%" width="140%" height="150%">
              <feDropShadow dx="0" dy="18" stdDeviation="15" floodColor="#000000" floodOpacity="0.14" />
            </filter>
            <filter id="bannerShadow" x="-10%" y="-10%" width="120%" height="130%">
              <feDropShadow dx="0" dy="5" stdDeviation="6" floodColor="#4C0519" floodOpacity="0.18" />
            </filter>
          </defs>

          {/* Ambient Warm Candle Light Halo in background */}
          <ellipse cx="270" cy="110" rx="180" ry="110" fill="url(#candleAmbientGlow)" />

          {/* 1. CRYSTAL PEDESTAL CAKE STAND */}
          <g filter="url(#standShadow)">
            {/* Stand Base */}
            <ellipse cx="270" cy="425" rx="120" ry="19" fill="url(#glassPedestal)" stroke="#CBD5E1" strokeWidth="1.5" />
            <ellipse cx="270" cy="422" rx="105" ry="13" fill="#FFFFFF" fillOpacity="0.45" />
            
            {/* Stand Stem */}
            <path
              d="M 255 422 C 255 385 260 365 260 350 L 280 350 C 280 365 285 385 285 422 Z"
              fill="url(#glassPedestal)"
              stroke="#CBD5E1"
              strokeWidth="1.2"
            />
            {/* Stem Center Diamond Ring */}
            <ellipse cx="270" cy="382" rx="20" ry="7" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1" />

            {/* Stand Top Plate */}
            <ellipse cx="270" cy="350" rx="215" ry="26" fill="url(#glassPedestal)" stroke="#CBD5E1" strokeWidth="2" />
            <ellipse cx="270" cy="347" rx="205" ry="22" fill="#FFFFFF" fillOpacity="0.65" />
            {/* Crystal Rim Scallops */}
            <ellipse cx="270" cy="351" rx="214" ry="25" fill="none" stroke="#E2E8F0" strokeWidth="2" strokeDasharray="6,4" />
          </g>

          {/* 2. BOTTOM TIER CAKE (Width ~ 350, Height ~ 100) */}
          <g filter="url(#cakeShadow)">
            <path
              d="M 95 245 
                 L 95 330 
                 C 95 358 445 358 445 330 
                 L 445 245 
                 Z"
              fill="url(#cakeBottomTier)"
              stroke="#F472B6"
              strokeWidth="0.8"
            />

            <ellipse cx="270" cy="245" rx="175" ry="28" fill="url(#cakeBottomTier)" stroke="#F472B6" strokeWidth="0.8" />
            <ellipse cx="270" cy="243" rx="170" ry="24" fill="#FFFFFF" fillOpacity="0.4" />

            {/* Elegant Diamond Fondant Grid Pattern */}
            <g opacity="0.38" stroke="#E11D48" strokeWidth="1.2" fill="none">
              <path d="M 125 265 Q 195 315 270 340" />
              <path d="M 195 255 Q 270 305 345 340" />
              <path d="M 270 255 Q 345 305 415 335" />
              <path d="M 415 265 Q 345 315 270 340" />
              <path d="M 345 255 Q 270 305 195 340" />
              <path d="M 270 255 Q 195 305 125 335" />
            </g>

            {/* Golden Sugar Pearls */}
            {[
              { cx: 195, cy: 300, r: 4 },
              { cx: 270, cy: 310, r: 4.5 },
              { cx: 345, cy: 300, r: 4 },
              { cx: 232, cy: 280, r: 3.5 },
              { cx: 308, cy: 280, r: 3.5 },
              { cx: 270, cy: 335, r: 4 },
              { cx: 160, cy: 325, r: 3.5 },
              { cx: 380, cy: 325, r: 3.5 }
            ].map((p, idx) => (
              <circle key={idx} cx={p.cx} cy={p.cy} r={p.r} fill="url(#pearlSphere)" stroke="#B45309" strokeWidth="0.5" />
            ))}

            {/* Base Frosting Pearl Border on Plate */}
            {Array.from({ length: 27 }).map((_, i) => {
              const angle = (i / 26) * Math.PI;
              const x = 270 - Math.cos(angle) * 176;
              const y = 333 + Math.sin(angle) * 20;
              return (
                <circle key={i} cx={x} cy={y} r={6.5} fill="url(#frostingSwirl)" stroke="#FBCFE8" strokeWidth="0.8" />
              );
            })}
          </g>

          {/* 3. TOP TIER CAKE (Width ~ 240, Height ~ 85) */}
          <g filter="url(#cakeShadow)">
            <path
              d="M 150 160 
                 L 150 230 
                 C 150 252 390 252 390 230 
                 L 390 160 
                 Z"
              fill="url(#cakeTopTier)"
              stroke="#F472B6"
              strokeWidth="0.8"
            />

            <ellipse cx="270" cy="160" rx="120" ry="22" fill="url(#cakeTopTier)" stroke="#F472B6" strokeWidth="0.8" />
            <ellipse cx="270" cy="158" rx="114" ry="19" fill="#FFFFFF" fillOpacity="0.45" />

            {/* Luscious Gourmet Drips */}
            <path
              d="M 150 163
                 C 152 182 158 192 163 192
                 C 168 192 172 174 178 174
                 C 184 174 188 205 195 205
                 C 202 205 206 178 212 178
                 C 218 178 222 215 231 215
                 C 240 215 244 182 250 182
                 C 256 182 260 220 270 220
                 C 280 220 284 182 290 182
                 C 296 182 300 212 308 212
                 C 316 212 320 178 326 178
                 C 332 178 336 202 342 202
                 C 348 202 352 174 358 174
                 C 364 174 370 195 375 195
                 C 380 195 385 174 390 163
                 C 390 155 150 155 150 163 Z"
              fill="url(#strawberryGlaze)"
              filter="drop-shadow(0 3px 4px rgba(136,19,55,0.35))"
            />

            {/* Specular White Highlights on Drips */}
            <path
              d="M 230 206 A 2 3 0 0 1 232 211 M 269 210 A 2 4 0 0 1 271 216 M 307 203 A 2 3 0 0 1 309 208"
              stroke="#FFFFFF"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
              opacity="0.85"
            />

            {/* Mid-Tier Frosting Border */}
            {Array.from({ length: 19 }).map((_, i) => {
              const angle = (i / 18) * Math.PI;
              const x = 270 - Math.cos(angle) * 120;
              const y = 228 + Math.sin(angle) * 18;
              return (
                <circle key={i} cx={x} cy={y} r={5.5} fill="url(#frostingSwirl)" stroke="#FBCFE8" strokeWidth="0.6" />
              );
            })}
          </g>

          {/* 4. FRESH BERRIES & TOPPING DECORATIONS */}
          <g>
            {/* Left Strawberry */}
            <g transform="translate(210, 142) scale(1)">
              <path d="M 0 0 C -9 -3 -15 11 0 22 C 15 11 9 -3 0 0 Z" fill="#E11D48" stroke="#9F1239" strokeWidth="0.8" />
              <circle cx="-3" cy="7" r="0.9" fill="#FEF08A" />
              <circle cx="3" cy="9" r="0.9" fill="#FEF08A" />
              <circle cx="0" cy="14" r="0.9" fill="#FEF08A" />
              <path d="M 0 -1 L -5 -7 L -2 -1 L 0 -8 L 2 -1 L 5 -7 Z" fill="#15803D" />
            </g>

            {/* Right Strawberry */}
            <g transform="translate(320, 147) scale(0.95) rotate(16)">
              <path d="M 0 0 C -9 -3 -15 11 0 22 C 15 11 9 -3 0 0 Z" fill="#BE123C" stroke="#881337" strokeWidth="0.8" />
              <circle cx="-2" cy="7" r="0.9" fill="#FEF08A" />
              <circle cx="2" cy="10" r="0.9" fill="#FEF08A" />
              <path d="M 0 -1 L -5 -6 L -2 -1 L 0 -7 L 2 -1 L 5 -6 Z" fill="#15803D" />
            </g>

            {/* Blueberries & Sugar Flowers */}
            <circle cx="190" cy="158" r="6.5" fill="#312E81" stroke="#1E1B4B" strokeWidth="0.5" />
            <circle cx="188" cy="156" r="1.6" fill="#818CF8" opacity="0.7" />

            <circle cx="342" cy="156" r="6.5" fill="#312E81" stroke="#1E1B4B" strokeWidth="0.5" />
            <circle cx="340" cy="154" r="1.6" fill="#818CF8" opacity="0.7" />
          </g>

          {/* 5. REDESIGNED WIDE ROYAL BANNER (Zero Overflows, Generous Width, Perfect Legibility) */}
          <g filter="url(#bannerShadow)" transform="translate(270, 285)">
            {/* Banner Tails / Folded Ends Left & Right */}
            <path
              d="M -180 8 L -195 -10 L -180 -28 L -140 -28 L -140 8 Z"
              fill="#D97706"
              stroke="#B45309"
              strokeWidth="1.2"
            />
            <path
              d="M 180 8 L 195 -10 L 180 -28 L 140 -28 L 140 8 Z"
              fill="#D97706"
              stroke="#B45309"
              strokeWidth="1.2"
            />

            {/* Main Wide Royal Parchment Ribbon Body (Width: 320px) */}
            <rect
              x="-160"
              y="-28"
              width="320"
              height="56"
              rx="28"
              fill="url(#royalRibbonGrad)"
              stroke="url(#goldBorderGrad)"
              strokeWidth="2.5"
            />
            {/* Inner Gold Foil Hairline */}
            <rect
              x="-155"
              y="-23"
              width="310"
              height="46"
              rx="23"
              fill="none"
              stroke="#FDE68A"
              strokeWidth="1.2"
              opacity="0.8"
            />

            {/* Left & Right Sparkling Gems */}
            <g transform="translate(-138, 0)">
              <circle cx="0" cy="0" r="5" fill="#F59E0B" stroke="#B45309" strokeWidth="0.8" />
              <circle cx="-1" cy="-1" r="1.5" fill="#FFFFFF" />
            </g>
            <g transform="translate(138, 0)">
              <circle cx="0" cy="0" r="5" fill="#F59E0B" stroke="#B45309" strokeWidth="0.8" />
              <circle cx="-1" cy="-1" r="1.5" fill="#FFFFFF" />
            </g>

            {/* TWO-LINE CRYSTAL CLEAR CALLIGRAPHY & TYPOGRAPHY: */}
            {/* Line 1: Happy Birthday (Clean, elegant, solid) */}
            <text
              x="0"
              y="-6"
              textAnchor="middle"
              className="font-sans font-extrabold uppercase tracking-widest"
              fontSize="12"
              fill="#B45309"
            >
              ★ HAPPY BIRTHDAY ★
            </text>

            {/* Line 2: Name in Romantic, Flowing, Readable Calligraphy */}
            <text
              x="0"
              y="17"
              textAnchor="middle"
              className="font-romantic tracking-wide"
              fontSize={displayName.length > 22 ? "15" : displayName.length > 13 ? "19" : "23"}
              fill={theme.primary}
            >
              {displayName}
            </text>
          </g>

          {/* 6. THREE LUXURY SOLID-BODY CANDLES (A ❤️ S) ANCHORED DIRECTLY INTO CAKE (ZERO GAP) */}
          {[
            {
              type: 'A',
              x: 232,
              baseY: 156,
              topY: 98,
              tilt: -1.5
            },
            {
              type: 'HEART',
              x: 270,
              baseY: 148,
              topY: 84,
              tilt: 0
            },
            {
              type: 'S',
              x: 308,
              baseY: 156,
              topY: 98,
              tilt: 1.5
            }
          ].map((candle, idx) => {
            const { type, x, baseY, topY, tilt } = candle;
            const height = baseY - topY;
            const wickTipY = topY - 10;
            const candleWidth = 12;
            const halfW = candleWidth / 2;
            const emblemY = topY + (height * 0.48);

            return (
              <g key={idx} transform={`rotate(${tilt}, ${x}, ${baseY})`}>
                {/* 1. Cake Contact Shadow & Gold Pedestal Cup Anchoring Candle Directly ON Cake Top */}
                <ellipse cx={x} cy={baseY + 1} rx="8" ry="2.8" fill="#701A35" opacity="0.3" />
                <ellipse cx={x} cy={baseY} rx="6.5" ry="2.4" fill="url(#goldBorderGrad)" stroke="#92400E" strokeWidth="0.7" />
                <ellipse cx={x} cy={baseY - 0.8} rx="4.5" ry="1.6" fill="#FEF08A" opacity="0.9" />

                {/* 2. Continuous Solid Candle Body (Extends All The Way Into The Cake — Zero Gap) */}
                <rect
                  x={x - halfW}
                  y={topY}
                  width={candleWidth}
                  height={height}
                  rx="2"
                  fill="#701A35"
                  transform="translate(1, 1)"
                  opacity="0.22"
                />
                <rect
                  x={x - halfW}
                  y={topY}
                  width={candleWidth}
                  height={height}
                  rx="2"
                  fill="url(#candleBody)"
                  stroke="#DB2777"
                  strokeWidth="0.7"
                />

                {/* 3. Elegant Diagonal Spiral Glitter Ribbons */}
                {Array.from({ length: 5 }).map((_, sIdx) => {
                  const stripeY = topY + 8 + sIdx * 10;
                  if (stripeY + 5 > baseY) return null;
                  return (
                    <path
                      key={sIdx}
                      d={`M ${x - halfW} ${stripeY + 4} L ${x + halfW} ${stripeY - 3}`}
                      stroke="#FEF08A"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      opacity="0.88"
                    />
                  );
                })}

                {/* 4. PROMINENT 3D LUXURY SCULPTED EMBLEM (A ❤️ S) ON FRONT OF CANDLE */}
                {type === 'A' && (
                  <g filter="url(#candleHighContrastShadow)">
                    {/* Beveled 24K Gold & Ruby Medallion Plaque */}
                    <ellipse cx={x} cy={emblemY} rx="15" ry="17" fill="url(#boldGoldBevel)" stroke="#78350F" strokeWidth="1" />
                    <ellipse cx={x} cy={emblemY} rx="13" ry="15" fill="url(#boldCrimsonWax)" stroke="#FFFBEB" strokeWidth="0.6" />

                    {/* Regal Golden Letter "A" */}
                    <text
                      x={x + 0.8}
                      y={emblemY + 7.5}
                      textAnchor="middle"
                      fontSize="20"
                      fontWeight="900"
                      fontFamily="'Cinzel', 'Playfair Display', 'Times New Roman', Georgia, serif"
                      fill="#3B0716"
                      opacity="0.7"
                    >
                      A
                    </text>
                    <text
                      x={x}
                      y={emblemY + 7}
                      textAnchor="middle"
                      fontSize="20"
                      fontWeight="900"
                      fontFamily="'Cinzel', 'Playfair Display', 'Times New Roman', Georgia, serif"
                      fill="url(#boldGoldBevel)"
                      stroke="#78350F"
                      strokeWidth="0.8"
                    >
                      A
                    </text>
                    <text
                      x={x}
                      y={emblemY + 7}
                      textAnchor="middle"
                      fontSize="20"
                      fontWeight="900"
                      fontFamily="'Cinzel', 'Playfair Display', 'Times New Roman', Georgia, serif"
                      fill="#FFFBEB"
                    >
                      A
                    </text>
                    {/* Sparkle Star */}
                    <g transform={`translate(${x + 8}, ${emblemY - 10})`}>
                      <path d="M 0 -3 L 0.8 -0.8 L 3 0 L 0.8 0.8 L 0 3 L -0.8 0.8 L -3 0 L -0.8 -0.8 Z" fill="#FFFFFF" />
                    </g>
                  </g>
                )}

                {type === 'HEART' && (
                  <g filter="url(#candleHighContrastShadow)">
                    {/* Sculpted 3D Ruby Jewel Heart with 24K Gold Embossed Bevel */}
                    <path
                      d={`M ${x} ${emblemY + 14}
                          C ${x - 17} ${emblemY + 4} ${x - 19} ${emblemY - 8} ${x - 10} ${emblemY - 12}
                          C ${x - 4} ${emblemY - 15} ${x} ${emblemY - 9} ${x} ${emblemY - 7}
                          C ${x} ${emblemY - 9} ${x + 4} ${emblemY - 15} ${x + 10} ${emblemY - 12}
                          C ${x + 19} ${emblemY - 8} ${x + 17} ${emblemY + 4} ${x} ${emblemY + 14} Z`}
                      fill="#3B0716"
                      transform="translate(1.4, 1.6)"
                      opacity="0.6"
                    />
                    <path
                      d={`M ${x} ${emblemY + 14}
                          C ${x - 17} ${emblemY + 4} ${x - 19} ${emblemY - 8} ${x - 10} ${emblemY - 12}
                          C ${x - 4} ${emblemY - 15} ${x} ${emblemY - 9} ${x} ${emblemY - 7}
                          C ${x} ${emblemY - 9} ${x + 4} ${emblemY - 15} ${x + 10} ${emblemY - 12}
                          C ${x + 19} ${emblemY - 8} ${x + 17} ${emblemY + 4} ${x} ${emblemY + 14} Z`}
                      fill="url(#boldRubyHeart)"
                      stroke="url(#boldGoldBevel)"
                      strokeWidth="2.8"
                      strokeLinejoin="round"
                    />
                    {/* Glossy Specular Glass Reflection */}
                    <path
                      d={`M ${x - 9} ${emblemY - 9}
                          C ${x - 14} ${emblemY - 5} ${x - 13} ${emblemY + 3} ${x - 4} ${emblemY + 9}`}
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      opacity="0.85"
                    />
                    {/* Inner Gold Filigree Heart Accent */}
                    <path
                      d={`M ${x} ${emblemY + 9}
                          C ${x - 7} ${emblemY + 3} ${x - 8} ${emblemY - 3} ${x - 4} ${emblemY - 5}
                          C ${x - 1.5} ${emblemY - 7} ${x} ${emblemY - 3} ${x} ${emblemY - 2}
                          C ${x} ${emblemY - 3} ${x + 1.5} ${emblemY - 7} ${x + 4} ${emblemY - 5}
                          C ${x + 8} ${emblemY - 3} ${x + 7} ${emblemY + 3} ${x} ${emblemY + 9} Z`}
                      fill="none"
                      stroke="url(#boldGoldBevel)"
                      strokeWidth="1"
                      opacity="0.9"
                    />
                    {/* Sparkle Star */}
                    <g transform={`translate(${x + 9}, ${emblemY - 8})`}>
                      <path d="M 0 -3 L 0.8 -0.8 L 3 0 L 0.8 0.8 L 0 3 L -0.8 0.8 L -3 0 L -0.8 -0.8 Z" fill="#FFFFFF" />
                    </g>
                  </g>
                )}

                {type === 'S' && (
                  <g filter="url(#candleHighContrastShadow)">
                    {/* Beveled 24K Gold & Ruby Medallion Plaque */}
                    <ellipse cx={x} cy={emblemY} rx="15" ry="17" fill="url(#boldGoldBevel)" stroke="#78350F" strokeWidth="1" />
                    <ellipse cx={x} cy={emblemY} rx="13" ry="15" fill="url(#boldCrimsonWax)" stroke="#FFFBEB" strokeWidth="0.6" />

                    {/* Regal Golden Letter "S" */}
                    <text
                      x={x + 0.8}
                      y={emblemY + 7.5}
                      textAnchor="middle"
                      fontSize="20"
                      fontWeight="900"
                      fontFamily="'Cinzel', 'Playfair Display', 'Times New Roman', Georgia, serif"
                      fill="#3B0716"
                      opacity="0.7"
                    >
                      S
                    </text>
                    <text
                      x={x}
                      y={emblemY + 7}
                      textAnchor="middle"
                      fontSize="20"
                      fontWeight="900"
                      fontFamily="'Cinzel', 'Playfair Display', 'Times New Roman', Georgia, serif"
                      fill="url(#boldGoldBevel)"
                      stroke="#78350F"
                      strokeWidth="0.8"
                    >
                      S
                    </text>
                    <text
                      x={x}
                      y={emblemY + 7}
                      textAnchor="middle"
                      fontSize="20"
                      fontWeight="900"
                      fontFamily="'Cinzel', 'Playfair Display', 'Times New Roman', Georgia, serif"
                      fill="#FFFBEB"
                    >
                      S
                    </text>
                    {/* Sparkle Star */}
                    <g transform={`translate(${x + 8}, ${emblemY - 10})`}>
                      <path d="M 0 -3 L 0.8 -0.8 L 3 0 L 0.8 0.8 L 0 3 L -0.8 0.8 L -3 0 L -0.8 -0.8 Z" fill="#FFFFFF" />
                    </g>
                  </g>
                )}

                {/* 5. Candle Top Wax Pool */}
                <ellipse cx={x} cy={topY} rx={halfW} ry="1.8" fill="#FDF2F8" stroke="#DB2777" strokeWidth="0.6" />

                {/* 6. Cotton Candle Wick Growing Directly From Top Pool */}
                <path
                  d={`M ${x} ${topY} Q ${x + (idx === 0 ? -1 : 1)} ${topY - 5} ${x} ${wickTipY}`}
                  stroke="#171717"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  fill="none"
                />

                {/* 7. Realistic Flickering Flame */}
                {!isBlown ? (
                  <g className="candle-flame origin-bottom" style={{ transformOrigin: `${x}px ${wickTipY}px` }}>
                    {/* Outer Orange Flame */}
                    <path
                      d={`M ${x} ${wickTipY}
                          C ${x - 8.5} ${wickTipY - 11} ${x - 7.5} ${wickTipY - 26} ${x} ${wickTipY - 35}
                          C ${x + 7.5} ${wickTipY - 26} ${x + 8.5} ${wickTipY - 11} ${x} ${wickTipY} Z`}
                      fill="url(#flameOuter)"
                      filter="drop-shadow(0 0 10px rgba(245, 158, 11, 0.85))"
                    />

                    {/* Middle Yellow Bright Cone */}
                    <path
                      d={`M ${x} ${wickTipY}
                          C ${x - 5} ${wickTipY - 9} ${x - 4.5} ${wickTipY - 20} ${x} ${wickTipY - 27}
                          C ${x + 4.5} ${wickTipY - 20} ${x + 5} ${wickTipY - 9} ${x} ${wickTipY} Z`}
                      fill="#FFFBEB"
                    />

                    {/* Inner Blue Base Core */}
                    <ellipse
                      cx={x}
                      cy={wickTipY - 1}
                      rx="3.5"
                      ry="3.8"
                      fill="url(#flameInner)"
                    />
                  </g>
                ) : (
                  /* EXTINGUISHED SMOKE SPIRAL & GLOWING EMBER */
                  <g>
                    <circle cx={x} cy={wickTipY} r="1.6" fill="#EF4444" className="animate-ping" style={{ animationDuration: '3s' }} />
                    <circle cx={x} cy={wickTipY} r="1.3" fill="#F97316" />

                    <path
                      d={`M ${x} ${wickTipY - 2}
                          C ${x - 7} ${wickTipY - 14} ${x + 9} ${wickTipY - 27} ${x - 3} ${wickTipY - 42}
                          C ${x - 13} ${wickTipY - 54} ${x + 15} ${wickTipY - 67} ${x} ${wickTipY - 84}`}
                      fill="none"
                      stroke="#94A3B8"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      opacity="0.65"
                      strokeDasharray="4,3"
                      className="animate-pulse"
                    />
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Interactive Controls & Status Card */}
      <div className="mt-4 flex flex-col items-center gap-3 w-full">
        {!isBlown ? (
          <div className="flex flex-col items-center gap-2">
            <button
              onClick={handleBlow}
              className="group inline-flex items-center gap-2.5 rounded-full px-8 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap"
              style={{
                background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryHover} 100%)`,
                boxShadow: `0 10px 25px -5px ${theme.primary}66`
              }}
            >
              <Wind className="h-4 w-4 text-white group-hover:translate-x-1 transition-transform" />
              <span>Make A Wish & Blow The Candles</span>
            </button>
            <span className={`text-xs font-semibold ${theme.subtextColor} text-center`}>
              (Tap the cake or the button to blow out candles!)
            </span>
          </div>
        ) : (
          <div className="rounded-3xl border-2 border-emerald-200 bg-white p-6 max-w-lg mx-auto shadow-xl text-center animate-in fade-in zoom-in-95 duration-200 w-full">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-3">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <h4 className={`text-xl font-bold ${theme.headingColor}`}>
              Your Wish Has Been Sealed In The Heavens!
            </h4>
            <p className={`mt-2 text-sm leading-relaxed font-normal ${theme.subtextColor}`}>
              “Dua hai k Allah tala tumhari har jayez khwahish puri karein, tumhe hamesha sehat, sukoon aur be-hisaab khushiyon se nawazein. Ameen.”
            </p>
            <button
              onClick={handleRelight}
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold underline cursor-pointer hover:opacity-80"
              style={{ color: theme.primary }}
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Light the candles again</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
