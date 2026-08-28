import { LevelCard } from './LevelCard';

export function LevelGrid({ levels, onLevelSelect }) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 w-full">
      {levels.map((level) => (
        <LevelCard
          key={level.id}
          level={level}
          onSelect={onLevelSelect}
        />
      ))}
    </div>
  );
}