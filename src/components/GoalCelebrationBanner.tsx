import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Player } from '../types/football';
import { CLUB_INFO } from '../data/teamData';
import { PlayerDoll } from './PlayerDoll';
import { ChamosLogo } from './ChamosLogo';
import { Sparkles, Trophy, Flame } from 'lucide-react';

interface GoalCelebrationProps {
  isOpen: boolean;
  scorer: Player | null;
  motto?: string;
  scoreChamos: number;
  scoreRival: number;
  goalsThisSession?: number;
  onClose: () => void;
}

export const GoalCelebrationBanner: React.FC<GoalCelebrationProps> = ({
  isOpen,
  scorer,
  motto = CLUB_INFO.motto,
  scoreChamos,
  scoreRival,
  goalsThisSession = 1,
  onClose
}) => {
  useEffect(() => {
    if (isOpen) {
      // Trigger golden and crimson confetti explosions
      try {
        confetti({
          particleCount: 120,
          spread: 85,
          origin: { y: 0.55 },
          colors: ['#f59e0b', '#dc2626', '#ffffff', '#fbbf24', '#09090b']
        });

        const timer = setTimeout(() => {
          confetti({
            particleCount: 70,
            angle: 60,
            spread: 60,
            origin: { x: 0 },
            colors: ['#f59e0b', '#dc2626', '#ffffff']
          });
          confetti({
            particleCount: 70,
            angle: 120,
            spread: 60,
            origin: { x: 1 },
            colors: ['#f59e0b', '#dc2626', '#ffffff']
          });
        }, 220);

        return () => clearTimeout(timer);
      } catch {
        // Confetti fallback
      }
    }
  }, [isOpen]);

  if (!isOpen || !scorer) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-md animate-fade-in">
      {/* Neon Crimson & Gold Glow Burst */}
      <div className="absolute w-[320px] sm:w-[460px] h-[320px] sm:h-[460px] rounded-full bg-radial from-amber-400/25 via-red-600/20 to-transparent blur-3xl pointer-events-none animate-pulse" />

      <div className="relative w-full max-w-sm sm:max-w-md bg-gradient-to-b from-neutral-950 via-zinc-900 to-black border-3 border-amber-400 rounded-3xl p-4 sm:p-6 text-center shadow-[0_0_80px_rgba(245,158,11,0.6),0_0_35px_rgba(220,38,38,0.5)] transform scale-100 animate-in zoom-in-95 duration-300 overflow-hidden">
        {/* Striped Watermark */}
        <div className="absolute inset-0 bg-chamos-card-stripes opacity-15 pointer-events-none" />

        {/* Top Header Tag & Scoreboard Snapshot */}
        <div className="relative z-10 flex flex-col items-center gap-1 mb-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-red-600 text-white font-teko text-base tracking-widest uppercase shadow-md border border-amber-400">
            <Flame className="w-3.5 h-3.5 text-amber-300 animate-bounce" />
            <span>LOS CHAMOS FC · GOAL CELEBRATION</span>
            <Trophy className="w-3.5 h-3.5 text-amber-300" />
          </div>

          {/* Mini Scoreboard Badge */}
          <div className="inline-flex items-center gap-2 bg-black/80 border border-amber-400/50 px-2.5 py-0.5 rounded-lg font-mono text-xs">
            <div className="w-4 h-4 shrink-0">
              <ChamosLogo className="w-full h-full" />
            </div>
            <span className="font-bold text-amber-400">CHAMOS</span>
            <span className="font-teko text-xl font-bold text-white px-2 py-0 bg-red-950/80 border border-red-600/50 rounded">
              {scoreChamos} - {scoreRival}
            </span>
            <span className="text-slate-400">RIVAL</span>
          </div>
        </div>

        {/* Goal Big Title */}
        <h1 className="relative z-10 font-teko text-6xl sm:text-7xl font-black text-red-500 leading-none tracking-tight drop-shadow-[0_4px_25px_rgba(220,38,38,0.9)] animate-pulse">
          ¡¡¡GOOOOL!!!
        </h1>

        {/* Scorer Vector Doll / Muñeco 3D */}
        <div className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 mx-auto -my-1 flex items-center justify-center filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)]">
          <PlayerDoll player={scorer} size="md" />
        </div>

        {/* Scorer Info */}
        <div className="relative z-10 my-2 py-1.5 bg-black/70 border-y border-amber-400/50 rounded-xl">
          <div className="flex justify-center items-center gap-1.5 text-amber-300 text-[11px] font-mono font-semibold">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>DEFINICIÓN MAGISTRAL · GOL #{goalsThisSession} EN SESIÓN</span>
          </div>
          <h2 className="font-teko text-3xl sm:text-4xl font-bold text-white uppercase tracking-widest drop-shadow mt-0.5 leading-none">
            {scorer.name}
          </h2>
          <div className="flex items-center justify-center gap-2 mt-0.5 text-xs font-mono text-slate-300">
            <span className="text-red-400 font-bold">DORSAL #{scorer.number}</span>
            <span className="text-amber-400">·</span>
            <span className="text-amber-300 font-bold">{scorer.role}</span>
          </div>
        </div>

        {/* Team Motto & Play Description Banner */}
        <div className="relative z-10 mb-3 px-3 py-1.5 rounded-xl bg-red-950/60 border border-amber-400/50 shadow-inner">
          <span className="font-mono text-[9px] text-amber-400 font-bold uppercase tracking-wider block mb-0.5">
            RESUMEN DE LA JUGADA
          </span>
          <p className="text-xs sm:text-sm font-sans text-amber-100 tracking-wide font-medium leading-snug">
            "{motto}"
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="relative z-10 w-full px-6 py-2 bg-gradient-to-r from-red-600 via-amber-500 to-red-600 hover:from-red-500 hover:to-amber-400 text-black font-teko text-2xl font-bold rounded-xl tracking-wider shadow-[0_0_20px_rgba(245,158,11,0.5)] transition-all cursor-pointer"
        >
          CONTINUAR AL PARTIDO
        </button>
      </div>
    </div>
  );
};
