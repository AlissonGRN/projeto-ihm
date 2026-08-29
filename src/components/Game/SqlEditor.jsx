import React from 'react';
import EditorModule from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-sql';
import 'prismjs/themes/prism.css';

const Editor = EditorModule.default || EditorModule;

export function SqlEditor({ query, setQuery, onSubmit, isError }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Editor SQL</h3>

      <div
        className={`relative border rounded-xl overflow-hidden bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500 transition-shadow ${isError ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200'
          }`}
      >
        <Editor
          value={query}
          onValueChange={code => setQuery(code)}
          highlight={code => Prism.highlight(code, Prism.languages.sql, 'sql')}
          padding={16}
          style={{
            fontFamily: '"Fira Code", "JetBrains Mono", "Consolas", monospace',
            fontSize: 16,
            minHeight: '120px',
            color: '#1f2937',
          }}
          textareaClassName="focus:outline-none"
        />
      </div>

      <button
        onClick={onSubmit}
        className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors cursor-pointer shadow-sm"
      >
        Executar Query
      </button>
    </div>
  );
}