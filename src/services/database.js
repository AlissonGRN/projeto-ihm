import initSqlJs from 'sql.js';
import sqlWasmUrl from 'sql.js/dist/sql-wasm.wasm?url';

let SQL = null;

export async function initDatabase() {
  if (SQL) return SQL;

  SQL = await initSqlJs({
    locateFile: () => sqlWasmUrl
  });

  return SQL;
}

export async function createMissionDatabase(setupSql) {
  const SQL = await initDatabase();
  const db = new SQL.Database();
  db.run(setupSql);
  return db;
}

export function executeQuery(db, query) {
  try {
    const results = db.exec(query);
    if (results.length === 0) {
      return { success: true, columns: [], values: [] };
    }
    return {
      success: true,
      columns: results[0].columns,
      values: results[0].values
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}