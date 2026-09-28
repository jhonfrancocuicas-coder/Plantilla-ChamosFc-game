import React, { useState } from 'react';
import { CardType, Player, Position } from '../types/football';
import { X, UserPlus, Sparkles } from 'lucide-react';

interface AddPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPlayer: (player: Player) => void;
}

export const AddPlayerModal: React.FC<AddPlayerModalProps> = ({
  isOpen,
  onClose,
  onAddPlayer
}) => {
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [number, setNumber] = useState(10);
  const [position, setPosition] = useState<Position>('ALA');
  const [role, setRole] = useState('Ala / Gambeteador');
  const [rat, setRat] = useState(92);
  const [cardType, setCardType] = useState<CardType>('gold_special');
  const [playstyle, setPlaystyle] = useState('Paso Rápido +');
  const [desc, setDesc] = useState('Jugador dinámico con excelente técnica individual.');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newPlayer: Player = {
      id: `p-${Date.now()}`,
      name: name.trim(),
      nickname: (nickname.trim() || name.split(' ')[0]).toUpperCase(),
      number: Number(number) || 99,
      position,
      role,
      rat: Number(rat) || 85,
      stats: {
        rit: Math.min(99, Math.max(50, rat + (position === 'ALA' ? 3 : -2))),
        tir: Math.min(99, Math.max(50, rat - 2)),
        pas: Math.min(99, Math.max(50, rat - 1)),
        reg: Math.min(99, Math.max(50, rat + 1)),
        def: Math.min(99, Math.max(50, position === 'CIE' ? rat + 4 : rat - 15)),
        fis: Math.min(99, Math.max(50, rat - 3))
      },
      icon: position === 'POR' ? '🧤' : position === 'CIE' ? '🛡️' : '⚡',
      photo: '',
      cardType,
      playstyle,
      preferredFoot: 'Derecha',
      desc: desc.trim() || 'Nuevo fichaje de Los Chamos FC.',
      goalsThisSeason: 0,
      assistsThisSeason: 0
    };

    onAddPlayer(newPlayer);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-slate-900 border-2 border-amber-400/80 rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-amber-500/20 rounded-xl text-amber-400">
            <UserPlus className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-teko text-2xl font-bold text-white uppercase leading-none">
              Nuevo Jugador / Fichaje
            </h2>
            <p className="text-xs text-slate-400">Crear carta Ultimate Team para Los Chamos FC</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Nombre Completo</label>
              <input
                type="text"
                required
                placeholder="Ej. Carlos Mendoza"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white focus:border-amber-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Nombre en Carta</label>
              <input
                type="text"
                placeholder="Ej. CARLOS"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white focus:border-amber-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Posición</label>
              <select
                value={position}
                onChange={(e) => setPosition(e.target.value as Position)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-sm text-white focus:border-amber-400 focus:outline-none"
              >
                <option value="PIV">PIV (Delantero)</option>
                <option value="ALA">ALA (Extremo)</option>
                <option value="MED">MED (Medio)</option>
                <option value="CIE">CIE (Cierre)</option>
                <option value="POR">POR (Portero)</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Dorsal</label>
              <input
                type="number"
                min={1}
                max={99}
                value={number}
                onChange={(e) => setNumber(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white focus:border-amber-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Media (OVR)</label>
              <input
                type="number"
                min={65}
                max={99}
                value={rat}
                onChange={(e) => setRat(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white focus:border-amber-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Estilo de Carta</label>
              <select
                value={cardType}
                onChange={(e) => setCardType(e.target.value as CardType)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-sm text-white focus:border-amber-400 focus:outline-none"
              >
                <option value="gold_special">Oro Especial</option>
                <option value="toty_blue">Champions Azul</option>
                <option value="icon_legend">Icono Leyenda</option>
                <option value="fut_hero">FUT Héroe</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">PlayStyle+</label>
              <input
                type="text"
                placeholder="Ej. Cañonazo +"
                value={playstyle}
                onChange={(e) => setPlaystyle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white focus:border-amber-400 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">Rol Táctico</label>
            <input
              type="text"
              placeholder="Ej. Extremo Desequilibrante"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white focus:border-amber-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">Descripción / Características</label>
            <textarea
              rows={2}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white focus:border-amber-400 focus:outline-none resize-none"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm font-medium cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-teko text-xl font-bold tracking-wider rounded-xl cursor-pointer shadow-lg flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" /> CREAR CARTA
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
