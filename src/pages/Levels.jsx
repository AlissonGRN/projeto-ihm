import { LevelCard } from '../components/LevelSelector/LevelCard';
import { getGameProgress } from '../services/storage';

export function LevelsPage({ levels, onLevelSelect, onBackToHome }) {
  const progress = getGameProgress();

  const totalPossibleStars = levels.reduce((acc, level) => {
    const count = level.missions ? level.missions.length : 0;
    return acc + (count * 3);
  }, 0);

  const totalEarnedStars = Object.values(progress.stars || {}).reduce((acc, stars) => acc + stars, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 font-sans">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Módulos de Treinamento</h1>
            <p className="text-gray-600 mt-2">Selecione um nível para continuar sua jornada.</p>
          </div>
          <div className="bg-white px-6 py-3 rounded-xl font-bold text-xl border border-gray-200 flex items-center gap-3 shadow-sm">
            <span className="text-yellow-400 text-2xl">★</span>
            <span className="text-gray-800">{totalEarnedStars}</span>
            <span className="text-gray-400">/ {totalPossibleStars}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {levels.map((level) => (
            <LevelCard
              key={level.id}
              level={level}
              progress={progress}
              onSelect={() => onLevelSelect(level)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}