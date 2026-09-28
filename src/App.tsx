import React, { useState, useEffect, useRef } from 'react';
import {
  CameraAngle,
  CourtSurface,
  FormationKey,
  Player,
  PositionCoordinates
} from './types/football';
import {
  CLUB_INFO,
  FORMATIONS,
  INITIAL_BENCH,
  INITIAL_STARTERS,
  PLAYS_CATALOG
} from './data/teamData';
import { Court } from './components/Court';
import { PlayerCard } from './components/PlayerCard';
import { GoalCelebrationBanner } from './components/GoalCelebrationBanner';
import { PlayerDetailModal } from './components/PlayerDetailModal';
import { AddPlayerModal } from './components/AddPlayerModal';
import { SubstitutionBoard } from './components/SubstitutionBoard';
import { LineupPresentationOverlay } from './components/LineupPresentationOverlay';
import { MatchFinishedModal } from './components/MatchFinishedModal';
import { ChamosLogo } from './components/ChamosLogo';
import { sound } from './utils/audio';
import {
  Play,
  RotateCcw,
  Volume2,
  VolumeX,
  Rotate3d,
  UserPlus,
  RefreshCw,
  Sparkles,
  Trophy,
  ChevronDown,
  ChevronUp,
  History,
  Flame,
  Zap
} from 'lucide-react';

interface ScorerRecord {
  id: string;
  player: Player;
  minute: string;
  playTitle: string;
}

