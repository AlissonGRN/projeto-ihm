import { useState } from 'react';
import { LevelsPage } from './pages/Levels';

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);

  if (isPlaying) {
    return <LevelsPage onBackToHome={() => setIsPlaying(false)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8 border border-gray-100">

        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Prática SQL
        </h1>

        <div className="mb-8 space-y-4">
          <h2 className="font-semibold text-gray-800 text-lg border-b border-gray-100 pb-2">
            Como funciona:
          </h2>

          <ul className="space-y-3 text-gray-600 text-sm">
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>Escreva queries SQL reais para resolver problemas de negócios e extrair os dados corretos.</span>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
              <span>Você possui <strong>3 vidas</strong> por nível. Cada erro consome 1 vida.</span>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              <span>Perder as 3 vidas resulta em falha, reiniciando o nível.</span>
            </li>
          </ul>
        </div>

        <button
          onClick={() => setIsPlaying(true)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 cursor-pointer"
        >
          Iniciar
        </button>

      </div>
    </div>
  );
}