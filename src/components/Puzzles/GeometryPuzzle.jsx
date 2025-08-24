import { useState } from "react";
import { useGame } from "../../context/PlayerContext";

const geometryQuestions = [
  { q: "A triangle has angles 40° and 70°. What is the third angle?", a: "70" },
  { q: "A square has side length 5. What is its area?", a: "25" },
  { q: "A circle has radius 7. What is its diameter?", a: "14" },
  { q: "A rectangle has length 12 and width 4. What is its perimeter?", a: "32" },
  { q: "A cube has side 3. What is its volume?", a: "27" },
  { q: "A right angle is?", a: "90" },
  { q: "How many sides does a hexagon have?", a: "6" },
  { q: "What is the perimeter of a square with side 8?", a: "32" },
  { q: "How many degrees in a straight line?", a: "180" },
  { q: "Area of rectangle 10 × 5?", a: "50" },
];

export default function GeometryPuzzle({ onSuccess }) {
  const { state, dispatch } = useGame();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);

  // ✅ XP/Health system
  const XP_PER_CORRECT = 10;
  const HEALTH_REWARD_CORRECT = 2;
  const HEALTH_PENALTY_WRONG = -10;

  const currentQ = geometryQuestions[currentIndex];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (answer === "") return;

    const isCorrect = answer.trim() === currentQ.a;

    if (isCorrect) {
      setFeedback("correct");
      setScore((prev) => prev + XP_PER_CORRECT);

      // ✅ Reward XP & health
      dispatch({ type: "GAIN_XP", payload: XP_PER_CORRECT });
      dispatch({ type: "UPDATE_HEALTH", payload: HEALTH_REWARD_CORRECT });

      setTimeout(() => {
        if (currentIndex < geometryQuestions.length - 1) {
          setCurrentIndex((prev) => prev + 1);
          setAnswer("");
          setFeedback(null);
        } else {
          // ✅ Puzzle completion
          dispatch({
            type: "SOLVE_PUZZLE",
            payload: state?.currentRegion || "geometry-gorge",
          });
          onSuccess && onSuccess();
        }
      }, 800);
    } else {
      setFeedback("wrong");

      // ❌ Wrong answer → health penalty
      dispatch({ type: "UPDATE_HEALTH", payload: HEALTH_PENALTY_WRONG });
    }
  };

  const progressWidth = `${((currentIndex + 1) / geometryQuestions.length) * 100}%`;

  return (
    <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-6 mt-10 space-y-6 text-center">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="text-xl font-bold">Geometry Puzzle</div>
        <div className="text-sm text-purple-600 font-semibold">Score: {score}</div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 h-3 rounded-full">
        <div
          className="bg-green-500 h-3 rounded-full transition-all duration-500"
          style={{ width: progressWidth }}
        />
      </div>
      <div className="text-sm text-gray-500">
        {currentIndex + 1} of {geometryQuestions.length} levels completed
      </div>

      <div className="text-lg font-semibold text-blue-700">
        Solve the geometry problem!
      </div>

      {/* Question */}
      <div className="text-2xl font-bold">{currentQ.q}</div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          className="border-2 border-gray-300 p-2 rounded text-center w-32 text-lg"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          type="text"
          placeholder="Answer"
        />
        <div>
          <button
            type="submit"
            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded disabled:bg-gray-400"
            disabled={answer === ""}
          >
            Submit
          </button>
        </div>
      </form>

      {/* Feedback */}
      {feedback === "correct" && (
        <div className="text-green-600 font-semibold text-lg">✅ Correct!</div>
      )}
      {feedback === "wrong" && (
        <div className="text-red-600 font-semibold text-lg">❌ Wrong! Try again.</div>
      )}

      <div className="text-sm text-gray-500 mt-4">
        Only correct answers move you forward.
      </div>
    </div>
  );
}
