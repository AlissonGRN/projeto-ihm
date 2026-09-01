import { useState } from 'react';
import { HomePage } from './pages/HomePage';
import { LevelsPage } from './pages/Levels';
import { GamePage } from './pages/GamePage';
import { levelsData } from './data/levelsData';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [selectedLevel, setSelectedLevel] = useState(null);

  const handleStartGame = () => {
    setCurrentScreen('levels');
  };

  // Recebe diretamente o objeto do nível vindo da LevelsPage
  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
    setCurrentScreen('game');
  };

  const handleBackToLevels = () => {
    setSelectedLevel(null);
    setCurrentScreen('levels');
  };

  return (
    <>
      {currentScreen === 'home' && (
        <HomePage onStartGame={handleStartGame} />
      )}

      {currentScreen === 'levels' && (
        <LevelsPage
          levels={levelsData}
          onLevelSelect={handleLevelSelect}
          onBackToHome={() => setCurrentScreen('home')}
        />
      )}

      {currentScreen === 'game' && selectedLevel && (
        <GamePage
          level={selectedLevel}
          onBack={handleBackToLevels}
        />
      )}
    </>
  );
}