export function LevelCard({ level, progress, onSelect }) {
  const isUnlocked = level.id <= progress.unlockedLevel;

  const levelStars = level.missions.reduce((acc, mission) => {
    return acc + (progress.stars[mission.id] || 0);
  }, 0);

  const maxLevelStars = level.missions.length * 3;

  return (
    <div
      onClick={isUnlocked ? onSelect : undefined}
      className={`relative p-6 rounded-2xl border transition-all ${isUnlocked
        ? 'bg-white border-gray-200 shadow-sm hover:shadow-md hover:border-blue-400 cursor-pointer group'
        : 'bg-gray-100 border-gray-200 opacity-60 cursor-not-allowed'
        }`}
    >
      <div className="flex justify-between items-start mb-4">
        <span className={`text-xs font-bold px-3 py-1 rounded-full ${isUnlocked ? 'bg-blue-100 text-blue-800' : 'bg-gray-200 text-gray-600'
          }`}>
          Nível {level.id}
        </span>

        {isUnlocked && (
          <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg border border-yellow-100">
            <span className="text-yellow-500 text-sm">★</span>
            <span className="text-sm font-bold text-yellow-700">{levelStars}/{maxLevelStars}</span>
          </div>
        )}
      </div>

      <h2 className={`text-xl font-bold mb-2 ${isUnlocked ? 'text-gray-900 group-hover:text-blue-600' : 'text-gray-500'}`}>
        {level.title}
      </h2>

      <p className={`text-sm ${isUnlocked ? 'text-gray-600' : 'text-gray-400'}`}>
        {level.description}
      </p>

      {!isUnlocked && (
        <div className="absolute inset-0 bg-gray-50/50 backdrop-blur-[1px] flex items-center justify-center rounded-2xl">
          <span className="bg-gray-800 text-white text-sm font-bold px-4 py-2 rounded-lg shadow-lg">
            Bloqueado
          </span>
        </div>
      )}
    </div>
  );
}