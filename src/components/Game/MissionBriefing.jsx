export function MissionBriefing({ mission }) {
  return (
    <div className="bg-gray-900 rounded-sm border border-gray-700 p-6 font-mono shadow-[0_0_15px_rgba(0,0,0,0.5)]">
      <div className="flex justify-between items-start mb-2">
        <h2 className="text-xl font-bold text-gray-100 uppercase tracking-widest">{mission.title}</h2>
      </div>

      <p className="text-gray-300 mb-6 text-sm leading-relaxed">
        {mission.description}
      </p>

      {mission.tip && (
        <div className="bg-emerald-950/40 border-l-4 border-emerald-500 p-4 mb-6 flex gap-3 items-start">
          <span className="text-emerald-400 text-lg" aria-hidden="true">⚡</span>
          <div>
            <span className="block font-bold text-emerald-400 text-xs mb-1 uppercase tracking-wider">Dica do Sistema</span>
            <p className="text-sm text-emerald-300">{mission.tip}</p>
          </div>
        </div>
      )}

      {(mission.schema || mission.tableStructure || mission.structure) && (
        <div className="bg-black p-4 border border-gray-800 rounded-sm">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
            Estrutura da Tabela
          </h3>
          <div className="text-emerald-400 font-mono text-xs bg-gray-950 p-3 border border-gray-800 whitespace-pre-wrap">
            {mission.schema || mission.tableStructure || mission.structure}
          </div>
        </div>
      )}
    </div>
  );
}