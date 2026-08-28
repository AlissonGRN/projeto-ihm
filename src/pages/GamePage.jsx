import { useState } from 'react';
import { GameHeader } from '../components/Game/GameHeader';
import { MissionBriefing } from '../components/Game/MissionBriefing';
import { SqlEditor } from '../components/Game/SqlEditor';

const mockMission = {
  title: "Auditoria de Clientes Inativos",
  description: "O setor de marketing precisa de uma listagem com o nome e e-mail de todos os clientes que não realizam compras há mais de 90 dias.",
  tableSchema: "clientes (id, nome, email, ultima_compra)"
};

export function GamePage({ onBack }) {
  const [lives, setLives] = useState(3);
  const [query, setQuery] = useState('');
  const [isError, setIsError] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleSubmit = () => {
    // Validação simulada para o MVP (exemplo: checar se contém SELECT)
    if (!query.toLowerCase().includes('select')) {
      const nextLives = lives - 1;
      setLives(nextLives);
      setIsError(true);
      setFeedbackMessage('Erro: Sintaxe inválida ou falta do comando SELECT.');

      if (nextLives <= 0) {
        alert('Você perdeu todas as vidas! Reiniciando nível...');
        setLives(3);
        setQuery('');
      }
      return;
    }

    setIsError(false);
    setFeedbackMessage('Sucesso! Dados extraídos corretamente.');
    alert('Parabéns! Missão cumprida.');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 font-sans">
      <div className="max-w-2xl mx-auto">
        <GameHeader
          levelNumber={1}
          lives={lives}
          onBack={onBack}
        />

        <MissionBriefing mission={mockMission} />

        <SqlEditor
          query={query}
          setQuery={setQuery}
          onSubmit={handleSubmit}
          isError={isError}
        />

        {feedbackMessage && (
          <div className={`mt-4 p-4 rounded-lg text-sm font-medium ${isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
            }`}>
            {feedbackMessage}
          </div>
        )}
      </div>
    </div>
  );
}