import React, { useState } from "react";
import Layout from "./components/Layout/Layout";
import WorldMap from "./components/UI/WorldMap";
import AdditionPuzzle from "./components/Puzzles/AdditionPuzzle";
import SubtractionPuzzle from "./components/Puzzles/SubtractionPuzzle";
import MultiplicationPuzzle from "./components/Puzzles/MultiplicationPuzzle";
import GeometryPuzzle from "./components/Puzzles/GeometryPuzzle";
import LogicPuzzle from "./components/Puzzles/LogicPuzzle";
import DivisionPuzzle from "./components/Puzzles/DivisionPuzzle";
import HomeFinal from "./components/Game/HomeFinal";

import IntroScene from "./components/Game/IntroScene";
import { PlayerProvider, useGame } from "./context/PlayerContext";

function GameApp() {
  const { xp, gainXp } = useGame();
  const [currentZone, setCurrentZone] = useState(null);
  const [started, setStarted] = useState(false);

  const handlePuzzleSuccess = () => {
    gainXp(10);
    setCurrentZone(null);
  };

  return (
    <Layout>
      {!started ? (
        <IntroScene onContinue={() => setStarted(true)} />
      ) : (
        <>

          {!currentZone && <WorldMap onZoneSelect={setCurrentZone} />}

          {currentZone === "Addition Alley" && (
            <AdditionPuzzle onSuccess={handlePuzzleSuccess} />
          )}

          {currentZone === "Subtraction Sanctuary" && (
            <SubtractionPuzzle onSuccess={handlePuzzleSuccess} />
          )}

          {currentZone === "Multiplication Marsh" && (
            <MultiplicationPuzzle onSuccess={handlePuzzleSuccess} />
          )}

          {currentZone === "Division Domain" && (
            <DivisionPuzzle onSuccess={handlePuzzleSuccess} />
          )}

          {currentZone === "Geometry Gorge" && (
            <GeometryPuzzle onSuccess={handlePuzzleSuccess} />
          )}

          {currentZone === "Logic Labyrinth" && (
            <LogicPuzzle onSuccess={handlePuzzleSuccess} />
          )}

          {currentZone === "Home" && (
          <HomeFinal onRestart={() => {
          setStarted(false); // restart game
          setCurrentZone(null);
         }} />
)}

        </>
      )}
    </Layout>
  );
}

function App() {
  return (
    <PlayerProvider>
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <GameApp />
      </div>
    </PlayerProvider>
  );
}

export default App;