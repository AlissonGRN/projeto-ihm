export function SuccessModal({ result, onNext }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 border border-gray-100">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full mb-3 text-xl font-bold">
            ✓
          </div>
          <h3 className="text-xl font-bold text-gray-900">Missão Concluída!</h3>
          <p className="text-gray-600 text-sm mt-1">Seu resultado está correto e validado com sucesso.</p>
        </div>

        {result && result.values && result.values.length > 0 && (
          <div className="mb-6 bg-gray-50 rounded-xl p-4 border border-gray-200 max-h-60 overflow-y-auto">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">
              Resultado Obtido:
            </span>
            <table className="w-full text-left text-sm text-gray-600 font-mono">
              <thead>
                <tr className="border-b border-gray-200">
                  {result.columns.map((col, idx) => (
                    <th key={idx} className="pb-2 font-semibold text-gray-800">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {result.values.map((row, rowIdx) => (
                  <tr key={rowIdx} className="border-b border-gray-100">
                    {row.map((val, valIdx) => (
                      <td key={valIdx} className="py-2">{val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <button
          onClick={onNext}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors cursor-pointer shadow-sm"
        >
          Avançar para a Próxima Etapa →
        </button>
      </div>
    </div>
  );
}