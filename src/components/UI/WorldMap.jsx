import React, { useState } from 'react';
import { useGame } from '../../context/PlayerContext';
import image from '../../assets/I3.png';
import { Plus, X, Divide, Minus, Shapes, Brain, Lock, Star, Trophy, Home } from 'lucide-react';

function WorldMap({ onZoneSelect }) {
  const { state, dispatch, xp, unlockedRegions, progress } = useGame();
  const [selectedRegion, setSelectedRegion] = useState(null);

  const unlocked = unlockedRegions || [];
  const completed = progress?.completedRegions || [];

  // At the top of WorldMap.jsx (inside the component)
const mainRegionIds = [
  'addition-alley',
  'subtraction-sanctuary',
  'multiplication-marsh',
  'division-domain',
  'geometry-gorge',
  'logic-labyrinth'
];

const allCompleted = mainRegionIds.every((id) => completed.includes(id));


  const regions = [
    {
      id: 'addition-alley',
      name: 'Addition Alley',
      description: 'Master the art of adding numbers together',
      difficulty: 1,
      icon: <Plus className="w-8 h-8" />,
      position: { x: 60, y: 78 },
      color: 'from-green-400 to-green-600',
      unlocked: true, // Always unlocked as first region
      completed: completed.includes('addition-alley'),
      concept: 'Addition & Basic Arithmetic'
    },
    {
      id: 'subtraction-sanctuary',
      name: 'Subtraction Sanctuary',
      description: 'Learn the mysteries of taking numbers away',
      difficulty: 1,
      icon: <Minus className="w-8 h-8" />,
      position: { x: 45, y: 87 },
      color: 'from-blue-400 to-blue-600',
      unlocked: unlocked.includes('subtraction-sanctuary'),
      completed: completed.includes('subtraction-sanctuary'),
      concept: 'Subtraction & Number Relationships'
    },
    {
      id: 'multiplication-marsh',
      name: 'Multiplication Marsh',
      description: 'Discover the power of repeated addition',
      difficulty: 2,
      icon: <X className="w-8 h-8" />,
      position: { x: 36, y: 80 },
      color: 'from-purple-400 to-purple-600',
      unlocked: unlocked.includes('multiplication-marsh'), // 🔑 Controlled by PlayerContext
      completed: completed.includes('multiplication-marsh'),
      concept: 'Times Tables & Patterns'
    },
    {
      id: 'division-domain',
      name: 'Division Domain',
      description: 'Split numbers into equal parts',
      difficulty: 2,
      icon: <Divide className="w-8 h-8" />,
      position: { x: 40, y: 63 },
      color: 'from-red-400 to-red-600',
      unlocked: unlocked.includes('division-domain'),
      completed: completed.includes('division-domain'),
      concept: 'Division & Fair Sharing'
    },
    {
      id: 'geometry-gorge',
      name: 'Geometry Gorge',
      description: 'Explore shapes, angles, and spatial relationships',
      difficulty: 3,
      icon: <Shapes className="w-8 h-8" />,
      position: { x: 50, y: 68 },
      color: 'from-yellow-400 to-orange-600',
      unlocked: unlocked.includes('geometry-gorge'),
      completed: completed.includes('geometry-gorge'),
      concept: 'Shapes & Spatial Reasoning'
    },
    {
      id: 'logic-labyrinth',
      name: 'Logic Labyrinth',
      description: 'Challenge your reasoning and problem-solving skills',
      difficulty: 4,
      icon: <Brain className="w-8 h-8" />,
      position: { x: 57, y: 52 },
      color: 'from-indigo-400 to-purple-600',
      unlocked: unlocked.includes('logic-labyrinth'),
      completed: completed.includes('logic-labyrinth'),
      concept: 'Logic & Critical Thinking'
    },
    {
      id: 'home',
      name: 'Home',
      description: 'Return to your base of knowledge',
      difficulty: 0,
      icon: <Home className="w-8 h-8" />,
      position: { x: 70, y: 40 },
      color: 'from-gray-400 to-gray-600',
      unlocked: allCompleted,
      completed: false,
      concept: 'Mission Complete'
    }
  ];

  const enterRegion = (region) => {
    console.log('🔍 WorldMap: Entering region:', region.id, region.name); // DEBUG
    
    if (!region.unlocked) return;

    if (onZoneSelect) {
      onZoneSelect(region.name);
    }

    dispatch({ type: 'SET_CURRENT_REGION', payload: region.id });
    dispatch({ type: 'SET_GAME_STAGE', payload: 'puzzle' });
    dispatch({
      type: 'UPDATE_GUIDE',
      payload: {
        currentMessage: `Welcome to ${region.name}! Let's start with some ${region.concept.toLowerCase()} challenges.`,
        mood: 'excited',
        isVisible: true
      }
    });
  };

  const getDifficultyStars = (difficulty) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < difficulty ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div
      className="relative w-full h-screen bg-no-repeat bg-contain bg-center overflow-hidden"
      style={{ backgroundImage: `url(${image})` }}
    >
      {/* Title */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-center z-10">
        <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
          Kingdom of Numeria
        </h1>
        <p className="text-white/80 text-lg">Choose your mathematical adventure</p>
      </div>

      {/* Regions */}
      <div className="relative w-full h-full">
        {regions.map((region) => (
          <div
            key={region.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
            style={{ left: region.position.x + '%', top: region.position.y + '%' }}
            onClick={() => region.unlocked ? enterRegion(region) : setSelectedRegion(region)}
          >
            <div className={`
              w-20 h-20 rounded-full flex items-center justify-center
              ${region.unlocked
                ? `bg-gradient-to-br ${region.color} hover:scale-110 shadow-lg hover:shadow-xl`
                : 'bg-gray-600 cursor-not-allowed'}
              ${region.completed ? 'ring-4 ring-yellow-400' : ''}
              transition-all duration-300 relative
            `}>
              {region.unlocked ? region.icon : <Lock className="w-8 h-8 text-gray-400" />}
              {region.completed && (
                <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-1">
                  <Trophy className="w-4 h-4 text-yellow-800" />
                </div>
              )}
              {region.unlocked && !region.completed && (
                <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${region.color} animate-ping opacity-30`}></div>
              )}
            </div>

            <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 text-center">
              <div className="bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full whitespace-nowrap">
                <p className="text-white font-semibold text-sm">{region.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Locked Region Modal */}
      {selectedRegion && !selectedRegion.unlocked && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md mx-4 relative">
            <button
              onClick={() => setSelectedRegion(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedRegion.name}</h2>
              <p className="text-gray-600 mb-4">{selectedRegion.description}</p>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800 text-sm">
                  🔒 This region is locked! Complete previous regions to unlock new adventures.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WorldMap;