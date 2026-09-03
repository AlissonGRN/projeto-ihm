export function SuccessModal({ result, onNext, earnedStars }) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 font-mono">
      <div className="bg-gray-950 border border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.2)] max-w-lg w-full p-8 transform transition-all text-center">

        <div className="flex justify-center gap-3 mb-6">
          {[1, 2, 3].map((starIndex) => (
            <div
              key={starIndex}
              className={`text-4xl transition-all transform ${starIndex <= earnedStars
                ? 'text-emerald-400 scale-110 drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]'
                : 'text-gray-800 scale-100'
                }`}
            >
              ★
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-black text-emerald-400 mb-2 tracking-widest uppercase">Missão Cumprida</h2>
        <p className="text-gray-400 mb-6 text-sm">
          {earnedStars === 3 && "Perfeito. Dados processados sem disparar alertas."}
          {earnedStars === 2 && "Bom trabalho. Os dados foram obtidos com sucesso."}
          {earnedStars === 1 && "Alerta evitado por pouco, mas a query funcionou."}
        </p>

        <button
          onClick={onNext}
          className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-3 px-8 rounded-sm transition-colors cursor-pointer text-sm uppercase tracking-widest"
        >
          Próxima Etapa ➔
        </button>
      </div>
    </div>
  );
}