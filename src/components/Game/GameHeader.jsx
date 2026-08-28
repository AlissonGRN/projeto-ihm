export function GameHeader({ levelNumber, lives, onBack }) {
  return (
    <div className="flex items-center justify-between bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
      <button
        onClick={onBack}
        className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
      >
        ← Voltar aos Níveis
      </button>

      <span className="text-lg font-bold text-gray-900">
        Nível {levelNumber}
      </span>

      <div className="flex items-center space-x-1.5">
        {[1, 2, 3].map((heartIndex) => (
          <span
            key={heartIndex}
            className={`text-lg transition-opacity duration-300 ${heartIndex <= lives ? 'opacity-100' : 'opacity-20 grayscale'
              }`}
          >
            ❤️
          </span>
        ))}
      </div>
    </div>
  );
}