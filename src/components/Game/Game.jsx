import React, { useEffect } from 'react';
import { useGame } from '../context/PlayerContext';
import GuideCharacter from './UI/GuideCharacter';
import IntroSequence from './UI/IntroSequence';
import WorldMap from './UI/WorldMap';
import PuzzleInterface from './Puzzles/PuzzleInterface';
import BattleScreen from './UI/BattleScreen';

function Game() {
  const { state, dispatch } = useGame();

  useEffect(() => {
    dispatch({
      type: 'UPDATE_GUIDE',
      payload: {
        isVisible: true,
        currentMessage: 'Welcome, brave Math Knight! I am Numeris, your guide through the Kingdom of Numeria.',
        mood: 'happy',
      },
    });
  }, [dispatch]);

  const renderGameStage = () => {
    switch (state.gameStage) {
      case 'intro':
        return <IntroSequence />;
      case 'map':
        return <WorldMap />;
      case 'puzzle':
        return <PuzzleInterface />;
      case 'battle':
        return <BattleScreen />;
      default:
        return <IntroSequence />;
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Main Game Content */}
      <div className="flex-1 relative">{renderGameStage()}</div>

      {/* Guide Character */}
      <GuideCharacter />

      {/* Floating particles for ambiance */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-30"
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: Math.random() * 2 + 's',
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
      `}</style>
    </div>
  );
}

export default Game;
