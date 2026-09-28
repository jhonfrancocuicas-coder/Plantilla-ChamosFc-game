import React from 'react';
import { Player } from '../types/football';
import { PlayerCard } from './PlayerCard';
import { ChamosLogo } from './ChamosLogo';
import { Sparkles, Trophy } from 'lucide-react';

interface LineupPresentationOverlayProps {
  isOpen: boolean;
  presentingPlayer: Player | null;
  presentingIndex: number;
  totalStarters: number;
  isFlyingToPitch: boolean;
  onSkip: () => void;
}

export const LineupPresentationOverlay: React.FC<LineupPresentationOverlayProps> = ({
  isOpen,
  presentingPlayer,
  presentingIndex,
  totalStarters,
  isFlyingToPitch,
  onSkip
}) => {
  if (!isOpen || !presentingPlayer) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-3 bg-black/85 backdrop-blur-md animate-fade-in select-none overflow-hidden">
      {/* Stadium Floodlight Cones */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-radial from-amber-400/20 to-transparent blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-radial from-red-600/20 to-transparent blur-3xl pointer-events-none animate-pulse" />

      {/* Top TV Broadcast Header */}
      <div className="relative z-10 w-full max-w-sm flex items-center justify-between bg-neutral-950/90 border border-amber-400/60 rounded-xl px-3 py-1.5 mb-2 shadow-lg">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 shrink-0">
            <ChamosLogo className="w-full h-full" />
          </div>
          <div>
            <span className="font-mono text-[9px] text-amber-400 font-bold block uppercase tracking-wider">
              ALINEACIÓN TITULAR · LOS CHAMOS FC
            </span>
            <span className="font-teko text-base text-white font-bold leading-none">
              JUGADOR {presentingIndex + 1} DE {totalStarters}
            </span>
          </div>
        </div>

        <button
          onClick={onSkip}
          className="px-2 py-0.5 rounded bg-neutral-800 hover:bg-neutral-700 text-amber-300 font-mono text-[10px] font-bold border border-amber-400/40 cursor-pointer transition-colors"
        >
          Saltar ⏩
        </button>
      </div>

      {/* Position Announcement Pill */}
      <div className="relative z-10 mb-2 inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-red-600 border border-amber-400 shadow-md animate-in slide-in-from-top-3 duration-300">
        <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
        <span className="font-teko text-lg text-white font-bold tracking-widest uppercase">
          {presentingPlayer.role}
        </span>
        <Trophy className="w-3.5 h-3.5 text-amber-300" />
      </div>

      {/* Center Giant Card with Presentation Transition */}
      <div
        className={`relative z-10 transition-all duration-700 transform ${
          isFlyingToPitch
            ? 'scale-40 -translate-y-24 opacity-20 filter blur-[1px]'
            : 'scale-100 translate-y-0 opacity-100 animate-in zoom-in-75 duration-500'
        }`}
      >
        {/* Golden Aura Glow */}
        <div className="absolute -inset-4 bg-radial from-amber-400/35 via-red-600/25 to-transparent rounded-full blur-xl pointer-events-none animate-pulse" />

        <PlayerCard
          player={presentingPlayer}
          variant="giant"
          showStats={true}
        />
      </div>

      {/* Bottom Subtitle / Callout */}
      <div className="relative z-10 mt-3 text-center">
        <p className="font-teko text-2xl text-amber-300 tracking-wider uppercase drop-shadow font-bold">
          {isFlyingToPitch ? '✈️ Tomando posición en cancha...' : `★ ${presentingPlayer.name} · #${presentingPlayer.number}`}
        </p>
        <div className="flex items-center justify-center gap-1.5 mt-1">
          {Array.from({ length: totalStarters }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === presentingIndex
                  ? 'w-6 bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.8)]'
                  : i < presentingIndex
                  ? 'w-3 bg-red-600'
                  : 'w-2 bg-neutral-700'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
