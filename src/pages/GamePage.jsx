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
          popover: { title: 'Status', description: 'Aqui você acompanha suas vidas restantes e pode voltar para a tela de níveis.' }
        },
        {
          element: '#tour-briefing',
          popover: { title: 'Objetivo', description: 'Leia atentamente o briefing da missão e o objetivo da consulta SQL.' }
        },
        {
          element: '#tour-editor',
          popover: { title: 'Editor SQL', description: 'Escreva sua query aqui. Use o atalho Ctrl + Enter para executar mais rápido.' }
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
        <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8 border border-gray-100 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Game Over</h2>
          <p className="text-gray-600 text-sm mb-6">Você perdeu todas as suas vidas nesta tentativa.</p>
          <div className="space-y-3">
            <button onClick={handleRestartLevel} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors cursor-pointer">
              Reiniciar Nível
            </button>
            <button onClick={onBack} className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors cursor-pointer">
              Voltar aos Níveis
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'level_completed') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
        <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8 border border-gray-100 text-center">
          <h2 className="text-2xl font-bold text-emerald-600 mb-2">Parabéns!</h2>
          <p className="text-gray-600 text-sm mb-6">Você concluiu todas as etapas do Nível {level.id} com sucesso!</p>
          <button onClick={onBack} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors cursor-pointer">
            Voltar aos Níveis
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 font-sans relative">
      <ErrorToast message={errorMessage} />

      {gameState === 'success' && (
        <SuccessModal
          result={queryResult}
          onNext={handleNextMission}
          earnedStars={lives}
        />
      )}

      <div className="max-w-2xl mx-auto">
        <div className="flex justify-end mb-2">
          <button
            onClick={startTour}
            className="text-xs bg-gray-200 text-gray-700 font-semibold px-3 py-1.5 rounded-lg hover:bg-gray-300 transition-colors cursor-pointer"
          >
            ? Ajuda / Tutorial
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