import React from 'react';
import { useGame } from '../../context/PlayerContext.jsx';
import { Crown, Heart, Star, Trophy } from 'lucide-react';

function Layout({ children }) {
  const { state } = useGame();
  const { player } = state;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Stars Animation */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-20 animate-pulse"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDelay: Math.random() * 3 + 's',
              animationDuration: (Math.random() * 2 + 2) + 's'
            }}
          />
        ))}
      </div>

      {/* Top HUD */}
        <div className="relative z-10 p-4 text-center bg-black/20 backdrop-blur-sm">
        <p className="text-white/50 text-md">
          Wizardly Whiz Quiz
          <p>“Cast spells. Solve problems. Master math.”</p>
        </p>
         </div>
      
      <div className="relative z-10 p-4 flex justify-between items-center bg-black/20 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-purple-800/50 px-4 py-2 rounded-full">
            <Crown className="w-5 h-5 text-yellow-400" />
            <span className="text-white font-bold">{player.name}</span>
            <span className="text-yellow-400">Lv.{player.level}</span>
          </div>
          
          <div className="flex items-center gap-2 bg-red-800/50 px-4 py-2 rounded-full">
            <Heart className="w-5 h-5 text-red-400" />
            <span className="text-white">{player.health}/{player.maxHealth}</span>
          </div>
        </div>
        

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-blue-800/50 px-4 py-2 rounded-full">
            <Star className="w-5 h-5 text-blue-400" />
            <span className="text-white">{player.xp} XP</span>
          </div>
          
          <div className="flex items-center gap-2 bg-green-800/50 px-4 py-2 rounded-full">
            <Trophy className="w-5 h-5 text-green-400" />
            <span className="text-white">{state.progress.totalPuzzlesSolved}</span>
          </div>
        </div>
      </div>
      

      {/* Main Game Area */}
      <div className="relative z-10 flex-1">
        {children}
      </div>

    </div>
  );
}

export default Layout;