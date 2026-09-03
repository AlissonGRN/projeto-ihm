export function GameHeader({ levelNumber, lives, onBack }) {
  const stealthPercentage = Math.round((lives / 3) * 100);

  const barColor = lives === 3 ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]'
    : lives === 2 ? 'bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.8)]'
      : 'bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.8)]';

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b border-gray-800 pb-4 gap-4 font-mono">
      <button
        onClick={onBack}
        className="text-gray-400 hover:text-emerald-400 transition-colors cursor-pointer flex items-center gap-2 text-sm"
      >
        <span>◄</span> Voltar aos Níveis
      </button>

      <div className="flex items-center gap-4 w-full md:w-auto">
        <span className="text-gray-300 font-bold text-sm tracking-widest">
          Nível {levelNumber}
        </span>
      </div>

      <div className="flex flex-col items-end gap-1 w-full md:w-64">
        <div className="flex justify-between w-full text-xs font-bold tracking-widest">
          <span className={lives <= 1 ? 'text-red-500 animate-pulse' : 'text-gray-400'}>
            NÍVEL DE DETECÇÃO
          </span>
          <span className={lives <= 1 ? 'text-red-500' : 'text-emerald-400'}>
            {100 - stealthPercentage}%
          </span>
        </div>
        <div className="w-full bg-gray-900 border border-gray-700 h-3 rounded-sm overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ease-out ${barColor}`}
            style={{ width: `${stealthPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}