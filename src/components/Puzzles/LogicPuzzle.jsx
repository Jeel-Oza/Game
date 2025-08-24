import { useState } from "react";
import { useGame } from "../../context/PlayerContext";

const logicQuestions = [
  { q: "If all cats are animals and some animals are dogs, are all cats dogs? (yes/no)", a: "no" },
  { q: "What comes next in the sequence: 2, 4, 6, 8, ?", a: "10" },
  { q: "Mary is taller than John. John is taller than Sam. Who is the shortest?", a: "Sam" },
  { q: "Which is odd one out: apple, banana, carrot, mango?", a: "carrot" },
  { q: "If it takes 5 machines 5 minutes to make 5 items, how long for 100 machines to make 100 items? (minutes)", a: "5" },
  { q: "A clock shows 3:15. What is the angle between hour and minute hand? (degrees)", a: "7.5" },
  { q: "Which number is missing: 3, 6, 9, 12, ?", a: "15" },
  { q: "If today is Tuesday, what day will it be after 9 days?", a: "Thursday" },
  { q: "Tom is 10, his sister is half his age. When Tom is 30, how old is she?", a: "25" },
  { q: "Find the next term: 1, 1, 2, 3, 5, ?", a: "8" },
];

export default function LogicPuzzle({ onSuccess }) {
  const { state, dispatch } = useGame();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);

  // constants for XP and health
  const XP_PER_CORRECT = 10;
  const HEALTH_REWARD_CORRECT = 2;
  const HEALTH_PENALTY_WRONG = -10;

  const currentQ = logicQuestions[currentIndex];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (answer === "") return;

    const isCorrect = answer.trim().toLowerCase() === currentQ.a.toLowerCase();

    if (isCorrect) {
      setFeedback("correct");
      setScore((prev) => prev + 10);

      // ✅ reward XP + small health boost
      dispatch({ type: "GAIN_XP", payload: XP_PER_CORRECT });
      dispatch({ type: "UPDATE_HEALTH", payload: HEALTH_REWARD_CORRECT });

      setTimeout(() => {
        if (currentIndex < logicQuestions.length - 1) {
          setCurrentIndex((prev) => prev + 1);
          setAnswer("");
          setFeedback(null);
        } else {
          // ✅ Mark puzzle complete globally
          dispatch({
            type: "SOLVE_PUZZLE",
            payload: state?.currentRegion || "logic-lair",
          });
          onSuccess && onSuccess();
        }
      }, 800);
    } else {
      setFeedback("wrong");

      // ❌ Wrong → lose health
      dispatch({ type: "UPDATE_HEALTH", payload: HEALTH_PENALTY_WRONG });
    }
  };

  const progressWidth = `${((currentIndex + 1) / logicQuestions.length) * 100}%`;

  return (
    <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-6 mt-10 space-y-6 text-center">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="text-xl font-bold">Logic Puzzle</div>
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
        {currentIndex + 1} of {logicQuestions.length} levels completed
      </div>

      <div className="text-lg font-semibold text-blue-700">Crack the logic!</div>

      {/* Question */}
      <div className="text-2xl font-bold">{currentQ.q}</div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          className="border-2 border-gray-300 p-2 rounded text-center w-56 text-lg"
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
