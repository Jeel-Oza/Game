import React from 'react';
import { useGame } from '../../context/PlayerContext';
import MultiplicationPuzzle from './MultiplicationPuzzle';

function PuzzleInterface() {
  const { state } = useGame();
  
  // Force console logging
  console.log('🔍 PUZZLE INTERFACE LOADED!');
  console.log('🔍 Current Region:', state?.currentRegion);
  console.log('🔍 Game Stage:', state?.gameStage);
  console.log('🔍 Full State:', state);

  // Simple test to see if we reach here
  if (state?.currentRegion === 'multiplication-marsh') {
    console.log('🔍 SHOWING MULTIPLICATION PUZZLE');
    return (
      <div className="min-h-screen bg-purple-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl mb-4">MULTIPLICATION TEST</h1>
          <p>If you see this, routing works!</p>
          <MultiplicationPuzzle onSuccess={() => console.log('Success!')} />
        </div>
      </div>
    );
  }

  console.log('🔍 SHOWING OTHER PUZZLE');
  return (
    <div className="min-h-screen bg-blue-900 text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl mb-4">OTHER PUZZLE TEST</h1>
        <p>Region: {state?.currentRegion}</p>
        <p>If you see this, PuzzleInterface is working!</p>
      </div>
    </div>
  );
}

export default PuzzleInterface;