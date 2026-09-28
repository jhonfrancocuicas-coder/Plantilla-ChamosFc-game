import React from 'react';
import { Player } from '../types/football';
import { PlayerDoll } from './PlayerDoll';
import { ArrowRightLeft } from 'lucide-react';

interface SubstitutionBoardProps {
  isOpen: boolean;
  incoming: Player | null;
  outgoing: Player | null;
}

export const SubstitutionBoard: React.FC<SubstitutionBoardProps> = ({
  isOpen,
  incoming,
  outgoing
}) => {
  if (!isOpen || !incoming || !outgoing) return null;

  return (
    <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 pointer-events-none animate-in fade-in slide-in-from-top-6 duration-300">
      <div className="bg-neutral-950/95 border-2 border-amber-400/80 rounded-2xl p-2.5 sm:p-3.5 shadow-[0_0_35px_rgba(0,0,0,0.95),0_0_15px_rgba(220,38,38,0.4)] backdrop-blur-md flex flex-col items-center min-w-[280px] sm:min-w-[340px]">
        {/* Board Header */}
        <div className="flex items-center gap-1.5 mb-1.5 text-[11px] font-mono font-bold tracking-widest text-amber-400">
          <ArrowRightLeft className="w-3.5 h-3.5 text-red-500 animate-spin" />
          <span>SUSTITUCIÓN OFICIAL · LOS CHAMOS FC</span>
        </div>

        {/* LED Digital Display */}
        <div className="grid grid-cols-2 gap-2.5 w-full bg-black/90 p-2 rounded-xl border border-red-900/40">
          {/* OUTGOING (RED LED) */}
          <div className="flex items-center gap-2 bg-red-950/40 border border-red-600/50 rounded-lg p-1.5">
            <div className="relative w-9 h-11 shrink-0 overflow-hidden rounded bg-black/60 border border-red-500/40 flex items-center justify-center">
              <PlayerDoll player={outgoing} size="sm" />
            </div>
            <div className="min-w-0">
              <span className="text-[9px] font-mono font-bold text-red-400 block tracking-wider">
                ▼ SALE #{outgoing.number}
              </span>
              <span className="font-teko text-base text-white font-bold tracking-wide truncate block leading-tight">
                {outgoing.nickname}
              </span>
              <span className="text-[8.5px] font-mono text-slate-400 block truncate">{outgoing.position} · 92</span>
            </div>
          </div>

          {/* INCOMING (GREEN / GOLD LED) */}
          <div className="flex items-center gap-2 bg-emerald-950/30 border border-emerald-500/50 rounded-lg p-1.5">
            <div className="relative w-9 h-11 shrink-0 overflow-hidden rounded bg-black/60 border border-emerald-500/40 flex items-center justify-center">
              <PlayerDoll player={incoming} size="sm" />
            </div>
            <div className="min-w-0">
              <span className="text-[9px] font-mono font-bold text-emerald-400 block tracking-wider">
                ▲ ENTRA #{incoming.number}
              </span>
              <span className="font-teko text-base text-amber-300 font-bold tracking-wide truncate block leading-tight">
                {incoming.nickname}
              </span>
              <span className="text-[8.5px] font-mono text-slate-400 block truncate">{incoming.position} · 92</span>
            </div>
          </div>
        </div>

        <span className="text-[9.5px] font-mono text-amber-400 mt-1.5 tracking-wider uppercase font-semibold">
          ★ 92 OVR · CAMBIO TÁCTICO EFECTUADO
        </span>
      </div>
    </div>
  );
};
