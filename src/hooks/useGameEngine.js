import { useState, useEffect } from 'react';
import { createMissionDatabase, executeQuery } from '../services/database';
import { getGameProgress, saveGameProgress } from '../services/storage';

export function useGameEngine(level) {
  const savedProgress = getGameProgress();
  const initialStepIndex = level.missions.findIndex(m => m.id === savedProgress.currentMissionId);
  const startingStep = initialStepIndex !== -1 ? initialStepIndex : 0;

  const [lives, setLives] = useState(3);
  const [currentStep, setCurrentStep] = useState(startingStep);
  const [query, setQuery] = useState('');
  const [db, setDb] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [queryResult, setQueryResult] = useState(null);

  // Máquina de Estados: 'playing' | 'success' | 'game_over' | 'level_completed'
  const [gameState, setGameState] = useState('playing');

  const currentMission = level.missions[currentStep];

  useEffect(() => {
    async function setupDb() {
      const database = await createMissionDatabase(currentMission.setupSql);
      setDb(database);
    }
    setupDb();
  }, [currentStep, currentMission.setupSql]);

  const handleRestartLevel = async () => {
    setLives(3);
    setCurrentStep(0);
    setQuery('');
    setErrorMessage('');
    setQueryResult(null);
    setGameState('playing'); // Reseta a máquina de estados

    const progress = getGameProgress();
    saveGameProgress({ ...progress, currentMissionId: level.missions[0].id });

    const database = await createMissionDatabase(level.missions[0].setupSql);
    setDb(database);
  };

  const handleWrongAnswer = (message) => {
    const nextLives = lives - 1;
    setLives(nextLives);
    setErrorMessage(message);

    setTimeout(() => {
      setErrorMessage('');
    }, 4000);

    if (nextLives <= 0) {
      setGameState('game_over'); // Transição de estado
    }
  };

  const handleSubmit = async () => {
    setErrorMessage('');

    const freshDb = await createMissionDatabase(currentMission.setupSql);
    const result = executeQuery(freshDb, query);

    if (!result.success) {
      handleWrongAnswer(`Erro: ${result.error}`);
      return;
    }

    const isCorrect = currentMission.validate(result, freshDb);

    if (!isCorrect) {
      handleWrongAnswer('A query rodou, mas o resultado não atende ao objetivo da missão ou o banco não foi modificado corretamente.');
      return;
    }

    setDb(freshDb);
    setQueryResult(result);
    setGameState('success'); // Transição de estado

    const progress = getGameProgress();
    progress.stars[currentMission.id] = 1;
    saveGameProgress(progress);
  };

  const handleNextMission = () => {
    setQuery('');
    setQueryResult(null);
    setLives(3);

    const progress = getGameProgress();

    if (currentStep + 1 < level.missions.length) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      setGameState('playing'); // Volta a jogar

      saveGameProgress({
        ...progress,
        currentMissionId: level.missions[nextStep].id
      });
    } else {
      setGameState('level_completed'); // Terminou o nível

      saveGameProgress({
        ...progress,
        unlockedLevel: Math.max(progress.unlockedLevel, level.id + 1)
      });
    }
  };

  return {
    lives,
    currentMission,
    query,
    setQuery,
    errorMessage,
    queryResult,
    gameState, // Exportamos apenas o estado atual
    handleSubmit,
    handleNextMission,
    handleRestartLevel
  };
}