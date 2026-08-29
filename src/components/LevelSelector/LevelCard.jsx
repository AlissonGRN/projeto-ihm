export function LevelCard({ level, progress, onSelect }) {
  const isUnlocked = Number(progress.unlockedLevel || 1) >= Number(level.id);

  const missionsList = level.missions || [];
  const missionsCount = missionsList.length || level.totalMissions || 0;

  const levelStars = missionsList.reduce((acc, mission) => acc + (progress.stars?.[mission.id] || 0), 0);
  const maxLevelStars = missionsCount;

  return (
    <div
      onClick={isUnlocked ? onSelect : undefined}
      className={`relative p-6 rounded-xl border transition-all ${isUnlocked
        ? 'bg-white border-gray-200 hover:border-blue-500 hover:shadow-md cursor-pointer'
        : 'bg-gray-100 border-gray-200 opacity-75 cursor-not-allowed'
        }`}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-gray-900">Nível {level.id}</h3>
        {isUnlocked && maxLevelStars > 0 && (
          <div className="text-sm font-semibold text-yellow-600 bg-yellow-50 px-2 py-1 rounded border border-yellow-100">
            ⭐ {levelStars} / {maxLevelStars}
          </div>
        )}
      </div>

      <h4 className="text-lg font-semibold text-gray-800 mb-2">{level.title}</h4>
      <p className="text-gray-600 text-sm">{level.description}</p>

      {!isUnlocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/40 backdrop-blur-[1px] rounded-xl">
          <span className="bg-gray-800 text-white px-4 py-2 rounded-lg font-semibold text-sm">
            Bloqueado
          </span>
        </div>
      )}
    </div>
  );
}