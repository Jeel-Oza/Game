import { useGame } from "../../context/PlayerContext";

export default function HomeFinal({ onRestart }) {
  const { state } = useGame();
  const { xp, level, health } = state;

  // Convert health into ❤️ hearts
  const maxHearts = 5; // adjust if you want more/larger
  const hearts = Array.from({ length: maxHearts }, (_, i) =>
    i < Math.floor(health / 20) ? "❤️" : "🤍"
  );

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 mt-12 text-center">
      {/* Title */}
      <h1 className="text-3xl font-extrabold text-purple-700 mb-4">
        🏰 Welcome Home, Math Knight!
      </h1>

      {/* Congratulations message */}
      <p className="text-lg text-gray-700 mb-6">
        You have completed your journey through the{" "}
        <span className="font-semibold text-blue-600">Kingdom of Numeria</span>.
        Your bravery and wisdom have restored peace and knowledge to the land!
      </p>

      {/* XP, Level, Health Summary */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg p-6 shadow-md mb-6">
        <div className="text-xl font-semibold">Your Adventure Stats</div>
        <div className="mt-3 text-lg">
          ⭐ XP Earned: <span className="font-bold">{xp}</span>
        </div>
        <div className="mt-1 text-lg">
          🛡 Level Reached: <span className="font-bold">{level}</span>
        </div>
        <div className="mt-1 text-lg">
          ❤️ Health Remaining: <span className="font-bold">{health}</span>
        </div>
        <div className="mt-2 text-2xl">{hearts.join(" ")}</div>
      </div>

      {/* Trophy */}
      <div className="text-6xl mb-4">🏆</div>
      <p className="text-md font-semibold text-gray-600 mb-6">
        You are now a{" "}
        <span className="text-purple-700">Legendary Math Knight</span>!
      </p>

      {/* Restart Button */}
      <button
        onClick={onRestart}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-md transition-all"
      >
        🔄 Play Again
      </button>
    </div>
  );
}
