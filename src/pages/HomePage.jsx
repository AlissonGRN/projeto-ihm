export function HomePage({ onStartGame }) {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 flex flex-col items-center">
      {/* Hero Section */}
      <header className="w-full bg-blue-600 text-white py-20 px-4 text-center shadow-md">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-extrabold mb-4 tracking-tight drop-shadow-sm">
            SQL Quest
          </h1>
          <p className="text-xl font-light text-blue-100 mb-8">
            Domine banco de dados na prática. Resolva problemas reais, escreva queries do zero e prove que você domina a extração e manipulação de dados.
          </p>
          <button
            onClick={onStartGame}
            className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-bold text-lg py-4 px-10 rounded-full shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
          >
            Começar a Jogar
          </button>
        </div>
      </header>

      {/* Regras e Funcionamento */}
      <main className="max-w-5xl mx-auto w-full px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Como Funciona?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Esqueça os tutoriais chatos. Aqui você recebe um banco de dados real rodando direto no seu navegador e precisa resolver as missões para avançar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Missões Práticas</h3>
            <p className="text-gray-600 text-sm">
              Cada nível apresenta um cenário do dia a dia de um sistema acadêmico. Leia o objetivo e entenda a estrutura das tabelas.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
            <div className="text-4xl mb-4">💻</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Código Livre</h3>
            <p className="text-gray-600 text-sm">
              Não há respostas engessadas. Escreva a sua query SQL como preferir. O motor do jogo valida os dados que retornam, e não o texto que você digitou.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
            <div className="text-4xl mb-4">❤️</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Vidas Limitadas</h3>
            <p className="text-gray-600 text-sm">
              Você tem 3 tentativas por missão. Se errar a query ou trouxer os dados errados, perde uma vida. Chegou a zero? Game Over no nível!
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
            <div className="text-4xl mb-4">🏆</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Evolução Contínua</h3>
            <p className="text-gray-600 text-sm">
              Comece com SELECTs simples e avance até dominar JOINs, agrupamentos (GROUP BY) e modificações na base de dados (UPDATE/DELETE).
            </p>
          </div>
        </div>
      </main>

      <footer className="w-full bg-gray-900 text-gray-400 py-6 text-center mt-auto">
        <p className="text-sm">Desenvolvido por Alisson Nascimento.</p>
      </footer>
    </div>
  );
}