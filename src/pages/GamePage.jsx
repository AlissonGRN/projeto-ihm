import { useEffect, useRef } from 'react';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import { GameHeader } from '../components/Game/GameHeader';
import { MissionBriefing } from '../components/Game/MissionBriefing';
import { SqlEditor } from '../components/Game/SqlEditor';
import { SuccessModal } from '../components/Game/SuccessModal';
import { ErrorToast } from '../components/Game/ErrorToast';
import { useGameEngine } from '../hooks/useGameEngine';

export function GamePage({ level, onBack }) {
  const {
    lives,
    currentMission,
    query,
    setQuery,
    errorMessage,
    queryResult,
    gameState,
    handleSubmit,
    handleNextMission,
    handleRestartLevel
  } = useGameEngine(level);

  const driverRef = useRef(null);

  const startTour = () => {
    if (driverRef.current) {
      driverRef.current.destroy();
    }

    driverRef.current = driver({
      showProgress: true,
      doneBtnText: 'Concluir',
      nextBtnText: 'Próximo',
      prevBtnText: 'Anterior',
      progressText: 'Passo {{current}} de {{total}}',
      steps: [
        {
          element: '#tour-game-header',
          popover: { title: 'Detecção', description: 'Monitore sua barra de detecção. Erros aumentam o risco.' }
        },
        {
          element: '#tour-briefing',
          popover: { title: 'Objetivo', description: 'Leia o que deve ser consultado e a estrutura da tabela.' }
        },
        {
          element: '#tour-editor',
          popover: { title: 'Terminal', description: 'Escreva sua query SQL e pressione Ctrl + Enter.' }
        }
      ],
      onDestroyed: () => {
        localStorage.setItem('sqlquest_tour_game_done', 'true');
      }
    });

    driverRef.current.drive();
  };

  useEffect(() => {
    const hasSeen = localStorage.getItem('sqlquest_tour_game_done');
    if (!hasSeen) {
      startTour();
    }
    return () => {
      if (driverRef.current) {
        driverRef.current.destroy();
      }
    };
  }, []);

  if (gameState === 'game_over') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4 font-mono">
        <div className="max-w-md w-full bg-gray-950 rounded-sm border-2 border-red-600 shadow-[0_0_30px_rgba(220,38,38,0.4)] p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-red-500 opacity-10 animate-pulse pointer-events-none"></div>

          <h2 className="text-2xl font-black text-red-500 mb-2 tracking-widest">SISTEMA COMPROMETIDO</h2>
          <p className="text-red-400 text-xs mb-8 uppercase tracking-wider">Limite de tentativas excedido. Desconecte-se ou reinicie o nível.</p>

          <div className="space-y-4 relative z-10">
            <button onClick={handleRestartLevel} className="w-full bg-red-950 hover:bg-red-600 text-red-400 hover:text-black border border-red-600 font-bold py-3 px-6 rounded-sm transition-all cursor-pointer uppercase tracking-widest text-xs">
              TENTAR NOVAMENTE
            </button>
            <button onClick={onBack} className="w-full bg-black border border-gray-800 hover:bg-gray-900 text-gray-400 font-bold py-3 px-6 rounded-sm transition-all cursor-pointer uppercase tracking-widest text-xs">
              RETORNAR AOS NÍVEIS
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'level_completed') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4 font-mono">
        <div className="max-w-md w-full bg-gray-950 rounded-sm border-2 border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.2)] p-8 text-center">
          <h2 className="text-2xl font-black text-emerald-400 mb-2 tracking-widest">NÍVEL CONCLUÍDO</h2>
          <p className="text-gray-400 text-xs mb-8 uppercase tracking-wider">Todas as etapas do Nível {level.id} foram concluídas com sucesso.</p>
          <button onClick={onBack} className="w-full bg-emerald-950 hover:bg-emerald-500 text-emerald-400 hover:text-black font-bold py-3 px-6 border border-emerald-500 rounded-sm transition-all cursor-pointer uppercase tracking-widest text-xs">
            RETORNAR AOS NÍVEIS
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-8 px-4 font-mono relative text-gray-300 selection:bg-emerald-500 selection:text-black">
      <ErrorToast message={errorMessage} />

      {gameState === 'success' && (
        <SuccessModal
          result={queryResult}
          onNext={handleNextMission}
          earnedStars={lives}
        />
      )}

      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <span className="text-emerald-500/50 text-[10px] tracking-widest">SQL_TERMINAL_V2.0</span>
          <button
            onClick={startTour}
            className="text-xs bg-gray-900 border border-gray-700 text-emerald-500 font-semibold px-3 py-1.5 rounded-sm hover:bg-gray-800 hover:border-emerald-500 transition-all cursor-pointer"
          >
            [ MANUAL ]
          </button>
        </div>

        <div id="tour-game-header">
          <GameHeader
            levelNumber={currentMission.id}
            lives={lives}
            onBack={onBack}
          />
        </div>

        <div id="tour-briefing" className="mt-4">
          <MissionBriefing mission={currentMission} />
        </div>

        <div id="tour-editor" className="mt-4">
          <SqlEditor
            query={query}
            setQuery={setQuery}
            onSubmit={handleSubmit}
            isError={!!errorMessage}
          />
        </div>
      </div>
    </div>
  );
}