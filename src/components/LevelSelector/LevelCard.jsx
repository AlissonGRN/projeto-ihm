export function LevelCard({ level, progress, onSelect }) {
  const levelStars = progress.stars?.[level.id] || 0;
  const totalMissions = level.missions ? level.missions.length : 0;
  const isUnlocked = level.id === 1 || (progress.stars?.[level.id - 1] !== undefined);

  return (
    <div
      onClick={() => isUnlocked && onSelect()}
      className={`p-6 rounded-sm border font-mono transition-all relative overflow-hidden ${isUnlocked
        ? 'bg-gray-950 border-gray-700 hover:border-emerald-500 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] cursor-pointer group'
        : 'bg-black/40 border-gray-900 opacity-50 cursor-not-allowed'
        }`}
    >
      <div className="flex justify-between items-start mb-4">
        <span className="text-xs text-gray-500 tracking-widest">NÓ_0{level.id}</span>
        <div className="flex gap-1 text-base">
          {[1, 2, 3].map((starIndex) => (
            <span
              key={starIndex}
              className={starIndex <= levelStars ? 'text-emerald-400 drop-shadow-[0_0_5px_rgba(16,185,129,0.8)]' : 'text-gray-800'}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      <h3 className={`text-lg font-bold uppercase tracking-wider mb-2 transition-colors ${isUnlocked ? 'text-gray-100 group-hover:text-emerald-400' : 'text-gray-600'
        }`}>
        {level.title}
      </h3>

      <p className="text-xs text-gray-400 mb-6 line-clamp-2">
        {level.description}
      </p>

      <div className="flex justify-between items-center pt-4 border-t border-gray-900 text-xs">
        <span className="text-gray-500">{totalMissions} Etapas de Invasão</span>
        <span className={isUnlocked ? 'text-emerald-500 font-bold group-hover:translate-x-1 transition-transform' : 'text-gray-700'}>
          {isUnlocked ? '[ ACESSAR ]' : '[ BLOQUEADO ]'}
        </span>
      </div>
    </div>
  );
}