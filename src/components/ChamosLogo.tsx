import React from 'react';

interface ChamosLogoProps {
  className?: string;
  size?: number | string;
}

export const ChamosLogo: React.FC<ChamosLogoProps> = ({ className = 'w-10 h-10', size }) => {
  return (
    <svg
      viewBox="0 0 100 125"
      className={className}
      style={size ? { width: size, height: size } : undefined}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Metallic Gold Gradient */}
        <linearGradient id="crestGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="35%" stopColor="#f59e0b" />
          <stop offset="70%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#78350f" />
        </linearGradient>

        {/* Shiny Red Gradient */}
        <linearGradient id="crestRed" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="50%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#991b1b" />
        </linearGradient>

        {/* Outer Shield Clip Path */}
        <clipPath id="crestShieldClip">
          <path d="M 12 18 C 30 14 70 14 88 18 C 90 60 76 95 50 115 C 24 95 10 60 12 18 Z" />
        </clipPath>
      </defs>

      {/* Outer Golden Shield Frame */}
      <path
        d="M 10 16 C 30 12 70 12 90 16 C 92 62 78 98 50 120 C 22 98 8 62 10 16 Z"
        fill="url(#crestGold)"
        stroke="#451a03"
        strokeWidth="1.5"
        filter="drop-shadow(0px 4px 6px rgba(0,0,0,0.8))"
      />

      {/* Inner Black Border Layer */}
      <path
        d="M 12 18 C 30 14 70 14 88 18 C 90 60 76 95 50 115 C 24 95 10 60 12 18 Z"
        fill="#09090b"
      />

      {/* Vertical Red and Black Stripes in Shield Body */}
      <g clipPath="url(#crestShieldClip)">
        {/* Striped Background */}
        <rect x="12" y="16" width="16" height="100" fill="url(#crestRed)" />
        <rect x="28" y="16" width="15" height="100" fill="#09090b" />
        <rect x="43" y="16" width="14" height="100" fill="url(#crestRed)" />
        <rect x="57" y="16" width="15" height="100" fill="#09090b" />
        <rect x="72" y="16" width="16" height="100" fill="url(#crestRed)" />

        {/* Subtle Diagonal Texture Lines */}
        <line x1="12" y1="20" x2="88" y2="110" stroke="rgba(0,0,0,0.18)" strokeWidth="1" />
        <line x1="12" y1="40" x2="88" y2="130" stroke="rgba(0,0,0,0.18)" strokeWidth="1" />
      </g>

      {/* Top Banner with "LOS CHAMOS FC" */}
      <path
        d="M 14 19 C 30 16 70 16 86 19 L 86 35 C 70 32 30 32 14 35 Z"
        fill="#09090b"
        stroke="url(#crestGold)"
        strokeWidth="1.2"
      />
      <text
        x="50"
        y="28"
        textAnchor="middle"
        fill="url(#crestGold)"
        fontSize="8"
        fontWeight="bold"
        fontFamily="Teko, sans-serif"
        letterSpacing="0.8"
      >
        LOS CHAMOS FC
      </text>

      {/* Center 3D Interlocking "CH" Monogram */}
      <g transform="translate(50, 62)">
        {/* Shadow */}
        <text
          x="1"
          y="1"
          textAnchor="middle"
          fill="#000"
          fontSize="36"
          fontWeight="900"
          fontFamily="Teko, sans-serif"
          letterSpacing="-1.5"
        >
          CH
        </text>
        {/* Gold Monogram */}
        <text
          x="0"
          y="0"
          textAnchor="middle"
          fill="url(#crestGold)"
          stroke="#78350f"
          strokeWidth="1.2"
          fontSize="36"
          fontWeight="900"
          fontFamily="Teko, sans-serif"
          letterSpacing="-1.5"
        >
          CH
        </text>
      </g>

      {/* 5-Pointed Golden Star */}
      <polygon
        points="50,83 52.5,88.5 58,89 54,92.5 55.2,98 50,95 44.8,98 46,92.5 42,89 47.5,88.5"
        fill="url(#crestGold)"
        stroke="#78350f"
        strokeWidth="0.8"
      />

      {/* Bottom Year: "- 2026 -" */}
      <text
        x="50"
        y="108"
        textAnchor="middle"
        fill="url(#crestGold)"
        fontSize="7.5"
        fontWeight="bold"
        fontFamily="Teko, sans-serif"
        letterSpacing="1"
      >
        - 2026 -
      </text>
    </svg>
  );
};
