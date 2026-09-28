import React from 'react';
import { Player } from '../types/football';
import { ChamosLogo } from './ChamosLogo';
import { Trophy, RotateCcw, Sparkles, Flame, Eye } from 'lucide-react';

interface MatchFinishedModalProps {
  isOpen: boolean;
  scoreChamos: number;
  scoreRival: number;
  scorersHistory: Array<{ id: string; player: Player; minute: string; playTitle: string }>;
  onResetMatch: () => void;
  onClose: () => void;
}

export const MatchFinishedModal: React.FC<MatchFinishedModalProps> = ({
  isOpen,
  scoreChamos,
  scoreRival,
  scorersHistory,
  onResetMatch,
  onClose
}) => {
  if (!isOpen) return null;

  const isWin = scoreChamos > scoreRival;
  const isDraw = scoreChamos === scoreRival;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-md animate-fade-in select-none">
      {/* Stadium glow */}
      <div className="absolute top-1/4 w-80 h-80 bg-radial from-amber-400/25 via-red-600/20 to-transparent blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-sm bg-neutral-950 border-2 border-amber-400/80 rounded-2xl p-4 sm:p-5 shadow-[0_0_35px_rgba(245,158,11,0.5)] text-center animate-in zoom-in-95 duration-300">
        {/* Full-time Broadcast Pill */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600 border border-amber-400 text-white font-mono text-[10px] font-bold uppercase tracking-wider mb-2 shadow-md">
          <Trophy className="w-3.5 h-3.5 text-amber-300" />
          <span>TIEMPO REGLAMENTARIO CUMPLIDO · 40:00</span>
        </div>

        {/* Club Crest */}
        <div className="w-14 h-14 mx-auto my-1 filter drop-shadow-[0_2px_10px_rgba(245,158,11,0.6)]">
          <ChamosLogo className="w-full h-full" />
        </div>

        <h2 className="font-teko text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-wider leading-none mt-1">
          {isWin ? '¡VICTORIA CHAMOS!' : isDraw ? '¡EMPATE ÉPICO!' : 'FIN DEL ENCUENTRO'}
        </h2>
        <p className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-widest -mt-0.5 mb-2">
          LOS CHAMOS FC · 92 OVR PRO
        </p>

        {/* Final Scoreboard Box */}
        <div className="bg-black/90 border border-red-600/60 rounded-xl p-3 my-2 shadow-inner">
          <span className="font-mono text-[9px] text-slate-400 font-bold uppercase block mb-1">
            MARCADOR FINAL (40:00)
          </span>
          <div className="flex items-center justify-center gap-3">
            <div className="text-center">
              <span className="font-teko text-base text-amber-400 font-bold block leading-none">
                CHAMOS
              </span>
              <span className="font-teko text-4xl sm:text-5xl font-black text-white px-3 py-0.5 bg-red-950/80 border border-red-600/70 rounded-lg inline-block shadow">
                {scoreChamos}
              </span>
            </div>

            <span className="font-mono text-2xl text-slate-600 font-black">-</span>

            <div className="text-center">
              <span className="font-teko text-base text-slate-400 font-bold block leading-none">
                RIVAL
              </span>
              <span className="font-teko text-4xl sm:text-5xl font-black text-white px-3 py-0.5 bg-zinc-900 border border-slate-700 rounded-lg inline-block shadow">
                {scoreRival}
              </span>
            </div>
          </div>
        </div>

        {/* Scorers Summary */}
        <div className="bg-neutral-900/80 border border-amber-400/30 rounded-xl p-2.5 my-2 max-h-32 overflow-y-auto text-left">
          <span className="font-mono text-[9.5px] text-amber-400 font-bold uppercase flex items-center gap-1 mb-1">
            <Flame className="w-3 h-3 text-red-500" /> GOLES EN LOS 40' ({scorersHistory.length}):
          </span>
          {scorersHistory.length === 0 ? (
            <p className="text-[10px] font-mono text-slate-400">Sin goles registrados en este partido.</p>
          ) : (
            <div className="space-y-1">
              {scorersHistory.map((goal) => (
                <div key={goal.id} className="flex items-center justify-between text-[10px] font-mono border-b border-neutral-800 pb-0.5">
                  <span className="text-white font-bold">⚽ {goal.player.name}</span>
                  <span className="text-amber-400 font-bold">{goal.minute}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 mt-3">
          <button
            onClick={onResetMatch}
            className="w-full py-2 px-3 bg-gradient-to-r from-red-600 via-red-500 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white font-teko text-xl font-bold tracking-wider rounded-xl shadow-[0_0_15px_rgba(220,38,38,0.7)] flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>🔄 JUGAR OTRO PARTIDO (REINICIAR)</span>
          </button>

          <button
            onClick={onClose}
            className="w-full py-1 text-slate-400 hover:text-white font-mono text-xs cursor-pointer flex items-center justify-center gap-1 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Ver Cancha Final</span>
          </button>
        </div>
      </div>
    </div>
  );
};
