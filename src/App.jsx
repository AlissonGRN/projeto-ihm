import { useState } from 'react';
import { LevelsPage } from './pages/Levels';
import { GamePage } from './pages/GamePage';

export default function App() {
  const [currentLevel, setCurrentLevel] = useState(null);

  return (
    <>
      {currentLevel ? (
        <GamePage level={currentLevel} onBack={() => setCurrentLevel(null)} />
      ) : (
        // Aqui é onde o App.jsx precisa passar a função onLevelSelect
        <LevelsPage onLevelSelect={(level) => setCurrentLevel(level)} />
      )}
    </>
  );
}