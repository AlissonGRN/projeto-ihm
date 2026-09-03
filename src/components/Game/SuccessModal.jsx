export function SuccessModal({ result, onNext, earnedStars }) {
  const columns = result?.columns || [];
  const values = result?.values || [];

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 z-50 font-mono">
      <div className="bg-gray-950 border border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.2)] max-w-xl w-full p-8 transform transition-all text-center rounded-sm max-h-[90vh] flex flex-col">

        <div className="flex justify-center gap-2 mb-4">
          {[1, 2, 3].map((starIndex) => (
            <div
              key={starIndex}
              className={`text-3xl transition-all transform ${starIndex <= earnedStars
                ? 'text-emerald-400 scale-110 drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]'
                : 'text-gray-800 scale-100'
                }`}
            >
              ★
            </div>
          ))}
        </div>

        <h2 className="text-xl font-black text-emerald-400 mb-1 tracking-widest uppercase">Missão Concluída</h2>
        <p className="text-gray-400 mb-4 text-xs uppercase tracking-wider">
          Consulta executada com sucesso. Dados extraídos do servidor:
        </p>

        {values.length > 0 && (
          <div className="bg-black border border-gray-800 p-3 mb-6 overflow-auto text-left text-xs rounded-sm max-h-48 flex-grow">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-800 text-emerald-400">
                  {columns.map((col, index) => (
                    <th key={index} className="p-2 font-bold uppercase tracking-wider">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {values.map((row, rowIndex) => (
                  <tr key={rowIndex} className="border-b border-gray-900/50 hover:bg-gray-900 text-gray-300">
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className="p-2">
                        {cell !== null ? String(cell) : 'NULL'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <button
          onClick={onNext}
          className="w-full bg-emerald-950 hover:bg-emerald-500 text-emerald-400 hover:text-black font-bold py-3 px-8 border border-emerald-500 rounded-sm transition-all cursor-pointer text-xs uppercase tracking-widest shrink-0"
        >
          Próxima Etapa ➔
        </button>
      </div>
    </div>
  );
}