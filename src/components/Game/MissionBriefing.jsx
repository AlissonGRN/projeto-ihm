export function MissionBriefing({ mission }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
      <h2 className="text-lg font-bold text-gray-900 mb-2">
        {mission.title}
      </h2>
      <p className="text-gray-600 text-sm mb-4">
        {mission.description}
      </p>

      <div className="bg-gray-100 p-4 rounded-lg border border-gray-200">
        <span className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1">
          Estrutura da Tabela:
        </span>
        <code className="text-xs font-mono text-gray-900 font-semibold block">
          {mission.tableSchema}
        </code>
      </div>
    </div>
  );
}