export function HomePage({ onStartGame }) {
  return (
    <div className="min-h-screen bg-black py-16 px-4 font-mono text-gray-300 selection:bg-emerald-500 selection:text-black flex items-center justify-center">
      <div className="max-w-xl w-full bg-gray-950 border border-gray-800 p-8 rounded-sm shadow-[0_0_30px_rgba(0,0,0,0.8)] relative overflow-hidden">

        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-50"></div>

        <div className="flex justify-between items-center mb-8">
          <span className="text-emerald-500/50 text-[10px] tracking-widest">SQL_QUEST // HOME</span>
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-black text-emerald-400 tracking-widest uppercase mb-3">
            SQL_QUEST
          </h1>
          <p className="text-gray-400 text-xs leading-relaxed uppercase tracking-wider">
            Um jogo educativo para praticar e aprender comandos SQL de forma prática. Resolva desafios de consulta a bancos de dados divididos em níveis de dificuldade.
          </p>
        </div>

        <div className="bg-black border border-gray-900 p-4 mb-8 text-xs space-y-2">
          <div className="text-gray-500 font-bold uppercase tracking-wider mb-2">/ COMO FUNCIONA O JOGO</div>
          <div className="text-gray-400 flex items-center gap-2">
            <span className="text-emerald-500">►</span> Leia o objetivo da consulta e analise a estrutura da tabela.
          </div>
          <div className="text-gray-400 flex items-center gap-2">
            <span className="text-emerald-500">►</span> Escreva e execute sua query SQL diretamente no terminal.
          </div>
          <div className="text-gray-400 flex items-center gap-2">
            <span className="text-emerald-500">►</span> Responda corretamente para avançar de fase e evitar penalidades por erros.
          </div>
        </div>

        <button
          onClick={onStartGame}
          className="w-full bg-emerald-950 hover:bg-emerald-500 text-emerald-400 hover:text-black font-bold py-4 px-8 border border-emerald-500 rounded-sm transition-all cursor-pointer text-xs uppercase tracking-widest shadow-[0_0_15px_rgba(16,185,129,0.15)]"
        >
          INICIAR JOGO ➔
        </button>
      </div>
    </div>
  );
}