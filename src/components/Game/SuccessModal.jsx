export function SuccessModal({ result, onNext }) {
  const isSelectQuery = result?.columns && result.columns.length > 0;

  return (
    <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full overflow-hidden flex flex-col max-h-[90vh]">

        <div className="p-6 text-center border-b border-gray-100 bg-emerald-50">
          <div className="flex justify-center mb-3">
            <span className="text-5xl text-yellow-400 drop-shadow-sm">⭐</span>
          </div>
          <h2 className="text-2xl font-bold text-emerald-700">Missão Cumprida!</h2>
          {isSelectQuery ? (
            <p className="text-emerald-600 mt-1">A query retornou {result.values.length} registro(s).</p>
          ) : (
            <p className="text-emerald-600 mt-1">O banco de dados foi atualizado com sucesso!</p>
          )}
        </div>

        <div className="p-6 overflow-auto bg-gray-50 flex-1">
          {isSelectQuery ? (
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full text-left border-collapse text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    {result.columns.map((col, idx) => (
                      <th key={idx} className="p-3 border-b border-gray-200 font-semibold text-gray-700">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {result.values.map((row, rowIndex) => (
                    <tr key={rowIndex} className="hover:bg-gray-50">
                      {row.map((val, valIndex) => (
                        <td key={valIndex} className="p-3 border-b border-gray-100 text-gray-600">
                          {val !== null ? val.toString() : 'NULL'}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex items-center justify-center h-24 text-gray-500 italic">
              Operação de modificação de dados (DML) concluída.
            </div>
          )}
        </div>

        <div className="p-6 bg-white border-t border-gray-100">
          <button
            onClick={onNext}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-sm cursor-pointer"
          >
            Próxima Missão
          </button>
        </div>

      </div>
    </div>
  );
}