export default function App() {
  // Lineup state (ALL 8 players with 92 OVR)
  const [starters, setStarters] = useState<Player[]>(INITIAL_STARTERS);
  const [bench, setBench] = useState<Player[]>(INITIAL_BENCH);

  // Match scoreboard and live clock (FIFA Fast Clock: 40 min match in ~60 real seconds)
  const MATCH_DURATION_SECONDS = 40 * 60; // 2400s = 40:00
  const [scoreChamos, setScoreChamos] = useState<number>(0);
  const [scoreRival, setScoreRival] = useState<number>(0);
  const [matchSeconds, setMatchSeconds] = useState<number>(0);
  const [isClockRunning, setIsClockRunning] = useState<boolean>(false);
  const [isMatchFinished, setIsMatchFinished] = useState<boolean>(false);
  const [showScorersHistory, setShowScorersHistory] = useState<boolean>(false);

  // Session scorers registry
  const [scorersHistory, setScorersHistory] = useState<ScorerRecord[]>([]);

  // Tactical setup
  const [formation, setFormation] = useState<FormationKey>('2-2');
  const [surface, setSurface] = useState<CourtSurface>('turf_pro');
  const [cameraAngle, setCameraAngle] = useState<CameraAngle>('3d');

  // Interactive ball and player coords
  const [playerPositions, setPlayerPositions] = useState<PositionCoordinates[]>(
    FORMATIONS['2-2'].slots.map((s) => s.coords)
  );
  const [ballPosition, setBallPosition] = useState<{ top: number; left: number }>({
    top: 50,
    left: 50
  });
  const [isBallVisible, setIsBallVisible] = useState(false);

  // Lineup Presentation State (Franco -> Henry -> Percu -> Aaron -> Raúl)
  const [isLineupPresenting, setIsLineupPresenting] = useState<boolean>(false);
  const [presentingPlayerIndex, setPresentingPlayerIndex] = useState<number>(0);
  const [presentedSlots, setPresentedSlots] = useState<number[]>([]); // Vacío al inicio para presentar
  const [isFlyingToPitch, setIsFlyingToPitch] = useState<boolean>(false);
  const [newlyPlacedSlotIndex, setNewlyPlacedSlotIndex] = useState<number | null>(null);

  // Helper: check if all 5 players have finished being placed on pitch
  const arePlayersPlaced = presentedSlots.length === starters.length && !isLineupPresenting;

  // Play animation state
  const [isPlayingSequence, setIsPlayingSequence] = useState(false);
  const [playStatusText, setPlayStatusText] = useState<string>('Presiona "INICIAR PARTIDO" para presentar los jugadores en cancha.');

  // Modals & Overlays
  const [inspectedPlayer, setInspectedPlayer] = useState<Player | null>(null);
  const [isInspectOpen, setIsInspectOpen] = useState(false);
  const [isAddPlayerOpen, setIsAddPlayerOpen] = useState(false);
  const [isGoalBannerOpen, setIsGoalBannerOpen] = useState(false);
  const [goalScorer, setGoalScorer] = useState<Player | null>(null);
  const [goalMotto, setGoalMotto] = useState<string>(CLUB_INFO.motto);

  // Substitution feedback board
  const [subIncoming, setSubIncoming] = useState<Player | null>(null);
  const [subOutgoing, setSubOutgoing] = useState<Player | null>(null);
  const [isSubBoardOpen, setIsSubBoardOpen] = useState(false);
  const subTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Drag & drop state
  const [draggedBenchIndex, setDraggedBenchIndex] = useState<number | null>(null);
  const [draggedOverIndex, setDraggedOverIndex] = useState<number | null>(null);
  const [selectedSlotIndex, setSelectedSlotIndex] = useState<number | null>(null);

  // Audio mute
  const [isMuted, setIsMuted] = useState(false);

  // Mobile bench drawer open/closed toggle
  const [isBenchCollapsed, setIsBenchCollapsed] = useState(false);
  const [newlyAddedPlayerId, setNewlyAddedPlayerId] = useState<string | null>(null);

  // FIFA / EA FC CLOCK ENGINE: 40 minutos de partido en 60 segundos reales
  // Ticks cada 100ms sumando 4 segundos simulados (40s simulados / segundo real -> 2400s en 60s)
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isClockRunning && !isMatchFinished) {
      interval = setInterval(() => {
        setMatchSeconds((prev) => {
          const next = prev + 4;

          // Entretiempo a los 20:00 (1200s)
          if (prev < 1200 && next >= 1200) {
            sound.playDoubleWhistle();
            setPlayStatusText('¡DESCANSO / ENTRETIEMPO (20:00)! Comienza la segunda parte (2T).');
          }

          // Final del partido a los 40:00 (2400s)
          if (next >= MATCH_DURATION_SECONDS) {
            sound.playFinalWhistle();
            setIsClockRunning(false);
            setIsMatchFinished(true);
            setPlayStatusText('¡FINAL DEL PARTIDO! 40:00 minutos reglamentarios cumplidos.');
            return MATCH_DURATION_SECONDS;
          }

          return next;
        });
      }, 100);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isClockRunning, isMatchFinished]);

  // Format MM:SS
  const formatClock = (totalSec: number) => {
    const mins = Math.floor(Math.min(totalSec, MATCH_DURATION_SECONDS) / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getMatchMinute = () => {
    const min = Math.min(40, Math.max(1, Math.floor(matchSeconds / 60)));
    return `${min}'`;
  };

  const matchPeriod = matchSeconds >= 2400 ? 'FIN' : matchSeconds >= 1200 ? '2T' : '1T';

  // Update player positions when formation changes
  useEffect(() => {
    if (!isPlayingSequence && !isLineupPresenting) {
      setPlayerPositions(FORMATIONS[formation].slots.map((s) => s.coords));
    }
  }, [formation, isPlayingSequence, isLineupPresenting]);

  const handleToggleMute = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  const handleResetPositions = () => {
    setPlayerPositions(FORMATIONS[formation].slots.map((s) => s.coords));
    setIsBallVisible(false);
    setBallPosition({ top: 50, left: 50 });
    setPlayStatusText('');
  };

  // --------------------------------------------------------------------------
  // 1. REINICIAR PARTIDO (Score 0-0, Clock 00:00, Reset Field, Clear History)
  // --------------------------------------------------------------------------
  const handleResetMatch = () => {
    setScoreChamos(0);
    setScoreRival(0);
    setMatchSeconds(0);
    setIsClockRunning(false);
    setIsMatchFinished(false);
    setScorersHistory([]);
    setIsBallVisible(false);
    setBallPosition({ top: 50, left: 50 });
    setPlayerPositions(FORMATIONS[formation].slots.map((s) => s.coords));
    setPresentedSlots([]); // Limpia la cancha para iniciar la presentación
    sound.playDoubleWhistle();
    setPlayStatusText('¡PARTIDO REINICIADO! Presiona "INICIAR PARTIDO" para colocar los jugadores en cancha.');
  };

  // --------------------------------------------------------------------------
  // 2. INICIAR PARTIDO: Presentación de Cartas 1 a 1 en el Centro
  // (Franco -> Henry -> Percu -> Aaron -> Raúl)
  // --------------------------------------------------------------------------
  const handleStartMatchPresentation = async () => {
    if (isLineupPresenting || isPlayingSequence) return;
    setIsLineupPresenting(true);
    setIsMatchFinished(false);
    setPresentedSlots([]); // Cancha vacía para la colocación 1 a 1
    setPlayStatusText('Iniciando Presentación Oficial de Alineación...');
    sound.playWhistle();

    for (let i = 0; i < starters.length; i++) {
      setPresentingPlayerIndex(i);
      setIsFlyingToPitch(false);
      sound.playPresentationFanfare(i);

      // Card stays giant in center for 1.1s
      await new Promise((r) => setTimeout(r, 1100));

      // Fly to pitch animation
      setIsFlyingToPitch(true);
      await new Promise((r) => setTimeout(r, 450));

      // Land on pitch slot with impact and glow flash
      setPresentedSlots((prev) => [...prev, i]);
      setNewlyPlacedSlotIndex(i);
      sound.playCardImpact();

      await new Promise((r) => setTimeout(r, 350));
      setNewlyPlacedSlotIndex(null);
    }

    setIsLineupPresenting(false);
    setIsFlyingToPitch(false);
    sound.playDoubleWhistle();
    setPlayStatusText('¡JUGADORES COLOCADOS EN CANCHA! Presiona el botón PLAY para iniciar las jugadas.');
    setIsClockRunning(true);
  };

  const handleSkipPresentation = () => {
    setIsLineupPresenting(false);
    setIsMatchFinished(false);
    setPresentedSlots([0, 1, 2, 3, 4]);
    setIsFlyingToPitch(false);
    sound.playDoubleWhistle();
    setPlayStatusText('¡Jugadores colocados en cancha! Presiona el botón PLAY para iniciar las jugadas.');
    setIsClockRunning(true);
  };

  // --------------------------------------------------------------------------
  // 3. JUGADA DE GOL ALEATORIA (25% probabilidad para cada jugador de campo)
  // Los jugadores lejanos (Aaron desde la defensa y Percu/Josué desde el medio)
  // suben y se acercan al área rival para marcar el gol con resumen detallado!
  // --------------------------------------------------------------------------
  const handleStartPlay = async () => {
    if (isPlayingSequence || isLineupPresenting) return;
    if (isMatchFinished) {
      handleResetMatch();
      return;
    }
    setIsPlayingSequence(true);
    setIsGoalBannerOpen(false);

    // 25% probability for each of the 4 outfield players:
    // Slot 0: Pívot Izquierdo (Franco)
    // Slot 1: Pívot Derecho (Henry)
    // Slot 2: Medio Campo (Percu / Josué)
    // Slot 3: Cierre / Defensa (Aaron)
    // (Slot 4: Portero / Raúl - 0% de probabilidad como solicitó el usuario)
    const outfieldIndices = [0, 1, 2, 3];
    const chosenIndex = outfieldIndices[Math.floor(Math.random() * 4)];
    const scorer = starters[chosenIndex] || starters[0];
    const currentMin = getMatchMinute();

    // Reset base formation coords
    const baseCoords = FORMATIONS[formation].slots.map((s) => ({ ...s.coords }));
    setPlayerPositions(baseCoords);
    setBallPosition({ top: 50, left: 50 });
    setIsBallVisible(true);
    sound.playWhistle();

    let playTitle = '';
    let playSummaryText = '';
    let steps: Array<{
      description: string;
      ballTarget: { top: number; left: number };
      durationMs: number;
      sound?: 'kick' | 'pass' | 'whistle' | 'goal';
      playerMovements?: Array<{ slotIndex: number; top: number; left: number }>;
    }> = [];

    if (chosenIndex === 3) {
      // ======================================================================
      // AARON (CIERRE / DEFENSA) - SPRINTA DESDE SU CANCHA AL ÁREA RIVAL
      // ======================================================================
      playTitle = `Desdoble Fulminante de ${scorer.nickname} desde la Defensa`;
      playSummaryText = `¡Qué locura de ${scorer.name}! Recuperó en su propia área, cruzó la cancha a toda velocidad, se asoció con los pívots y sacó un bombazo rompe-redes al ángulo.`;

      steps = [
        {
          description: `🛡️ ${scorer.name} recupera con garra en el área defensiva y sale jugando.`,
          ballTarget: { top: baseCoords[3].top, left: baseCoords[3].left },
          durationMs: 700,
          sound: 'kick'
        },
        {
          description: `⚡ ¡Arranca la moto! ${scorer.nickname} pasa al medio y acelera hacia campo rival.`,
          ballTarget: { top: 46, left: 50 },
          durationMs: 800,
          sound: 'pass',
          playerMovements: [
            { slotIndex: 3, top: 48, left: 45 } // Aaron crosses midfield!
          ]
        },
        {
          description: `🔥 Los atacantes jalan marcas abriendo el carril central para la llegada de ${scorer.nickname}.`,
          ballTarget: { top: 22, left: 26 },
          durationMs: 800,
          sound: 'pass',
          playerMovements: [
            { slotIndex: 0, top: 20, left: 22 }, // Pivot draws mark left
            { slotIndex: 1, top: 20, left: 78 }, // Pivot draws mark right
            { slotIndex: 3, top: 23, left: 48 }  // Aaron arrives right at the edge of opponent's box!
          ]
        },
        {
          description: `🎯 ¡Pase de la muerte! Devolución perfecta al corazón del área para ${scorer.nickname}.`,
          ballTarget: { top: 22, left: 48 },
          durationMs: 650,
          sound: 'pass'
        },
        {
          description: `🚀 ¡¡¡BOMBAZO DE ${scorer.nickname}!!! Fusila de primera intención y revienta las redes.`,
          ballTarget: { top: 3, left: 54 },
          durationMs: 1000,
          sound: 'goal'
        }
      ];
    } else if (chosenIndex === 2) {
      // ======================================================================
      // PERCU / JOSUÉ (MEDIO CAMPO) - CONDUCCIÓN Y ENTRADA AL ÁREA RIVAL
      // ======================================================================
      playTitle = `Incursión Mágica de ${scorer.nickname} al Corazón del Área`;
      playSummaryText = `¡Maestría táctica de ${scorer.name}! Conducción vertical imparable desde la medular, quiebre de cintura al borde del área y misil teledirigido al ángulo superior.`;

      steps = [
        {
          description: `⚔️ ${scorer.name} roba el balón con presión alta en el círculo central.`,
          ballTarget: { top: 50, left: 50 },
          durationMs: 700,
          sound: 'kick'
        },
        {
          description: `💨 ${scorer.nickname} acelera rompiendo la línea media y descarga a banda derecha.`,
          ballTarget: { top: 24, left: 70 },
          durationMs: 750,
          sound: 'pass',
          playerMovements: [
            { slotIndex: 2, top: 34, left: 52 }
          ]
        },
        {
          description: `✨ Pared fulminante: ${scorer.nickname} se mete al área y recibe en carrera.`,
          ballTarget: { top: 20, left: 50 },
          durationMs: 800,
          sound: 'pass',
          playerMovements: [
            { slotIndex: 2, top: 20, left: 50 } // Midfielder charges into box!
          ]
        },
        {
          description: `🎯 ¡Recorte y bombazo! ${scorer.nickname} limpia la jugada y define con rosca al ángulo.`,
          ballTarget: { top: 3, left: 42 },
          durationMs: 1000,
          sound: 'goal'
        }
      ];
    } else if (chosenIndex === 0) {
      // ======================================================================
      // FRANCO (PÍVOT IZQUIERDO) - VOLEA FULMINANTE DE PRIMERA
      // ======================================================================
      playTitle = `Volea Letal de Primera de ${scorer.nickname}`;
      playSummaryText = `¡Definición rompe-redes de ${scorer.name}! Combinación de pívots a un toque, desmarque fulminante al segundo palo y zapatazo seco que perforó las redes.`;

      steps = [
        {
          description: `⚽ Salida rápida desde el fondo: balón filtrado hacia el medio campo.`,
          ballTarget: { top: 46, left: 50 },
          durationMs: 700,
          sound: 'pass'
        },
        {
          description: `🔥 Conexión de pívots: centro envenenado cruzado buscando a ${scorer.nickname}.`,
          ballTarget: { top: 18, left: 66 },
          durationMs: 750,
          sound: 'pass',
          playerMovements: [
            { slotIndex: 0, top: 16, left: 40 } // Franco sprints to far post!
          ]
        },
        {
          description: `⚡ ¡Pase al segundo palo! ${scorer.nickname} gana la espalda de la zaga.`,
          ballTarget: { top: 16, left: 42 },
          durationMs: 700,
          sound: 'pass'
        },
        {
          description: `🚀 ¡¡VOLEA FULMINANTE DE ${scorer.nickname}!! Zapatazo inatajable al techo del arco.`,
          ballTarget: { top: 3, left: 48 },
          durationMs: 1000,
          sound: 'goal'
        }
      ];
    } else {
      // ======================================================================
      // HENRY (PÍVOT DERECHO) - DESBORDE Y ZAPATAZO CRUZADO
      // ======================================================================
      playTitle = `Zapatazo Cruzado con Comba de ${scorer.nickname}`;
      playSummaryText = `¡Desborde descomunal de ${scorer.name}! Encaró en velocidad por banda derecha, recortó hacia el centro y sacó un misil cruzado teledirigido a la escuadra.`;

      steps = [
        {
          description: `🛡️ Transición ofensiva rápida: apertura limpia hacia la banda derecha.`,
          ballTarget: { top: 26, left: 74 },
          durationMs: 700,
          sound: 'pass',
          playerMovements: [
            { slotIndex: 1, top: 22, left: 74 }
          ]
        },
        {
          description: `⚡ ¡Bicicleta eléctrica de ${scorer.nickname}! Deja al defensa clavado y corta al centro.`,
          ballTarget: { top: 18, left: 56 },
          durationMs: 800,
          sound: 'kick',
          playerMovements: [
            { slotIndex: 1, top: 18, left: 54 } // Henry cuts into danger zone!
          ]
        },
        {
          description: `🎯 Acomoda el cuerpo y saca un derechazo cruzado con efecto diabólico.`,
          ballTarget: { top: 18, left: 52 },
          durationMs: 650,
          sound: 'kick'
        },
        {
          description: `💥 ¡¡BOMBAZO CRUZADO DE ${scorer.nickname}!! El balón pega en el poste y se clava adentro.`,
          ballTarget: { top: 3, left: 36 },
          durationMs: 1000,
          sound: 'goal'
        }
      ];
    }

    // Execute steps sequentially
    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      setPlayStatusText(step.description);

      if (step.sound === 'whistle') sound.playWhistle();
      else if (step.sound === 'pass' || step.sound === 'kick') sound.playKick();
      else if (step.sound === 'goal') sound.playGoalHorn();

      if (step.playerMovements) {
        setPlayerPositions((prev) => {
          const next = [...prev];
          step.playerMovements?.forEach((mov) => {
            if (next[mov.slotIndex]) {
              next[mov.slotIndex] = { top: mov.top, left: mov.left };
            }
          });
          return next;
        });
      }

      setBallPosition(step.ballTarget);
      await new Promise((r) => setTimeout(r, step.durationMs));
    }

    // Increment score in real time
    const newScore = scoreChamos + 1;
    setScoreChamos(newScore);
    setGoalScorer(scorer);
    setGoalMotto(playSummaryText);

    // Log in session records with detailed summary
    const newGoalRecord: ScorerRecord = {
      id: `sc-${Date.now()}`,
      player: scorer,
      minute: currentMin,
      playTitle: playTitle
    };
    setScorersHistory((prev) => [newGoalRecord, ...prev]);

    sound.playGoalHorn();
    setIsGoalBannerOpen(true);
    setPlayStatusText(`¡GOLAZO! (${currentMin}) ${scorer.name} anota para Los Chamos FC: ${playTitle}.`);

    // Team celebration pose
    await new Promise((r) => setTimeout(r, 1200));
    setPlayerPositions((prev) =>
      prev.map((pos, i) => ({
        top: 24 + (i % 2) * 6,
        left: 28 + i * 11
      }))
    );

    setIsPlayingSequence(false);
  };

  // Trigger Visual Referee Substitution Board
  const triggerSubstitutionFeedback = (outgoing: Player, incoming: Player) => {
    if (subTimerRef.current) clearTimeout(subTimerRef.current);
    setSubOutgoing(outgoing);
    setSubIncoming(incoming);
    setIsSubBoardOpen(true);
    sound.playSubAlert();

    subTimerRef.current = setTimeout(() => {
      setIsSubBoardOpen(false);
    }, 3800);
  };

  // Drag & drop handlers
  const handleBenchDragStart = (benchIndex: number) => {
    setDraggedBenchIndex(benchIndex);
    sound.playCardHover();
  };

  const handleDropBenchPlayer = (starterIndex: number) => {
    if (draggedBenchIndex === null || isPlayingSequence) return;

    const outgoingStarter = starters[starterIndex];
    const incomingBench = bench[draggedBenchIndex];

    const nextStarters = [...starters];
    nextStarters[starterIndex] = incomingBench;

    const nextBench = [...bench];
    nextBench[draggedBenchIndex] = outgoingStarter;

    setStarters(nextStarters);
    setBench(nextBench);
    setDraggedBenchIndex(null);
    setDraggedOverIndex(null);

    triggerSubstitutionFeedback(outgoingStarter, incomingBench);
  };

  // Swap player from detail modal
  const handleSwapWithBench = (benchPlayerId: string) => {
    if (!inspectedPlayer) return;
    const starterIdx = starters.findIndex((p) => p.id === inspectedPlayer.id);
    const benchIdx = bench.findIndex((p) => p.id === benchPlayerId);

    if (starterIdx !== -1 && benchIdx !== -1) {
      const outgoingStarter = starters[starterIdx];
      const incomingBench = bench[benchIdx];

      const nextStarters = [...starters];
      nextStarters[starterIdx] = incomingBench;

      const nextBench = [...bench];
      nextBench[benchIdx] = outgoingStarter;

      setStarters(nextStarters);
      setBench(nextBench);
      setInspectedPlayer(incomingBench);

      triggerSubstitutionFeedback(outgoingStarter, incomingBench);
    }
  };

  const handleSlotClick = (slotIndex: number) => {
    setSelectedSlotIndex(slotIndex);
    sound.playCardHover();
    setInspectedPlayer(starters[slotIndex]);
    setIsInspectOpen(true);
  };

  const handleBenchClick = (benchPlayer: Player) => {
    sound.playCardHover();
    setInspectedPlayer(benchPlayer);
    setIsInspectOpen(true);
  };

  // Update player from modal
  const handleUpdatePlayer = (updated: Player) => {
    setStarters((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    setBench((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    setInspectedPlayer(updated);
  };

  // Add new player to bench with slide-in bounce highlight
  const handleAddNewPlayer = (newPlayer: Player) => {
    setBench((prev) => [...prev, newPlayer]);
    setNewlyAddedPlayerId(newPlayer.id);
    setIsBenchCollapsed(false);
    sound.playCardImpact();
  };

  // Count goals scored in current session for the banner
  const getPlayerSessionGoals = (playerId: string) => {
    return scorersHistory.filter((r) => r.player.id === playerId).length;
  };

  return (
    <div className="min-h-dvh max-h-dvh h-dvh bg-black text-slate-100 flex flex-col justify-between overflow-hidden selection:bg-amber-400 selection:text-black relative">
      {/* -------------------------------------------------------------------- */}
      {/* LINEUP PRESENTATION OVERLAY (Franco -> Henry -> Percu -> Aaron -> Raúl) */}
      {/* -------------------------------------------------------------------- */}
      <LineupPresentationOverlay
        isOpen={isLineupPresenting}
        presentingPlayer={starters[presentingPlayerIndex] || null}
        presentingIndex={presentingPlayerIndex}
        totalStarters={starters.length}
        isFlyingToPitch={isFlyingToPitch}
        onSkip={handleSkipPresentation}
      />

      {/* -------------------------------------------------------------------- */}
      {/* REFEREE SUBSTITUTION VISUAL BOARD                                    */}
      {/* -------------------------------------------------------------------- */}
      <SubstitutionBoard
        isOpen={isSubBoardOpen}
        incoming={subIncoming}
        outgoing={subOutgoing}
      />

      {/* -------------------------------------------------------------------- */}
      {/* ZONE 1: BROADCAST TV HEADER WITH OFFICIAL CLUB CREST & LIVE SCORE    */}
      {/* -------------------------------------------------------------------- */}
      <header className="w-full bg-neutral-950/95 backdrop-blur-md border-b-2 border-red-600/80 px-2 sm:px-4 py-1.5 z-40 shrink-0 shadow-[0_4px_20px_rgba(220,38,38,0.25)]">
        <div className="max-w-lg mx-auto flex items-center justify-between gap-1 sm:gap-2">
          {/* Brand & Crest */}
          <div className="flex items-center gap-1.5 shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 shrink-0 filter drop-shadow-[0_2px_8px_rgba(245,158,11,0.5)]">
              <ChamosLogo className="w-full h-full" />
            </div>
            <div>
              <span className="font-teko text-lg sm:text-xl font-bold tracking-wider text-white uppercase block leading-none">
                {CLUB_INFO.name}
              </span>
              <span className="text-[8.5px] font-mono tracking-widest text-amber-400 font-bold uppercase block -mt-0.5">
                92 OVR · 2026 PRO
              </span>
            </div>
          </div>

          {/* DYNAMIC TV SCOREBOARD DISPLAY */}
          <div className="flex items-center gap-1 sm:gap-1.5 bg-black/90 border border-red-600/40 rounded-xl px-2 py-0.5 shadow-inner">
            {/* Team 1: CHAMOS */}
            <div className="flex items-center gap-1">
              <span className="font-teko text-xs sm:text-sm font-bold text-amber-400 tracking-wider">
                CHAMOS
              </span>
              <span className="font-teko text-lg sm:text-xl font-extrabold text-white px-1.5 py-0 bg-red-950/80 border border-red-600/60 rounded shadow-md">
                {scoreChamos}
              </span>
            </div>

            <span className="font-mono text-slate-500 font-bold text-xs">-</span>

            {/* Team 2: RIVAL */}
            <div className="flex items-center gap-1">
              <span className="font-teko text-lg sm:text-xl font-extrabold text-white px-1.5 py-0 bg-zinc-900 border border-slate-700 rounded shadow-md">
                {scoreRival}
              </span>
              <span className="font-teko text-xs sm:text-sm font-bold text-slate-400 tracking-wider">
                RIV
              </span>
            </div>

            {/* Match Clock & Period */}
            <div className="flex flex-col items-center border-l border-slate-800 pl-1.5 ml-0.5">
              <div className="flex items-center gap-0.5 text-[8.5px] font-mono leading-none">
                <span className={`w-1.5 h-1.5 rounded-full ${isMatchFinished ? 'bg-amber-400' : 'bg-red-500 animate-pulse'}`} />
                <span className={isMatchFinished ? 'text-amber-400 font-extrabold' : 'text-red-500 font-bold'}>{matchPeriod}</span>
              </div>
              <span className={`font-mono text-[10.5px] sm:text-xs font-bold tracking-tight ${isMatchFinished ? 'text-amber-400' : 'text-emerald-400'}`}>
                {formatClock(matchSeconds)}
              </span>
            </div>

            {/* Goals History Dropdown Toggle */}
            <button
              onClick={() => setShowScorersHistory((prev) => !prev)}
              title="Registro de Goles"
              className="p-1 text-amber-400 hover:text-white transition-colors cursor-pointer relative"
            >
              <History className="w-3.5 h-3.5" />
              {scorersHistory.length > 0 && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 text-white text-[7px] font-mono font-bold rounded-full flex items-center justify-center">
                  {scorersHistory.length}
                </span>
              )}
            </button>
          </div>

          {/* Quick Actions (Reset Match, Start Lineup, Sound) */}
          <div className="flex items-center gap-1 shrink-0">
            {/* REINICIAR PARTIDO BUTTON */}
            <button
              onClick={handleResetMatch}
              title="Reiniciar Partido a 0 - 0"
              className="px-2 py-1 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-amber-400/50 text-amber-300 font-teko text-sm sm:text-base font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-sm"
            >
              <RotateCcw className="w-3 h-3 text-amber-400" />
              <span className="hidden xs:inline">Reiniciar</span>
            </button>

            {/* Sound Mute */}
            <button
              onClick={handleToggleMute}
              title={isMuted ? 'Activar Sonido' : 'Silenciar'}
              className="p-1 rounded-lg bg-neutral-900 border border-neutral-700 text-slate-300 hover:text-white transition-colors flex items-center justify-center cursor-pointer"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
            </button>
          </div>
        </div>

        {/* SCORERS HISTORY DRAWER (Collapsible) */}
        {showScorersHistory && (
          <div className="mt-1.5 pt-1.5 border-t border-red-900/40 max-w-lg mx-auto flex items-center justify-between gap-2 text-xs animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
              <span className="font-mono text-amber-400 font-bold text-[10px] whitespace-nowrap flex items-center gap-1">
                <Flame className="w-3 h-3 text-red-500" /> GOLES ({scorersHistory.length}):
              </span>
              {scorersHistory.length === 0 ? (
                <span className="text-slate-400 font-mono text-[10px]">Sin goles registrados</span>
              ) : (
                scorersHistory.map((rec) => (
                  <span
                    key={rec.id}
                    title={rec.playTitle}
                    className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-neutral-900 border border-red-600/40 font-mono text-[9.5px] text-slate-200 whitespace-nowrap"
                  >
                    <span className="text-amber-400 font-bold">⚽ {rec.player.name}</span>
                    <span className="text-red-400 font-bold">({rec.minute})</span>
                  </span>
                ))
              )}
            </div>
            <button
              onClick={() => setShowScorersHistory(false)}
              className="text-[10px] font-mono text-slate-400 hover:text-white shrink-0 cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}
      </header>

      {/* -------------------------------------------------------------------- */}
      {/* ZONE 2: MAIN VIEWPORT (MOBILE FORMAT - 100DVH FIT)                    */}
      {/* -------------------------------------------------------------------- */}
      <main className="flex-1 w-full max-w-lg mx-auto px-2 py-0.5 flex flex-col justify-between overflow-hidden">
        {/* TACTICAL SETTINGS STRIP */}
        <section className="w-full bg-neutral-950/90 border border-red-600/40 rounded-xl px-2 py-1 backdrop-blur-md shrink-0 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-1.5 text-xs">
            {/* Formation & Surface Selector */}
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-0.5 bg-black/90 p-0.5 rounded-lg border border-red-900/40">
                <span className="text-[10px] font-mono text-amber-400 px-1 hidden sm:inline">
                  Sistema:
                </span>
                {(['2-2', '1-2-1', '1-1-2'] as FormationKey[]).map((fmtKey) => (
                  <button
                    key={fmtKey}
                    onClick={() => {
                      setFormation(fmtKey);
                      sound.playCardHover();
                    }}
                    className={`px-2 py-0.5 rounded font-mono font-bold text-[11px] transition-all cursor-pointer ${
                      formation === fmtKey
                        ? 'bg-red-600 text-white shadow-[0_0_8px_rgba(220,38,38,0.7)]'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {fmtKey}
                  </button>
                ))}
              </div>

              {/* Surface switcher */}
              <div className="flex items-center gap-0.5 bg-black/90 p-0.5 rounded-lg border border-red-900/40">
                <button
                  onClick={() => setSurface('turf_pro')}
                  className={`px-1.5 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                    surface === 'turf_pro'
                      ? 'bg-amber-500 text-black font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  🌿 Césped
                </button>
                <button
                  onClick={() => setSurface('parquet_blue')}
                  className={`px-1.5 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                    surface === 'parquet_blue'
                      ? 'bg-amber-500 text-black font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  🏟️ Futsal
                </button>
              </div>
            </div>

            {/* ACTION BUTTONS: INICIAR PARTIDO or BOTÓN PLAY */}
            <div className="flex items-center gap-1">
              {!arePlayersPlaced ? (
                /* 1. BOTÓN INICIAR PARTIDO (Presentación 1 a 1 de cartas) */
                <button
                  onClick={handleStartMatchPresentation}
                  disabled={isLineupPresenting}
                  className="px-2.5 sm:px-3 py-1 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 disabled:opacity-50 text-neutral-950 font-teko text-sm sm:text-base font-black tracking-wide rounded-lg shadow-[0_0_15px_rgba(245,158,11,0.6)] transition-all flex items-center gap-1 cursor-pointer animate-pulse whitespace-nowrap"
                >
                  <Play className="w-3.5 h-3.5 fill-black text-black" />
                  <span>INICIAR PARTIDO</span>
                </button>
              ) : isMatchFinished ? (
                /* 2. BOTÓN FIN DEL PARTIDO (REINICIAR) */
                <button
                  onClick={handleResetMatch}
                  className="px-2.5 sm:px-3.5 py-1 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-neutral-950 font-teko text-sm sm:text-base font-black tracking-wider rounded-lg shadow-[0_0_15px_rgba(245,158,11,0.7)] transition-all flex items-center gap-1 cursor-pointer animate-pulse whitespace-nowrap"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-black" />
                  <span>FIN (40') · REINICIAR</span>
                </button>
              ) : (
                /* 3. BOTÓN PLAY QUE APARECE CUANDO TERMINAN DE COLOCARSE */
                <button
                  onClick={handleStartPlay}
                  disabled={isPlayingSequence}
                  className="px-3 sm:px-3.5 py-1 bg-gradient-to-r from-red-600 via-red-500 to-amber-500 hover:from-red-500 hover:to-amber-400 disabled:opacity-50 text-white font-teko text-sm sm:text-base font-black tracking-wider rounded-lg shadow-[0_0_18px_rgba(220,38,38,0.7)] transition-all flex items-center gap-1 cursor-pointer animate-pulse whitespace-nowrap"
                >
                  <Play className="w-3.5 h-3.5 fill-white text-white" />
                  <span>{isPlayingSequence ? 'JUGANDO...' : 'PLAY · JUGADA (25%)'}</span>
                </button>
              )}

              {/* 3D / 2D toggle */}
              <button
                onClick={() => {
                  setCameraAngle((prev) => (prev === '3d' ? '2d' : '3d'));
                  sound.playCardHover();
                }}
                className="p-1 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-amber-400 font-mono text-[11px] flex items-center justify-center border border-red-600/40 transition-colors cursor-pointer"
                title="Cambiar perspectiva 3D / 2D"
              >
                <Rotate3d className="w-3.5 h-3.5" />
              </button>

              {/* Reiniciar Posiciones */}
              <button
                onClick={handleResetPositions}
                title="Reiniciar posiciones tácticas"
                className="p-1 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-amber-400 hover:text-white border border-red-600/40 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Dynamic Play Telemetry Banner */}
          {playStatusText && (
            <div className="mt-1 py-0.5 px-2 bg-red-950/70 border border-red-600/50 rounded flex items-center justify-between text-[11px] font-mono text-amber-300 animate-in fade-in duration-200">
              <span className="flex items-center gap-1.5 truncate">
                <Sparkles className="w-3 h-3 text-amber-400 animate-spin shrink-0" />
                <span className="truncate">{playStatusText}</span>
              </span>
              <span className="text-[9px] text-red-400 uppercase shrink-0 ml-1 font-bold">En Vivo</span>
            </div>
          )}
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* THE ENHANCED REALISTIC 3D COURT VIEWPORT (Responsive Scaling)      */}
        {/* ------------------------------------------------------------------ */}
        <div className="w-full flex-1 flex justify-center items-center overflow-hidden my-auto py-0.5">
          <div className="w-full h-full flex items-center justify-center max-h-[50vh] sm:max-h-[56vh] relative">
            {/* Overlay inicial en la cancha cuando los jugadores aún no están colocados */}
            {!arePlayersPlaced && !isLineupPresenting && (
              <div className="absolute z-30 flex flex-col items-center justify-center p-2 text-center pointer-events-auto">
                <div className="bg-black/90 border-2 border-amber-400/90 rounded-2xl p-3 sm:p-4 shadow-[0_0_30px_rgba(245,158,11,0.6)] backdrop-blur-md max-w-[260px] animate-in zoom-in-95 duration-300">
                  <div className="w-9 h-9 mx-auto mb-1">
                    <ChamosLogo className="w-full h-full" />
                  </div>
                  <span className="font-teko text-2xl text-white font-black tracking-wide uppercase block leading-none">
                    Alineación Lista
                  </span>
                  <span className="text-[10px] text-amber-300 font-mono block mt-0.5 mb-2.5">
                    Franco · Henry · Percu · Aaron · Raúl
                  </span>
                  <button
                    onClick={handleStartMatchPresentation}
                    className="w-full py-1.5 px-3 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-neutral-950 font-teko text-lg font-black rounded-lg tracking-wider shadow-md flex items-center justify-center gap-1.5 cursor-pointer animate-pulse"
                  >
                    <Play className="w-3.5 h-3.5 fill-black text-black" />
                    <span>▶ INICIAR PARTIDO</span>
                  </button>
                </div>
              </div>
            )}

            <Court
              surface={surface}
              cameraAngle={cameraAngle}
              starters={starters}
              positions={playerPositions}
              ballPosition={ballPosition}
              isBallVisible={isBallVisible}
              onSlotClick={handleSlotClick}
              onDropBenchPlayer={handleDropBenchPlayer}
              selectedSlotIndex={selectedSlotIndex}
              draggedOverIndex={draggedOverIndex}
              setDraggedOverIndex={setDraggedOverIndex}
              visibleSlotIndices={presentedSlots}
              newlyPlacedSlotIndex={newlyPlacedSlotIndex}
            />
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* ZONE 3: BENCH OF SUBSTITUTES (Slide-in Bounce on Render)            */}
        {/* ------------------------------------------------------------------ */}
        <section className="w-full bg-black/90 border-2 border-red-600/50 rounded-xl p-1.5 sm:p-2 backdrop-blur-md shadow-[0_0_20px_rgba(220,38,38,0.25)] shrink-0">
          <div className="flex items-center justify-between mb-1 border-b border-red-900/40 pb-0.5">
            <div className="flex items-center gap-1.5">
              <span className="font-teko text-lg sm:text-xl font-bold text-amber-400 tracking-wide uppercase">
                SUPLENTES ({bench.length}) · 92 OVR
              </span>
              <span className="text-[9.5px] text-slate-400 font-mono hidden md:inline">
                Arrastra a la cancha para sustituir
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setIsAddPlayerOpen(true)}
                className="px-2 py-0.5 bg-red-600 hover:bg-red-500 text-white font-mono text-[10px] font-bold rounded-lg flex items-center gap-1 cursor-pointer shadow-sm"
              >
                <UserPlus className="w-3 h-3" />
                <span>+ Fichar</span>
              </button>

              <button
                onClick={() => setIsBenchCollapsed((prev) => !prev)}
                className="p-1 text-slate-400 hover:text-white sm:hidden cursor-pointer"
              >
                {isBenchCollapsed ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Horizontal scrollable bench cards with Slide-in Bounce Animation */}
          {!isBenchCollapsed && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5">
              {bench.map((player, idx) => (
                <PlayerCard
                  key={`${player.id}-${player.id === newlyAddedPlayerId ? 'new' : 'init'}`}
                  player={player}
                  variant="bench"
                  animateBounce={true}
                  animationDelay={player.id === newlyAddedPlayerId ? '0ms' : `${idx * 80}ms`}
                  isSelected={inspectedPlayer?.id === player.id}
                  onDragStart={() => handleBenchDragStart(idx)}
                  onClick={() => handleBenchClick(player)}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* -------------------------------------------------------------------- */}
      {/* MODALS & OVERLAYS                                                    */}
      {/* -------------------------------------------------------------------- */}
      {/* Player Detail & FUT Inspection Modal */}
      <PlayerDetailModal
        player={inspectedPlayer}
        isOpen={isInspectOpen}
        onClose={() => setIsInspectOpen(false)}
        onUpdatePlayer={handleUpdatePlayer}
        benchPlayers={bench}
        onSwapWithBench={handleSwapWithBench}
      />

      {/* Add New Player Modal */}
      <AddPlayerModal
        isOpen={isAddPlayerOpen}
        onClose={() => setIsAddPlayerOpen(false)}
        onAddPlayer={handleAddNewPlayer}
      />

      {/* Goal Celebration Banner with Dynamic Score & Detailed Play Summary */}
      <GoalCelebrationBanner
        isOpen={isGoalBannerOpen}
        scorer={goalScorer}
        motto={goalMotto}
        scoreChamos={scoreChamos}
        scoreRival={scoreRival}
        goalsThisSession={goalScorer ? getPlayerSessionGoals(goalScorer.id) : 1}
        onClose={() => setIsGoalBannerOpen(false)}
      />

      {/* Match Finished Modal (40:00 full-time reached) */}
      <MatchFinishedModal
        isOpen={isMatchFinished}
        scoreChamos={scoreChamos}
        scoreRival={scoreRival}
        scorersHistory={scorersHistory}
        onResetMatch={handleResetMatch}
        onClose={() => setIsMatchFinished(false)}
      />
    </div>
  );
}
