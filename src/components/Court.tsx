import React from 'react';
import { CameraAngle, CourtSurface, Player, PositionCoordinates } from '../types/football';
import { PlayerCard } from './PlayerCard';

interface CourtProps {
  surface: CourtSurface;
  cameraAngle: CameraAngle;
  starters: Player[];
  positions: PositionCoordinates[];
  ballPosition: { top: number; left: number };
  isBallVisible: boolean;
  onSlotClick: (slotIndex: number) => void;
  onDropBenchPlayer: (starterIndex: number) => void;
  selectedSlotIndex: number | null;
  draggedOverIndex: number | null;
  setDraggedOverIndex: (index: number | null) => void;
  visibleSlotIndices?: number[];
  newlyPlacedSlotIndex?: number | null;
}

export const Court: React.FC<CourtProps> = ({
  surface,
  cameraAngle,
  starters,
  positions,
  ballPosition,
  isBallVisible,
  onSlotClick,
  onDropBenchPlayer,
  selectedSlotIndex,
  draggedOverIndex,
  setDraggedOverIndex,
  visibleSlotIndices,
  newlyPlacedSlotIndex
}) => {
  const getSurfaceClasses = () => {
    switch (surface) {
      case 'parquet_blue':
        return 'bg-parquet-futsal';
      case 'street_urban':
        return 'bg-street-urban';
      case 'turf_pro':
      default:
        return 'bg-turf-stripes';
    }
  };

  const getBorderColor = () => {
    switch (surface) {
      case 'street_urban':
        return 'border-amber-400/80';
      case 'parquet_blue':
        return 'border-sky-300/90';
      case 'turf_pro':
      default:
        return 'border-white/95';
    }
  };

  const getLineColor = () => {
    switch (surface) {
      case 'street_urban':
        return 'rgba(251, 191, 36, 0.9)';
      case 'parquet_blue':
        return 'rgba(255, 255, 255, 0.95)';
      case 'turf_pro':
      default:
        return 'rgba(255, 255, 255, 0.95)';
    }
  };

  const is3D = cameraAngle === '3d';

  return (
    <div className="relative w-full max-w-[420px] h-[335px] xs:h-[365px] sm:h-[445px] md:h-[480px] mx-auto flex items-center justify-center perspective-court select-none py-1 px-1">
      {/* Stadium LED Boards (Left and Right) in 3D */}
      {is3D && (
        <>
          <div className="absolute -left-3 top-8 bottom-8 w-4 hidden sm:flex flex-col justify-around text-[9px] font-teko font-bold text-amber-400 bg-black/90 border border-red-600/60 rounded py-2 px-0.5 tracking-wider shadow-xl transform -rotate-y-45 origin-right">
            <span className="rotate-90 origin-center whitespace-nowrap text-red-500 font-bold">⚽ LOS CHAMOS FC</span>
            <span className="rotate-90 origin-center whitespace-nowrap text-amber-400">MÁS HECHOS</span>
            <span className="rotate-90 origin-center whitespace-nowrap text-white">QUE PALABRAS</span>
          </div>

          <div className="absolute -right-3 top-8 bottom-8 w-4 hidden sm:flex flex-col justify-around text-[9px] font-teko font-bold text-amber-400 bg-black/90 border border-red-600/60 rounded py-2 px-0.5 tracking-wider shadow-xl transform rotate-y-45 origin-left">
            <span className="-rotate-90 origin-center whitespace-nowrap text-red-500 font-bold">FÚTBOL 5 PRO</span>
            <span className="-rotate-90 origin-center whitespace-nowrap text-amber-400">2026 EDITION</span>
            <span className="-rotate-90 origin-center whitespace-nowrap text-white">LOS CHAMOS</span>
          </div>
        </>
      )}

      {/* Main Pitch Surface Container with Dynamic 3D tilt */}
      <div
        className={`relative w-full h-full rounded-2xl border-[4px] sm:border-[5px] border-amber-400/90 ${getSurfaceClasses()} shadow-[0_30px_70px_rgba(0,0,0,0.95),0_0_30px_rgba(220,38,38,0.25),inset_0_0_80px_rgba(0,0,0,0.7)] transition-all duration-700 overflow-hidden`}
        style={{
          transform: is3D ? 'rotateX(36deg) scale(0.97)' : 'rotateX(0deg) scale(1)',
          transformStyle: 'preserve-3d',
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Subtle Pitch Floor Lighting Glow & Floodlights */}
        <div className="absolute inset-0 bg-radial from-amber-400/10 via-red-600/5 to-black/55 pointer-events-none" />
        <div className="absolute top-0 left-0 w-32 h-32 bg-radial from-amber-300/20 to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-radial from-amber-300/20 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-radial from-red-500/15 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-radial from-red-500/15 to-transparent pointer-events-none" />

        {/* ------------------------------------------------------------------ */}
        {/* SVG REGULATION MARKINGS FOR FÚTBOL 5 / FUTSAL                       */}
        {/* ------------------------------------------------------------------ */}
        <svg
          viewBox="0 0 100 150"
          className="absolute inset-0 w-full h-full pointer-events-none"
          preserveAspectRatio="none"
        >
          {/* Outer Boundary Line */}
          <rect
            x="4"
            y="4"
            width="92"
            height="142"
            fill="none"
            stroke={getLineColor()}
            strokeWidth="0.8"
          />

          {/* Halfway Line */}
          <line
            x1="4"
            y1="75"
            x2="96"
            y2="75"
            stroke={getLineColor()}
            strokeWidth="0.8"
          />

          {/* Center Circle & Spot */}
          <circle
            cx="50"
            cy="75"
            r="16"
            fill="none"
            stroke={getLineColor()}
            strokeWidth="0.8"
          />
          <circle cx="50" cy="75" r="1.4" fill={getLineColor()} />

          {/* TOP GOAL AREA (Rival Goal - 6m D-shape Arc) */}
          <path
            d="M 28 4 L 28 14 A 22 22 0 0 0 72 14 L 72 4"
            fill="none"
            stroke={getLineColor()}
            strokeWidth="0.8"
          />
          {/* Top Penalty Spot (6m) */}
          <circle cx="50" cy="22" r="1.2" fill={getLineColor()} />
          {/* Top Second Penalty Mark (10m - Doble Penalti) */}
          <line x1="48" y1="36" x2="52" y2="36" stroke={getLineColor()} strokeWidth="0.8" />

          {/* BOTTOM GOAL AREA (Los Chamos Goal - 6m D-shape Arc) */}
          <path
            d="M 28 146 L 28 136 A 22 22 0 0 1 72 136 L 72 146"
            fill="none"
            stroke={getLineColor()}
            strokeWidth="0.8"
          />
          {/* Bottom Penalty Spot (6m) */}
          <circle cx="50" cy="128" r="1.2" fill={getLineColor()} />
          {/* Bottom Second Penalty Mark (10m - Doble Penalti) */}
          <line x1="48" y1="114" x2="52" y2="114" stroke={getLineColor()} strokeWidth="0.8" />

          {/* 4 Corner Arcs */}
          {/* Top-Left */}
          <path d="M 4 8 A 4 4 0 0 0 8 4" fill="none" stroke={getLineColor()} strokeWidth="0.8" />
          {/* Top-Right */}
          <path d="M 96 8 A 4 4 0 0 1 92 4" fill="none" stroke={getLineColor()} strokeWidth="0.8" />
          {/* Bottom-Left */}
          <path d="M 4 142 A 4 4 0 0 1 8 146" fill="none" stroke={getLineColor()} strokeWidth="0.8" />
          {/* Bottom-Right */}
          <path d="M 96 142 A 4 4 0 0 0 92 146" fill="none" stroke={getLineColor()} strokeWidth="0.8" />
        </svg>

        {/* ------------------------------------------------------------------ */}
        {/* 3D GOALS (Crossbar, Posts, and Hex Mesh Net Pocket)                */}
        {/* ------------------------------------------------------------------ */}
        {/* TOP GOAL (Rival Goal) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 sm:w-40 h-8 pointer-events-none z-10">
          <div className="relative w-full h-full">
            {/* Goal Net Depth */}
            <div className="absolute -top-6 left-0 right-0 h-6 bg-goal-net bg-slate-900/60 border-t-2 border-slate-400/40 rounded-t shadow-inner" />
            {/* White Goal Posts & Crossbar */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-white via-slate-200 to-white border border-slate-300 shadow-md flex justify-between">
              <div className="w-2.5 h-6 bg-white border border-slate-300 shadow-lg" />
              <div className="w-2.5 h-6 bg-white border border-slate-300 shadow-lg" />
            </div>
          </div>
        </div>

        {/* BOTTOM GOAL (Los Chamos Goal) */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 sm:w-40 h-8 pointer-events-none z-10">
          <div className="relative w-full h-full">
            {/* Goal Net Depth */}
            <div className="absolute -bottom-6 left-0 right-0 h-6 bg-goal-net bg-slate-900/60 border-b-2 border-slate-400/40 rounded-b shadow-inner" />
            {/* White Goal Posts & Crossbar */}
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-white via-slate-200 to-white border border-slate-300 shadow-md flex justify-between">
              <div className="w-2.5 h-6 -translate-y-4 bg-white border border-slate-300 shadow-lg" />
              <div className="w-2.5 h-6 -translate-y-4 bg-white border border-slate-300 shadow-lg" />
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* ANIMATED MATCH BALL WITH 3D SHADOW                                 */}
        {/* ------------------------------------------------------------------ */}
        <div
          className="absolute z-30 pointer-events-none transition-all duration-500 ease-out"
          style={{
            top: `${ballPosition.top}%`,
            left: `${ballPosition.left}%`,
            transform: `translate(-50%, -50%) ${is3D ? 'rotateX(-36deg)' : ''}`,
            opacity: isBallVisible ? 1 : 0
          }}
        >
          {/* Ball Shadow on the grass */}
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-5 h-2 bg-black/70 rounded-full blur-[1.5px]" />
          
          {/* Futsal Match Ball */}
          <div className="relative w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-radial from-white via-slate-100 to-amber-200 border border-slate-300 shadow-[0_4px_12px_rgba(0,0,0,0.8),inset_-3px_-3px_5px_rgba(0,0,0,0.4)] flex items-center justify-center animate-spin">
            {/* Ball pentagon pattern */}
            <div className="w-2.5 h-2.5 bg-rose-900/80 clip-fut-badge" />
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* 5 PLAYER SLOTS (FUT Cards Placed on Pitch)                         */}
        {/* ------------------------------------------------------------------ */}
        {starters.map((player, index) => {
          // If visibleSlotIndices is provided, only render slots that are visible
          if (visibleSlotIndices && !visibleSlotIndices.includes(index)) {
            return null;
          }

          const coord = positions[index] || { top: 50, left: 50 };
          const isSelected = selectedSlotIndex === index;
          const isDraggedOver = draggedOverIndex === index;
          const isNewlyPlaced = newlyPlacedSlotIndex === index;

          return (
            <div
              key={player.id}
              onClick={() => onSlotClick(index)}
              onDragOver={(e) => {
                e.preventDefault();
                setDraggedOverIndex(index);
              }}
              onDragLeave={() => {
                if (draggedOverIndex === index) setDraggedOverIndex(null);
              }}
              onDrop={(e) => {
                e.preventDefault();
                setDraggedOverIndex(null);
                onDropBenchPlayer(index);
              }}
              className={`absolute z-20 cursor-pointer transition-all duration-700 ease-out ${
                isNewlyPlaced ? 'animate-in zoom-in-50 duration-500' : ''
              }`}
              style={{
                top: `${coord.top}%`,
                left: `${coord.left}%`,
                transform: `translate(-50%, -50%) ${
                  is3D ? 'rotateX(-36deg)' : 'rotateX(0deg)'
                } ${isDraggedOver ? 'scale(1.18)' : 'scale(1)'}`,
                transformOrigin: '50% 100%'
              }}
            >
              {/* Drag indicator halo or newly placed flash */}
              {isDraggedOver && (
                <div className="absolute -inset-2 rounded-2xl bg-amber-400/50 blur animate-pulse" />
              )}
              {isNewlyPlaced && (
                <div className="absolute -inset-2 rounded-2xl bg-red-600/60 blur animate-ping pointer-events-none" />
              )}

              {/* Slot Tactical Shadow Base */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-14 h-4 bg-black/60 rounded-full blur-[2px] pointer-events-none" />

              {/* Render the Enhanced FUT Player Card */}
              <PlayerCard
                player={player}
                variant="pitch"
                isSelected={isSelected}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
