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
    isSuccessState,
    isGameOver,
    isLevelCompleted,
    handleSubmit,
    handleNextMission,
    handleRestartLevel
  } = useGameEngine(level);

  if (isGameOver) {
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

  if (isLevelCompleted) {
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

      {isSuccessState && (
        <SuccessModal result={queryResult} onNext={handleNextMission} />
      )}

      <div className="max-w-2xl mx-auto">
        <GameHeader
          levelNumber={currentMission.id}
          lives={lives}
          onBack={onBack}
        />
        <MissionBriefing mission={currentMission} />
        <SqlEditor
          query={query}
          setQuery={setQuery}
          onSubmit={handleSubmit}
          isError={!!errorMessage}
        />
      </div>
    </div>
  );
}