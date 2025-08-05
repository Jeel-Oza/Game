import React, { useState } from "react";
import Layout from "./components/Layout/Layout";
import WorldMap from "./components/UI/WorldMap";
import AdditionPuzzle from "./components/Puzzles/AdditionPuzzle";
import IntroScene from "./components/Game/IntroScene";
import { PlayerProvider, useGame } from "./context/PlayerContext";

function GameApp() {
  const { xp, gainXp } = useGame();
  const [currentZone, setCurrentZone] = useState(null);
  const [started, setStarted] = useState(false);

  return (
    <Layout>
      {!started ? (
        <IntroScene onContinue={() => setStarted(true)} />
      ) : (
        <>
          <div className="text-center text-xl mb-4 text-white">
            Welcome, Math Knight! (XP: {xp})
          </div>

          {!currentZone && <WorldMap onZoneSelect={setCurrentZone} />}

          {currentZone === "Addition Alley" && (
            <AdditionPuzzle
              onSuccess={() => {
                gainXp(10);
                setCurrentZone(null);
              }}
            />
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
