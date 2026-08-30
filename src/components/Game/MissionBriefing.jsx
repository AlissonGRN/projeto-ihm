export function MissionBriefing({ mission }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-900 mb-2">{mission.title}</h2>
      <p className="text-gray-700 mb-6">{mission.description}</p>

      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
          Estrutura da Tabela:
        </h3>

        {mission.schema ? (
          <pre className="text-sm text-gray-600 font-mono whitespace-pre-wrap mt-2">
            {mission.schema.trim()}
          </pre>
        ) : (
          <p className="text-sm text-gray-400 italic mt-2">Nenhuma estrutura informada.</p>
        )}
      </div>
    </div>
  );
}