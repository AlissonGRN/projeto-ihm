export function SuccessModal({ result, onNext, earnedStars }) {
  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 z-50 font-mono">
      <div className="bg-gray-950 border border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.2)] max-w-lg w-full p-8 transform transition-all text-center rounded-sm">

        <div className="flex justify-center gap-2 mb-6">
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

        <h2 className="text-2xl font-black text-emerald-400 mb-2 tracking-widest uppercase">Download Concluído</h2>
        <p className="text-gray-400 mb-6 text-xs uppercase tracking-wider">
          {earnedStars === 3 && "Perfeito. Dados extraídos sem deixar rastros."}
          {earnedStars === 2 && "Bom trabalho. O nó foi processado com sucesso."}
          {earnedStars === 1 && "Alerta evitado por pouco, conexão instável."}
        </p>

        {result && result.values && (
          <div className="bg-black border border-gray-800 p-3 mb-6 max-h-40 overflow-auto text-left text-xs">
            <span className="text-emerald-500/60 block mb-2 text-[10px]">AMOSTRA_DE_DADOS_CAPTURADOS:</span>
            <div className="text-emerald-400 font-mono">
              {result.values.length} registros extraídos com sucesso.
            </div>
          </div>
        )}

        <button
          onClick={onNext}
          className="w-full bg-emerald-950 hover:bg-emerald-500 text-emerald-400 hover:text-black font-bold py-3 px-8 border border-emerald-500 transition-all cursor-pointer text-xs uppercase tracking-widest"
        >
          Próxima Etapa ➔
        </button>
      </div>
    </div>
  );
}