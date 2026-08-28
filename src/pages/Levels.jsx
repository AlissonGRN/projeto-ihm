import { useState, useEffect } from 'react';
import { LevelGrid } from '../components/LevelSelector/LevelGrid';

// Dados simulados para o MVP
const mockLevels = [
  { id: 'lvl_1', number: 1, status: 'unlocked', stars: 0 },
  { id: 'lvl_2', number: 2, status: 'locked', stars: 0 },
  { id: 'lvl_3', number: 3, status: 'locked', stars: 0 },
  { id: 'lvl_4', number: 4, status: 'locked', stars: 0 },
  { id: 'lvl_5', number: 5, status: 'locked', stars: 0 },
];

export function LevelsPage() {
  const [levels, setLevels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simula o tempo de carregamento de um banco local (localStorage)
    const fetchProgress = async () => {
      setTimeout(() => {
        setLevels(mockLevels);
        setIsLoading(false);
      }, 500);
    };
    fetchProgress();
  }, []);

  const handleLevelSelect = (levelId) => {
    console.log(`Iniciando o nível: ${levelId}`);

  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-blue-600 font-semibold">Carregando mapa...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 font-sans">
      <div className="max-w-3xl w-full">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Selecione o Nível</h1>
          <div className="bg-white px-4 py-2 rounded-full shadow-sm font-semibold text-gray-700 border border-gray-100">
            Estrelas: {levels.reduce((acc, lvl) => acc + (lvl.stars || 0), 0)} ⭐
          </div>
        </header>

        <LevelGrid
          levels={levels}
          onLevelSelect={handleLevelSelect}
        />
      </div>
    </div>
  );
}