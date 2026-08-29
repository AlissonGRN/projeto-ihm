import { LevelCard } from '../components/LevelSelector/LevelCard';
import { levelsData } from '../data/levelsData';
import { getGameProgress } from '../services/storage';

export function LevelsPage(props) {
  const handleSelect = props.onLevelSelect || props.onSelectLevel || props.onSelect || (() => { });
  const progress = getGameProgress();

  const totalPossibleStars = levelsData.reduce((acc, level) => {
    const count = level.missions ? level.missions.length : (level.totalMissions || 0);
    return acc + count;
  }, 0);

  const totalEarnedStars = Object.values(progress.stars || {}).reduce((acc, stars) => acc + stars, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Módulos de Treinamento</h1>
            <p className="text-gray-600 mt-2">Selecione um nível para continuar sua jornada.</p>
          </div>
          <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg font-bold text-lg border border-yellow-200 flex items-center gap-2 shadow-sm">
            <span>⭐</span>
            <span>{totalEarnedStars} / {totalPossibleStars}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {levelsData.map((level, index) => {
            const safeLevelId = level.id !== undefined ? level.id : index + 1;
            const safeLevel = { ...level, id: safeLevelId };

            return (
              <LevelCard
                key={safeLevelId}
                level={safeLevel}
                progress={progress}
                onSelect={() => handleSelect(safeLevel)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}