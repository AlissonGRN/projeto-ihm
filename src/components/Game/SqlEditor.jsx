export function SqlEditor({ query, setQuery, onSubmit, isError }) {
  const isEmpty = query.trim().length === 0;

  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      if (!isEmpty) onSubmit();
    }
  };

  return (
    <div className="bg-gray-900 rounded-sm border border-gray-700 flex flex-col mt-6 font-mono shadow-[0_0_15px_rgba(0,0,0,0.5)]">
      <div className="bg-black px-4 py-2 border-b border-gray-800 flex justify-between items-center">
        <span className="text-emerald-500 text-xs tracking-widest flex items-center gap-2">
          <span className="w-2 h-2 bg-emerald-500 animate-pulse"></span>
          TERMINAL_SQL
        </span>
      </div>

      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="-- Digite sua query SQL aqui...&#10;-- Exemplo: SELECT * FROM dados;&#10;-- Dica: Pressione Ctrl + Enter para executar"
        className={`w-full h-40 p-4 font-mono text-sm bg-gray-950 text-emerald-400 placeholder-gray-600 resize-none outline-none transition-colors ${isError ? 'border-b-2 border-red-500 focus:border-red-400' : 'border-b-2 border-gray-800 focus:border-emerald-500'
          }`}
        spellCheck="false"
      />

      <div className="p-3 bg-black flex justify-between items-center">
        <span className="text-xs text-gray-600">
          [CTRL + ENTER]
        </span>
        <button
          onClick={onSubmit}
          disabled={isEmpty}
          className={`font-bold py-2 px-8 rounded-sm transition-all uppercase tracking-widest text-xs ${isEmpty
            ? 'bg-gray-800 text-gray-600 cursor-not-allowed border border-gray-800'
            : 'bg-emerald-900/30 text-emerald-400 border border-emerald-500 hover:bg-emerald-500 hover:text-black cursor-pointer'
            }`}
        >
          Executar Query
        </button>
      </div>
    </div>
  );
}