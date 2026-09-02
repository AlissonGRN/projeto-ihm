export function SuccessModal({ result, onNext, earnedStars }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-8 transform transition-all scale-100 animate-fade-in-up text-center">

        <div className="flex justify-center gap-3 mb-6">
          {[1, 2, 3].map((starIndex) => (
            <div
              key={starIndex}
              className={`text-5xl transition-all transform ${starIndex <= earnedStars
                ? 'text-yellow-400 scale-110 drop-shadow-md'
                : 'text-gray-200 scale-100'
                }`}
            >
              ★
            </div>
          ))}
        </div>

        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Missão Cumprida!</h2>
        <p className="text-gray-600 mb-6">
          {earnedStars === 3 && "Perfeito! Você dominou a query de primeira."}
          {earnedStars === 2 && "Muito bem! Você encontrou o caminho."}
          {earnedStars === 1 && "Foi por pouco, mas o que importa é que funcionou!"}
        </p>

        <button
          onClick={onNext}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-colors cursor-pointer text-lg"
        >
          Próxima Etapa ➔
        </button>
      </div>
    </div>
  );
}