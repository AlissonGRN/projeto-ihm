const STORAGE_KEY = 'sql_game_progress';

export function getGameProgress() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    // Estado inicial padrão
    return { unlockedLevel: 1, currentMissionId: '1.1' };
  }
  try {
    return JSON.parse(saved);
  } catch {
    return { unlockedLevel: 1, currentMissionId: '1.1' };
  }
}

export function saveGameProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}