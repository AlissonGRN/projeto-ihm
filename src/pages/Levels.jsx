import { useEffect, useRef } from 'react';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import { LevelCard } from '../components/LevelSelector/LevelCard';
import { getGameProgress } from '../services/storage';

export function LevelsPage({ levels, onLevelSelect, onBackToHome }) {
  const progress = getGameProgress();
  const driverRef = useRef(null);

  const totalPossibleStars = levels.reduce((acc, level) => {
    const count = level.missions ? level.missions.length : 0;
    return acc + (count * 3);
  }, 0);

  const totalEarnedStars = Object.values(progress.stars || {}).reduce((acc, stars) => acc + stars, 0);

  const progressPercentage = totalPossibleStars === 0
    ? 0
    : Math.min(100, Math.max(0, (totalEarnedStars / totalPossibleStars) * 100));

  const startTour = () => {
    if (driverRef.current) {
      driverRef.current.destroy();
    }

    driverRef.current = driver({
      showProgress: true,
      doneBtnText: 'Concluir',
      nextBtnText: 'Próximo',
      prevBtnText: 'Anterior',
      progressText: 'Passo {{current}} de {{total}}',
      steps: [
        {
          element: '#tour-levels-header',
          popover: { title: 'Módulos', description: 'Aqui você vê todos os níveis disponíveis e o seu progresso geral.' }
        },
        {
          element: '#tour-levels-progress',
          popover: { title: 'Barra de Progresso', description: 'Acompanhe sua porcentagem de conclusão de todas as missões.' }
        },
        {
          element: '#tour-levels-grid',
          popover: { title: 'Seleção de Níveis', description: 'Clique em um nível desbloqueado para iniciar as missões de SQL.' }
        }
      ],
      onDestroyed: () => {
        localStorage.setItem('sqlquest_tour_levels_done', 'true');
      }
    });

    driverRef.current.drive();
  };

  useEffect(() => {
    const hasSeen = localStorage.getItem('sqlquest_tour_levels_done');
    if (!hasSeen) {
      startTour();
    }
    return () => {
      if (driverRef.current) {
        driverRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 font-sans">
      <div className="max-w-5xl mx-auto">
        <div id="tour-levels-header" className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
          <div>
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-bold text-gray-900">Módulos de Treinamento</h1>
              <button
                onClick={startTour}
                className="text-xs bg-blue-100 text-blue-700 font-semibold px-3 py-1.5 rounded-lg hover:bg-blue-200 transition-colors cursor-pointer"
              >
                ? Ajuda / Tutorial
              </button>
            </div>
            <p className="text-gray-600 mt-2">Selecione um nível para continuar sua jornada.</p>
          </div>

          <div id="tour-levels-progress" className="w-full md:w-72 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex justify-between text-sm font-bold text-gray-700 mb-2">
              <span>Progresso</span>
              <span className="text-blue-600">{Math.round(progressPercentage)}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3 shadow-inner overflow-hidden">
              <div
                className="bg-blue-600 h-3 rounded-full transition-all duration-1000 ease-out relative"
                style={{ width: `${progressPercentage}%` }}
              >
                <div className="absolute top-0 bottom-0 left-0 right-0 bg-white/20"></div>
              </div>
            </div>
          </div>
        </div>

        <div id="tour-levels-grid" className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {levels.map((level) => (
            <LevelCard
              key={level.id}
              level={level}
              progress={progress}
              onSelect={() => onLevelSelect(level)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}