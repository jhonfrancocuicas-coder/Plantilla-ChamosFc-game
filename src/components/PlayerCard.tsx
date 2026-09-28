import React from 'react';
import { Player } from '../types/football';
import { CLUB_INFO } from '../data/teamData';
import { PlayerDoll } from './PlayerDoll';
import { ChamosLogo } from './ChamosLogo';
import { Sparkles } from 'lucide-react';

interface PlayerCardProps {
  player: Player;
  variant?: 'pitch' | 'bench' | 'giant';
  isSelected?: boolean;
  onClick?: () => void;
  onDragStart?: (e: React.DragEvent) => void;
  showStats?: boolean;
  animateBounce?: boolean;
  animationDelay?: string;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({
  player,
  variant = 'pitch',
  isSelected = false,
  onClick,
  onDragStart,
  showStats = true,
  animateBounce = false,
  animationDelay = '0ms'
}) => {
  const isGoalkeeper = player.position === 'POR';

  // Official Club Theme based on Crest: Rosso Red, Deep Black & Metallic Gold
  const theme = {
    containerBg: 'bg-gradient-to-b from-zinc-950 via-neutral-900 to-black',
    borderColor: 'border-amber-400 shadow-[0_0_18px_rgba(245,158,11,0.5),0_0_8px_rgba(220,38,38,0.4)]',
    badgeBg: 'bg-red-600/20 text-amber-300 border-amber-400/50',
    accentText: 'text-amber-400',
    goldGlow: 'from-amber-400/25 via-red-600/20 to-transparent',
    nameBg: 'bg-gradient-to-r from-black via-red-950/90 to-black border-amber-400/60',
    tagText: 'CHAMOS PRO EDITION'
  };

  const statLabels = isGoalkeeper
    ? [
        { key: 'EST', val: player.stats.rit },
        { key: 'PAR', val: player.stats.tir },
        { key: 'SAQ', val: player.stats.pas },
        { key: 'REF', val: player.stats.reg },
        { key: 'VEL', val: player.stats.def },
        { key: 'POS', val: player.stats.fis }
      ]
    : [
        { key: 'RIT', val: player.stats.rit },
        { key: 'TIR', val: player.stats.tir },
        { key: 'PAS', val: player.stats.pas },
        { key: 'REG', val: player.stats.reg },
        { key: 'DEF', val: player.stats.def },
        { key: 'FÍS', val: player.stats.fis }
      ];

  /* -------------------------------------------------------------------------- */
  /* VARIANT 1: PITCH CARD (Placed in 3D Pitch)                                 */
  /* -------------------------------------------------------------------------- */
  if (variant === 'pitch') {
    return (
      <div
        onClick={onClick}
        className={`group relative w-[70px] xs:w-[76px] sm:w-[88px] h-[104px] xs:h-[114px] sm:h-[128px] cursor-pointer transition-all duration-300 select-none ${
          isSelected ? 'scale-110 -translate-y-2' : 'hover:scale-105 hover:-translate-y-1'
        }`}
      >
        {/* Glow halo */}
        <div
          className={`absolute -inset-1 rounded-2xl bg-gradient-to-r ${theme.goldGlow} opacity-60 blur-sm group-hover:opacity-100 transition-opacity`}
        />

        {/* FUT Card Outer Shield Frame with Red/Black Texture */}
        <div
          className={`relative w-full h-full clip-fut-card ${theme.containerBg} border-2 ${theme.borderColor} flex flex-col justify-between p-1 shadow-[0_12px_24px_rgba(0,0,0,0.9)] overflow-hidden`}
        >
          {/* Subtle Red/Black Vertical Stripe Watermark */}
          <div className="absolute inset-0 bg-chamos-card-stripes opacity-30 pointer-events-none" />

          {/* Holographic light sweep */}
          <div className="absolute inset-0 holo-shimmer opacity-25 group-hover:opacity-60 pointer-events-none transition-opacity" />

          {/* Top Info Bar: OVR, Position, Crest */}
          <div className="relative z-10 flex justify-between items-start leading-none px-1">
            <div className="flex flex-col items-center">
              <span className="font-teko text-xl sm:text-2xl font-bold tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                {player.rat}
              </span>
              <span className="font-teko text-xs sm:text-sm font-bold text-amber-400 -mt-1 tracking-wider">
                {player.position}
              </span>
            </div>

            {/* Official Club Crest */}
            <div className="w-5 h-5 shrink-0 flex items-center justify-center filter drop-shadow">
              <ChamosLogo className="w-full h-full" />
            </div>
          </div>

          {/* Center: Custom 3D Vector Doll / Muñeco */}
          <div className="relative w-full h-[54px] sm:h-[64px] flex items-center justify-center -mt-2.5">
            <PlayerDoll player={player} size="sm" />
          </div>

          {/* Player Name Ribbon */}
          <div className="relative z-10 w-full mt-auto">
            <div
              className={`w-full py-0.5 px-1 rounded-sm border ${theme.nameBg} text-center shadow-md`}
            >
              <p className="font-teko text-xs sm:text-sm font-bold tracking-wider text-amber-300 uppercase truncate leading-none">
                {player.nickname}
              </p>
            </div>

            {/* Micro stat bar */}
            <div className="flex justify-between items-center px-1 pt-0.5 text-[8px] sm:text-[9px] font-mono text-slate-300">
              <span className="text-red-500 font-bold">#{player.number}</span>
              <span className="truncate max-w-[45px] text-[7.5px] text-amber-400/90 uppercase">
                {player.playstyle.replace(' +', '')}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* -------------------------------------------------------------------------- */
  /* VARIANT 2: BENCH CARD (Slide-in Bounce Animation on Render)                */
  /* -------------------------------------------------------------------------- */
  if (variant === 'bench') {
    return (
      <div
        draggable
        onDragStart={onDragStart}
        onClick={onClick}
        style={{ animationDelay }}
        className={`group relative flex items-center gap-2 bg-gradient-to-r from-zinc-950 via-neutral-900 to-zinc-950 hover:bg-neutral-800 border-2 ${
          isSelected
            ? 'border-amber-400 shadow-[0_0_18px_rgba(245,158,11,0.6)]'
            : 'border-red-600/50 hover:border-amber-400/80 shadow-[0_4px_12px_rgba(0,0,0,0.8)]'
        } rounded-xl p-1.5 cursor-grab active:cursor-grabbing transition-all select-none min-w-[155px] sm:min-w-[175px] shrink-0 ${
          animateBounce ? 'animate-slide-bounce' : ''
        }`}
      >
        {/* Mini FUT Card with Muñeco */}
        <div className={`relative w-11 h-15 clip-fut-card ${theme.containerBg} border border-amber-400/70 p-0.5 flex flex-col justify-between shrink-0 shadow-md overflow-hidden`}>
          <div className="absolute inset-0 bg-chamos-card-stripes opacity-25 pointer-events-none" />
          <div className="relative z-10 flex justify-between items-center leading-none px-0.5">
            <span className="font-teko text-sm font-bold text-white leading-none">{player.rat}</span>
            <span className="font-teko text-[9px] font-bold text-amber-400">{player.position}</span>
          </div>

          {/* Mini Doll */}
          <div className="w-full h-8 overflow-hidden flex items-center justify-center">
            <PlayerDoll player={player} size="sm" />
          </div>

          <span className="relative z-10 font-teko text-[9px] font-bold text-center text-amber-300 truncate uppercase leading-none bg-black/80 py-0.5">
            {player.nickname}
          </span>
        </div>

        {/* Info & Stats Summary */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="font-teko text-base font-bold text-white tracking-wide truncate">
              {player.name}
            </span>
            <span className="font-mono text-xs font-bold text-amber-400">#{player.number}</span>
          </div>
          <p className="text-[10px] text-red-400 truncate font-medium">{player.role}</p>

          {/* Quick attribute preview */}
          <div className="flex items-center gap-1 mt-0.5 text-[9px] text-slate-300 font-mono">
            <span className="px-1 py-0.2 bg-black/60 border border-slate-700 rounded text-amber-300 font-bold">
              {isGoalkeeper ? 'REF' : 'RIT'} {isGoalkeeper ? player.stats.reg : player.stats.rit}
            </span>
            <span className="px-1 py-0.2 bg-black/60 border border-slate-700 rounded text-red-400 font-bold">
              {isGoalkeeper ? 'PAR' : 'TIR'} {isGoalkeeper ? player.stats.tir : player.stats.tir}
            </span>
          </div>
        </div>
      </div>
    );
  }

  /* -------------------------------------------------------------------------- */
  /* VARIANT 3: GIANT SHOWCASE CARD (Detail Inspection)                         */
  /* -------------------------------------------------------------------------- */
  return (
    <div
      onClick={onClick}
      className="relative w-[270px] sm:w-[310px] h-[395px] sm:h-[445px] clip-fut-card transition-transform duration-300 select-none shadow-[0_25px_60px_rgba(0,0,0,0.95)]"
    >
      {/* Outer Metallic Card Container with Red & Black Stripes */}
      <div
        className={`relative w-full h-full ${theme.containerBg} border-[3.5px] ${theme.borderColor} p-4 sm:p-5 flex flex-col justify-between overflow-hidden`}
      >
        {/* Official Stripes Overlay */}
        <div className="absolute inset-0 bg-chamos-card-stripes opacity-20 pointer-events-none" />

        {/* Holographic light reflection */}
        <div className="absolute inset-0 holo-shimmer opacity-40 pointer-events-none" />

        {/* Top Header Row: Rating, Position, National Badge, Club Crest */}
        <div className="relative z-10 flex justify-between items-start">
          <div className="flex flex-col items-center">
            <span className="font-teko text-5xl sm:text-6xl font-bold tracking-tight text-white leading-none drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]">
              {player.rat}
            </span>
            <span className="font-teko text-xl sm:text-2xl font-bold text-amber-400 -mt-2 tracking-wider">
              {player.position}
            </span>

            {/* Shield Star Flag */}
            <div className="mt-1 flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded border border-amber-400/40">
              <span className="text-[10px] font-bold text-amber-300 font-mono">★ 2026</span>
            </div>
          </div>

          {/* Official Vector Club Crest */}
          <div className="flex flex-col items-end gap-1">
            <div className="w-12 h-12 shrink-0 filter drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]">
              <ChamosLogo className="w-full h-full" />
            </div>
            <span className="text-[9px] font-mono tracking-widest text-amber-300 font-bold uppercase">
              {theme.tagText}
            </span>
          </div>
        </div>

        {/* Center: Big Player Muñeco 3D */}
        <div className="relative w-full h-[175px] sm:h-[200px] -my-2 flex items-center justify-center">
          <PlayerDoll player={player} size="lg" />
        </div>

        {/* Lower Banner: Player Name */}
        <div className="relative z-10 w-full">
          <div
            className={`w-full py-1 px-2.5 rounded border ${theme.nameBg} text-center shadow-lg mb-2`}
          >
            <h2 className="font-teko text-2xl sm:text-3xl font-bold tracking-widest text-amber-300 uppercase truncate leading-none">
              {player.name}
            </h2>
          </div>

          {/* PlayStyle Badge */}
          <div className="flex items-center justify-center gap-1.5 mb-2">
            <div className="flex items-center gap-1 bg-red-600/25 border border-red-500/50 px-2 py-0.5 rounded text-[11px] font-bold text-red-300">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>{player.playstyle}</span>
            </div>
            <div className="flex items-center gap-1 bg-black/60 border border-amber-400/30 px-2 py-0.5 rounded text-[11px] text-amber-300 font-mono font-bold">
              <span>#{player.number}</span>
              <span className="text-slate-500">·</span>
              <span>{player.preferredFoot}</span>
            </div>
          </div>

          {/* 6 FIFA Attributes Grid */}
          {showStats && (
            <div className="grid grid-cols-6 gap-1 bg-black/75 border border-amber-400/30 rounded-lg p-1.5 text-center backdrop-blur-sm">
              {statLabels.map((stat, i) => (
                <div key={i} className="flex flex-col items-center">
                  <span className="font-teko text-lg sm:text-xl font-bold text-white leading-none">
                    {stat.val}
                  </span>
                  <span className="text-[8.5px] font-mono font-bold text-amber-400 tracking-wider">
                    {stat.key}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
