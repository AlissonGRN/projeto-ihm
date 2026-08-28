export function LevelCard({ level, onSelect }) {
  const isLocked = level.status === 'locked';

  return (
    <button
      disabled={isLocked}
      onClick={() => onSelect(level.id)}
      className={`
        relative p-6 rounded-xl border-2 flex flex-col items-center justify-center transition-all
        ${isLocked
          ? 'bg-gray-100 border-gray-200 cursor-not-allowed opacity-70'
          : 'bg-white border-blue-500 hover:bg-blue-50 hover:-translate-y-1 cursor-pointer shadow-sm'
        }
      `}
    >
      <span className="text-2xl font-black text-gray-800">{level.number}</span>

      {/* Sistema de Estrelas / Pontuação */}
      {!isLocked && level.status === 'completed' && (
        <div className="flex gap-1 mt-3">
          {[1, 2, 3].map((star) => (
            <span key={star} className={star <= level.stars ? 'text-yellow-400' : 'text-gray-300'}>
              ★
            </span>
          ))}
        </div>
      )}

      {/* Cadeado para níveis bloqueados */}
      {isLocked && (
        <div className="absolute top-2 right-2 text-gray-400 text-sm">
          🔒
        </div>
      )}
    </button>
  );
}