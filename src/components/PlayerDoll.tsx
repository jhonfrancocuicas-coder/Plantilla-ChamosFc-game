import React from 'react';
import { Player } from '../types/football';

interface PlayerDollProps {
  player: Player;
  size?: 'sm' | 'md' | 'lg';
}

export const PlayerDoll: React.FC<PlayerDollProps> = ({ player, size = 'md' }) => {
  const isGK = player.position === 'POR';

  // Player-specific visual features (hair, skin tone, accessories)
  const getPlayerVisuals = (id: string, name: string) => {
    switch (id) {
      case 'p-franco':
        return {
          hairColor: '#171717',
          hairStyle: 'slick_spikes',
          skinTone: '#f8d2ac',
          skinShade: '#d89b65',
          facialHair: 'stubble',
          accessory: 'earring'
        };
      case 'p-henry':
        return {
          hairColor: '#1a1412',
          hairStyle: 'curly_fade',
          skinTone: '#e3ad81',
          skinShade: '#b87c4f',
          facialHair: 'none',
          accessory: 'headband'
        };
      case 'p-percu':
        return {
          hairColor: '#262626',
          hairStyle: 'undercut',
          skinTone: '#f5cda0',
          skinShade: '#c9925e',
          facialHair: 'beard_trim',
          accessory: 'none'
        };
      case 'p-aaron':
        return {
          hairColor: '#1c1917',
          hairStyle: 'buzz_fade',
          skinTone: '#d99d6c',
          skinShade: '#a46a3b',
          facialHair: 'goatee',
          accessory: 'wristband'
        };
      case 'p-raul':
        return {
          hairColor: '#171717',
          hairStyle: 'side_part',
          skinTone: '#f3cba0',
          skinShade: '#c68d5a',
          facialHair: 'designer_beard',
          accessory: 'gk_gloves'
        };
      case 'p-jhondeiber':
        return {
          hairColor: '#0a0a0a',
          hairStyle: 'curly_top',
          skinTone: '#e8b88d',
          skinShade: '#b88155',
          facialHair: 'none',
          accessory: 'none'
        };
      case 'p-josue':
        return {
          hairColor: '#27272a',
          hairStyle: 'classic_part',
          skinTone: '#f8cfab',
          skinShade: '#cf9567',
          facialHair: 'clean',
          accessory: 'none'
        };
      case 'p-gerardo':
        return {
          hairColor: '#3f3f46',
          hairStyle: 'captain_short',
          skinTone: '#f1c599',
          skinShade: '#c08956',
          facialHair: 'beard_full',
          accessory: 'gk_gloves_captain'
        };
      default:
        return {
          hairColor: '#1c1917',
          hairStyle: 'slick_spikes',
          skinTone: '#f5cda0',
          skinShade: '#c9925e',
          facialHair: 'none',
          accessory: isGK ? 'gk_gloves' : 'none'
        };
    }
  };

  const visuals = getPlayerVisuals(player.id, player.name);

  // Sizing dimensions
  const scale = size === 'sm' ? 'scale-105' : size === 'lg' ? 'scale-115' : 'scale-100';

  return (
    <div className={`relative w-full h-full flex items-center justify-center overflow-hidden transition-transform duration-300 ${scale}`}>
      {/* Stadium Rim Light Spotlight */}
      <div className="absolute inset-0 bg-radial from-amber-400/15 via-red-600/10 to-transparent opacity-60 pointer-events-none" />

      {/* Stylized 3D Vector Doll / Muñeco */}
      <svg
        viewBox="0 0 100 125"
        className="w-full h-full object-contain filter drop-shadow-[0_8px_14px_rgba(0,0,0,0.85)]"
      >
        <defs>
          {/* Metallic Gold Gradients */}
          <linearGradient id={`gold-grad-${player.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="40%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>

          {/* Skin Gradients */}
          <linearGradient id={`skin-grad-${player.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={visuals.skinTone} />
            <stop offset="100%" stopColor={visuals.skinShade} />
          </linearGradient>

          {/* Red & Black Jersey Pattern (Outfield) */}
          <pattern id={`stripes-${player.id}`} width="14" height="20" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="7" height="20" fill="#dc2626" />
            <rect x="7" y="0" width="7" height="20" fill="#09090b" />
            {/* Texture mesh line */}
            <line x1="0" y1="0" x2="14" y2="20" stroke="rgba(0,0,0,0.25)" strokeWidth="0.8" />
          </pattern>

          {/* Goalkeeper Volt Green / Electric Gold Jersey */}
          <linearGradient id={`gk-grad-${player.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#eab308" />
            <stop offset="50%" stopColor="#ca8a04" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
        </defs>

        {/* ------------------------------------------------------------- */}
        {/* ATHLETIC TORSO & ARMS                                         */}
        {/* ------------------------------------------------------------- */}
        {/* Left Arm / Shoulder */}
        <path
          d="M 16 88 L 10 115 L 20 118 L 26 88 Z"
          fill={`url(#skin-grad-${player.id})`}
        />
        {/* Right Arm / Shoulder */}
        <path
          d="M 84 88 L 90 115 L 80 118 L 74 88 Z"
          fill={`url(#skin-grad-${player.id})`}
        />

        {/* Jersey Torso */}
        <path
          d="M 22 84 C 24 55 35 50 50 50 C 65 50 76 55 78 84 L 86 125 L 14 125 Z"
          fill={isGK ? `url(#gk-grad-${player.id})` : `url(#stripes-${player.id})`}
          stroke="rgba(245, 158, 11, 0.4)"
          strokeWidth="1.2"
        />

        {/* Metallic Gold Collar Trim */}
        <path
          d="M 38 51 Q 50 63 62 51 Q 50 56 38 51"
          fill={`url(#gold-grad-${player.id})`}
        />

        {/* Mini Club Crest on Chest (Left side) */}
        <g transform="translate(32, 66) scale(0.18)">
          <path
            d="M 10 0 L 30 0 L 40 10 L 40 38 L 20 50 L 0 38 L 0 10 Z"
            fill="#09090b"
            stroke="#f59e0b"
            strokeWidth="3"
          />
          <text x="20" y="28" textAnchor="middle" fill="#f59e0b" fontSize="20" fontWeight="bold" fontFamily="sans-serif">CH</text>
        </g>

        {/* Big Jersey Number on Chest/Center */}
        <text
          x="54"
          y="95"
          textAnchor="middle"
          fill={isGK ? '#09090b' : '#ffffff'}
          stroke="rgba(0,0,0,0.6)"
          strokeWidth="0.8"
          fontSize="22"
          fontWeight="bold"
          fontFamily="Teko, sans-serif"
          letterSpacing="0.5"
        >
          {player.number}
        </text>

        {/* Goalkeeper Gloves */}
        {isGK && (
          <g>
            {/* Left Glove */}
            <rect x="7" y="105" width="14" height="18" rx="4" fill="#09090b" stroke="#f59e0b" strokeWidth="1.5" />
            <circle cx="14" cy="114" r="4" fill="#f59e0b" />
            {/* Right Glove */}
            <rect x="79" y="105" width="14" height="18" rx="4" fill="#09090b" stroke="#f59e0b" strokeWidth="1.5" />
            <circle cx="86" cy="114" r="4" fill="#f59e0b" />
          </g>
        )}

        {/* Outfield Captain Band (Franco / Percu) */}
        {(player.id === 'p-franco' || player.id === 'p-gerardo') && (
          <rect x="14" y="90" width="8" height="6" rx="1.5" fill="#f59e0b" stroke="#000" strokeWidth="0.6" />
        )}

        {/* ------------------------------------------------------------- */}
        {/* NECK & HEAD                                                   */}
        {/* ------------------------------------------------------------- */}
        {/* Neck */}
        <rect x="44" y="42" width="12" height="13" rx="2" fill={`url(#skin-grad-${player.id})`} />

        {/* Head */}
        <ellipse cx="50" cy="33" rx="15" ry="18" fill={`url(#skin-grad-${player.id})`} />

        {/* Ears */}
        <ellipse cx="34" cy="34" rx="2.5" ry="4" fill={visuals.skinShade} />
        <ellipse cx="66" cy="34" rx="2.5" ry="4" fill={visuals.skinShade} />

        {/* Earring accessory */}
        {visuals.accessory === 'earring' && (
          <circle cx="33" cy="36" r="1.2" fill="#f59e0b" />
        )}

        {/* ------------------------------------------------------------- */}
        {/* FACIAL FEATURES                                               */}
        {/* ------------------------------------------------------------- */}
        {/* Eyebrows (Determined / Athletic expression) */}
        <path d="M 40 28 Q 45 26 48 29" stroke="#1c1917" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        <path d="M 52 29 Q 55 26 60 28" stroke="#1c1917" strokeWidth="1.8" strokeLinecap="round" fill="none" />

        {/* Eyes with white reflection */}
        <ellipse cx="44" cy="32" rx="2" ry="2.2" fill="#1c1917" />
        <circle cx="44.6" cy="31.4" r="0.7" fill="#ffffff" />

        <ellipse cx="56" cy="32" rx="2" ry="2.2" fill="#1c1917" />
        <circle cx="56.6" cy="31.4" r="0.7" fill="#ffffff" />

        {/* Nose */}
        <path d="M 50 33 L 49 37 L 52 37" stroke={visuals.skinShade} strokeWidth="1.2" strokeLinecap="round" fill="none" />

        {/* Mouth / Confident smile */}
        <path d="M 46 41 Q 50 44 54 41" stroke="#854d0e" strokeWidth="1.3" strokeLinecap="round" fill="none" />

        {/* Facial Hair */}
        {visuals.facialHair === 'beard_full' && (
          <path d="M 39 37 C 40 46 60 46 61 37 C 58 45 42 45 39 37" fill="#27272a" />
        )}
        {visuals.facialHair === 'beard_trim' && (
          <path d="M 42 40 Q 50 46 58 40 Q 50 44 42 40" fill="#262626" opacity="0.8" />
        )}
        {visuals.facialHair === 'stubble' && (
          <path d="M 45 42 Q 50 45 55 42" stroke="#44403c" strokeWidth="1" strokeDasharray="1,1" fill="none" />
        )}

        {/* ------------------------------------------------------------- */}
        {/* CHARACTER HAIRSTYLES                                          */}
        {/* ------------------------------------------------------------- */}
        {visuals.hairStyle === 'slick_spikes' && (
          <g fill={visuals.hairColor}>
            <path d="M 34 30 C 33 16 42 12 50 11 C 58 12 67 16 66 30 C 63 20 57 16 50 16 C 43 16 37 20 34 30 Z" />
            {/* Sharp Spikes on top */}
            <polygon points="46,12 49,6 52,12" />
            <polygon points="51,12 55,7 57,13" />
            <polygon points="42,14 44,8 47,13" />
          </g>
        )}

        {visuals.hairStyle === 'curly_fade' && (
          <g fill={visuals.hairColor}>
            <path d="M 35 28 C 34 16 43 12 50 11 C 57 12 66 16 65 28 C 63 21 57 17 50 17 C 43 17 37 21 35 28 Z" />
            {/* Curly textured top */}
            <circle cx="45" cy="14" r="3.5" />
            <circle cx="50" cy="12" r="3.8" />
            <circle cx="55" cy="14" r="3.5" />
            <circle cx="42" cy="18" r="3.2" />
            <circle cx="58" cy="18" r="3.2" />
          </g>
        )}

        {visuals.hairStyle === 'undercut' && (
          <g fill={visuals.hairColor}>
            <path d="M 35 26 C 35 14 44 11 50 10 C 56 11 65 14 65 26 C 63 17 58 14 50 14 C 42 14 37 17 35 26 Z" />
            {/* Sleek combed top */}
            <path d="M 38 15 Q 50 9 62 15 Q 50 12 38 15" />
          </g>
        )}

        {visuals.hairStyle === 'buzz_fade' && (
          <path
            d="M 35 28 C 35 18 43 14 50 14 C 57 14 65 18 65 28 C 63 22 57 19 50 19 C 43 19 37 22 35 28 Z"
            fill={visuals.hairColor}
          />
        )}

        {visuals.hairStyle === 'side_part' && (
          <g fill={visuals.hairColor}>
            <path d="M 34 28 C 33 16 42 12 50 11 C 58 12 67 16 66 28 C 62 18 56 15 50 15 C 44 15 38 18 34 28 Z" />
            <path d="M 37 20 Q 50 14 63 22" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none" />
          </g>
        )}

        {visuals.hairStyle === 'curly_top' && (
          <g fill={visuals.hairColor}>
            <path d="M 35 26 C 34 15 44 11 50 10 C 56 11 66 15 65 26 Z" />
            <circle cx="47" cy="13" r="4" />
            <circle cx="53" cy="13" r="4" />
          </g>
        )}

        {visuals.hairStyle === 'captain_short' && (
          <g fill={visuals.hairColor}>
            <path d="M 35 27 C 34 16 43 13 50 12 C 57 13 66 16 65 27 C 62 20 57 17 50 17 C 43 17 38 20 35 27 Z" />
          </g>
        )}

        {/* Headband Accessory (Henry) */}
        {visuals.accessory === 'headband' && (
          <path
            d="M 34 24 Q 50 20 66 24 Q 50 22 34 24"
            stroke="#ffffff"
            strokeWidth="2.5"
            fill="none"
          />
        )}
      </svg>
    </div>
  );
};
