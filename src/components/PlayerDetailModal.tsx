import React, { useState } from 'react';
import { Player, CardType } from '../types/football';
import { PlayerCard } from './PlayerCard';
import { X, Edit2, Check, ArrowRightLeft, Sparkles, Shield, User } from 'lucide-react';

interface PlayerDetailModalProps {
  player: Player | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdatePlayer: (updated: Player) => void;
  benchPlayers: Player[];
  onSwapWithBench?: (benchPlayerId: string) => void;
}

export const PlayerDetailModal: React.FC<PlayerDetailModalProps> = ({
  player,
  isOpen,
  onClose,
  onUpdatePlayer,
  benchPlayers,
  onSwapWithBench
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Player | null>(null);

  React.useEffect(() => {
    if (player) {
      setEditForm({ ...player });
      setIsEditing(false);
    }
  }, [player]);

  if (!isOpen || !player || !editForm) return null;

  const handleSave = () => {
    onUpdatePlayer(editForm);
    setIsEditing(false);
  };

  const isGoalkeeper = editForm.position === 'POR';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-zinc-950/95 border-2 border-amber-400/80 rounded-3xl p-3 sm:p-6 shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_20px_rgba(220,38,38,0.4)] max-h-[94vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 rounded-full bg-neutral-900 border border-amber-400/40 text-amber-400 hover:text-white hover:bg-neutral-800 transition-colors z-20 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-center">
          {/* Left Column: The Giant FUT Card */}
          <div className="md:col-span-5 flex flex-col items-center justify-center">
            <div className="transform transition-transform hover:scale-102">
              <PlayerCard
                player={editForm}
                variant="giant"
                showStats={true}
              />
            </div>
            <p className="mt-2 text-xs text-amber-400/90 font-mono flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Carta Oficial · Los Chamos FC 2026
            </p>
          </div>

          {/* Right Column: Player Profile, Detailed Stats & Customization */}
          <div className="md:col-span-7 space-y-3">
            {/* Header info */}
            <div className="flex items-start justify-between border-b border-red-900/40 pb-2.5">
              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-red-500">
                  {editForm.cardType.replace('_', ' ').toUpperCase()} · 92 OVR
                </span>
                <h1 className="font-teko text-3xl sm:text-4xl font-bold text-white tracking-wide uppercase leading-none">
                  {editForm.name}
                </h1>
                <p className="text-xs text-amber-400/80">{editForm.role}</p>
              </div>

              <button
                onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors ${
                  isEditing
                    ? 'bg-red-600 text-white hover:bg-red-500'
                    : 'bg-neutral-900 border border-amber-400/50 text-amber-300 hover:text-white hover:bg-neutral-800'
                }`}
              >
                {isEditing ? (
                  <>
                    <Check className="w-3.5 h-3.5" /> Guardar
                  </>
                ) : (
                  <>
                    <Edit2 className="w-3.5 h-3.5" /> Editar
                  </>
                )}
              </button>
            </div>

            {/* Editing Controls or Bio View */}
            {isEditing ? (
              <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Nombre Completo</label>
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Nombre en Carta</label>
                    <input
                      type="text"
                      value={editForm.nickname}
                      onChange={(e) => setEditForm({ ...editForm, nickname: e.target.value.toUpperCase() })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Dorsal</label>
                    <input
                      type="number"
                      value={editForm.number}
                      onChange={(e) => setEditForm({ ...editForm, number: Number(e.target.value) })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Media (OVR)</label>
                    <input
                      type="number"
                      min={60}
                      max={99}
                      value={editForm.rat}
                      onChange={(e) => setEditForm({ ...editForm, rat: Number(e.target.value) })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Estilo de Carta</label>
                    <select
                      value={editForm.cardType}
                      onChange={(e) => setEditForm({ ...editForm, cardType: e.target.value as CardType })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white focus:border-amber-400 focus:outline-none"
                    >
                      <option value="gold_special">Oro Especial</option>
                      <option value="toty_blue">Champions Azul</option>
                      <option value="icon_legend">Icono Leyenda</option>
                      <option value="fut_hero">FUT Héroe</option>
                    </select>
                  </div>
                </div>

                {/* Stat Sliders */}
                <div className="pt-2">
                  <label className="text-xs text-slate-400 block mb-2 font-mono">Atributos FIFA (60-99):</label>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    {(Object.keys(editForm.stats) as (keyof typeof editForm.stats)[]).map((key) => (
                      <div key={key} className="flex items-center gap-1.5 bg-slate-900 p-1.5 rounded border border-slate-800">
                        <span className="font-mono uppercase text-amber-400 w-8">{key}</span>
                        <input
                          type="number"
                          min={40}
                          max={99}
                          value={editForm.stats[key]}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              stats: { ...editForm.stats, [key]: Number(e.target.value) }
                            })
                          }
                          className="w-12 bg-slate-800 text-center rounded px-1 text-white text-xs"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* Tactical Description */}
                <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                    Análisis del Jugador
                  </span>
                  <p className="text-sm text-slate-300 leading-relaxed">{editForm.desc}</p>
                </div>

                {/* Detailed Stat Bars */}
                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 space-y-2.5">
                  <div className="flex justify-between items-center text-xs font-mono text-slate-400 mb-1">
                    <span>ATRIBUTOS TÉCNICOS DETALLADOS</span>
                    <span className="text-amber-400 font-bold">OVR {editForm.rat}</span>
                  </div>

                  <div className="space-y-2">
                    {[
                      { label: isGoalkeeper ? 'Estirada' : 'Ritmo / Aceleración', val: editForm.stats.rit, color: 'bg-emerald-500' },
                      { label: isGoalkeeper ? 'Paradas' : 'Tiro / Definición', val: editForm.stats.tir, color: 'bg-rose-500' },
                      { label: isGoalkeeper ? 'Saque Largo' : 'Pase / Visión', val: editForm.stats.pas, color: 'bg-sky-500' },
                      { label: isGoalkeeper ? 'Reflejos' : 'Regate / Control', val: editForm.stats.reg, color: 'bg-amber-500' },
                      { label: isGoalkeeper ? 'Velocidad' : 'Defensa / Recuperación', val: editForm.stats.def, color: 'bg-indigo-500' },
                      { label: isGoalkeeper ? 'Posición' : 'Físico / Potencia', val: editForm.stats.fis, color: 'bg-purple-500' }
                    ].map((stat, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="text-xs text-slate-300 w-36 truncate">{stat.label}</span>
                        <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${stat.color} transition-all duration-500`}
                            style={{ width: `${Math.min(100, (stat.val / 99) * 100)}%` }}
                          />
                        </div>
                        <span className="text-xs font-mono font-bold text-white w-7 text-right">
                          {stat.val}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Fast Bench Substitution Bar */}
                {onSwapWithBench && benchPlayers.length > 0 && (
                  <div className="pt-2">
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                      <ArrowRightLeft className="w-3.5 h-3.5 text-amber-400" />
                      Sustituir por Jugador de la Banca:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {benchPlayers.map((benchP) => (
                        <button
                          key={benchP.id}
                          onClick={() => {
                            onSwapWithBench(benchP.id);
                            onClose();
                          }}
                          className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-amber-400/60 rounded-lg px-3 py-1.5 text-xs text-white transition-all cursor-pointer"
                        >
                          <span className="font-bold text-amber-400">OVR {benchP.rat}</span>
                          <span className="font-semibold">{benchP.name}</span>
                          <span className="text-[10px] text-slate-400 font-mono">({benchP.position})</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
