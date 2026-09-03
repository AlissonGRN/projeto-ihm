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
          popover: { title: 'Módulos', description: 'Aqui você vê todos os setores disponíveis e o seu progresso geral.' }
        },
        {
          element: '#tour-levels-progress',
          popover: { title: 'Barra de Progresso', description: 'Acompanhe sua porcentagem de conclusão de todas as missões.' }
        },
        {
          element: '#tour-levels-grid',
          popover: { title: 'Seleção de Setor', description: 'Clique em um setor desbloqueado para iniciar as invasões SQL.' }
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
    <div className="min-h-screen bg-black py-12 px-4 font-mono text-gray-300 selection:bg-emerald-500 selection:text-black">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={onBackToHome}
            className="text-gray-500 hover:text-emerald-400 transition-colors text-xs cursor-pointer flex items-center gap-2"
          >
            <span>◄</span> Desconectar
          </button>
          <span className="text-emerald-500/50 text-xs tracking-widest">MAINFRAME_SECTOR_SELECT</span>
        </div>

        <div id="tour-levels-header" className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6 border-b border-gray-900 pb-6">
          <div>
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-black text-emerald-400 tracking-wider uppercase">Setores de Invasão</h1>
              <button
                onClick={startTour}
                className="text-xs bg-gray-900 border border-gray-700 text-emerald-500 font-semibold px-3 py-1.5 rounded-sm hover:bg-gray-800 hover:border-emerald-500 transition-all cursor-pointer"
              >
                [ MANUAL ]
              </button>
            </div>
            <p className="text-gray-500 text-xs mt-2 uppercase tracking-widest">Selecione um nó de dados para prosseguir.</p>
          </div>

          <div id="tour-levels-progress" className="w-full md:w-72 bg-gray-950 p-4 border border-gray-800 rounded-sm shadow-[0_0_15px_rgba(0,0,0,0.5)]">
            <div className="flex justify-between text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">
              <span>Progresso Total</span>
              <span className="text-emerald-400">{Math.round(progressPercentage)}%</span>
            </div>
            <div className="w-full bg-black border border-gray-800 h-2 rounded-sm overflow-hidden">
              <div
                className="bg-emerald-500 h-full shadow-[0_0_8px_rgba(16,185,129,0.8)] transition-all duration-1000 ease-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
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