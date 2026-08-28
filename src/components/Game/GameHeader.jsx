export function GameHeader({ levelNumber, lives, onBack }) {
  return (
    <header className="flex justify-between items-center bg-white px-6 py-4 rounded-xl shadow-sm border border-gray-100 mb-6">
      <button
        onClick={onBack}
        className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors"
      >
        ← Voltar aos Níveis
      </button>

      <h1 className="text-xl font-bold text-gray-800">
        Nível {levelNumber}
      </h1>

      <div className="flex items-center gap-1">
        {[1, 2, 3].map((life) => (
          <span
            key={life}
            className={`text-xl ${life <= lives ? 'text-red-500' : 'text-gray-300'}`}
          >
            ❤️
          </span>
        ))}
      </div>
    </header>
  );
}