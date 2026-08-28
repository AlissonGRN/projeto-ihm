import { useState, useEffect } from 'react';
import { GameHeader } from '../components/Game/GameHeader';
import { MissionBriefing } from '../components/Game/MissionBriefing';
import { SqlEditor } from '../components/Game/SqlEditor';
import { createMissionDatabase, executeQuery } from '../services/database';
import { levelsData } from '../data/levelsData';

export function GamePage({ onBack }) {
  const currentLevel = levelsData[0];
  const [lives, setLives] = useState(3);
  const [currentStep, setCurrentStep] = useState(0);
  const [query, setQuery] = useState('');
  const [db, setDb] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [queryResult, setQueryResult] = useState(null);
  const [isSuccessState, setIsSuccessState] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isLevelCompleted, setIsLevelCompleted] = useState(false);

  const currentMission = currentLevel.missions[currentStep];

  useEffect(() => {
    async function setupDb() {
      const database = await createMissionDatabase(currentMission.setupSql);
      setDb(database);
    }
    setupDb();
  }, [currentStep]);

  const handleRestartLevel = async () => {
    setLives(3);
    setCurrentStep(0);
    setQuery('');
    setFeedbackMessage('');
    setIsError(false);
    setQueryResult(null);
    setIsSuccessState(false);
    setIsGameOver(false);
    setIsLevelCompleted(false);
    const database = await createMissionDatabase(levelsData[0].missions[0].setupSql);
    setDb(database);
  };

  const handleSubmit = () => {
    if (!db) return;

    const result = executeQuery(db, query);

    if (!result.success) {
      handleWrongAnswer(`Erro de Sintaxe: ${result.error}`);
      return;
    }

    const isCorrect = currentMission.validate(result);

    if (!isCorrect) {
      handleWrongAnswer('A query rodou, mas o resultado não atende ao objetivo da missão.');
      setQueryResult(result);
      return;
    }

    setIsError(false);
    setQueryResult(result);
    setFeedbackMessage('Missão concluída com sucesso!');
    setIsSuccessState(true);
  };

  const handleNextMission = () => {
    setIsSuccessState(false);
    setQuery('');
    setFeedbackMessage('');
    setQueryResult(null);

    if (currentStep + 1 < currentLevel.missions.length) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsLevelCompleted(true);
    }
  };

  const handleWrongAnswer = (message) => {
    const nextLives = lives - 1;
    setLives(nextLives);
    setIsError(true);
    setFeedbackMessage(message);

    if (nextLives <= 0) {
      setIsGameOver(true);
    }
  };

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
          <p className="text-gray-600 text-sm mb-6">Você concluiu todas as etapas do Nível 1 com sucesso!</p>
          <button onClick={onBack} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors cursor-pointer">
            Voltar aos Níveis
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 font-sans">
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
          isError={isError}
        />

        {feedbackMessage && !isSuccessState && (
          <div className="mt-4 p-4 rounded-lg text-sm font-medium bg-red-100 text-red-700">
            {feedbackMessage}
          </div>
        )}

        {isSuccessState && (
          <div className="mt-6 bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center shadow-sm">
            <h3 className="text-lg font-bold text-emerald-800 mb-2">Missão Concluída!</h3>
            <p className="text-emerald-700 text-sm mb-4">Seu resultado está correto e validado com sucesso.</p>
            <button
              onClick={handleNextMission}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 px-6 rounded-lg transition-colors cursor-pointer"
            >
              Avançar para a Próxima Etapa →
            </button>
          </div>
        )}

        {queryResult && queryResult.values && queryResult.values.length > 0 && (
          <div className="mt-4 bg-white rounded-xl shadow-sm border border-gray-100 p-4 overflow-x-auto">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">
              Resultado da Consulta:
            </span>
            <table className="w-full text-left text-sm text-gray-600 font-mono">
              <thead>
                <tr className="border-b border-gray-200">
                  {queryResult.columns.map((col, idx) => (
                    <th key={idx} className="pb-2 font-semibold text-gray-800">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {queryResult.values.map((row, rowIdx) => (
                  <tr key={rowIdx} className="border-b border-gray-100">
                    {row.map((val, valIdx) => (
                      <td key={valIdx} className="py-2">{val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}