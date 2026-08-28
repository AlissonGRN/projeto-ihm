export function SqlEditor({ query, setQuery, onSubmit, isError }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col gap-4">
      <label className="text-sm font-semibold text-gray-800">
        Editor SQL
      </label>

      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="SELECT * FROM..."
        rows={5}
        className={`w-full font-mono text-sm p-4 rounded-lg border focus:outline-none focus:ring-2 resize-none ${isError
          ? 'border-red-500 focus:ring-red-200 bg-red-50 text-red-900'
          : 'border-gray-200 focus:ring-blue-200 text-gray-800'
          }`}
      />

      <button
        onClick={onSubmit}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors cursor-pointer"
      >
        Executar Query
      </button>
    </div>
  );
}