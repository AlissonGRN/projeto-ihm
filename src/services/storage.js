const STORAGE_KEY = 'sql_game_progress';

export function getGameProgress() {
  const defaultData = { unlockedLevel: 1, currentMissionId: '1.1', stars: {} };

  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    return defaultData;
  }

  try {
    const data = JSON.parse(saved);
    return { ...defaultData, ...data };
  } catch {
    return defaultData;
  }
}

export function saveGameProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}