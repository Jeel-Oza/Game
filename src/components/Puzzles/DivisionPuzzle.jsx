import { useState, useEffect } from "react";
import { useGame } from "../../context/PlayerContext";

export default function DivisionPuzzle({ onSuccess }) {
  const { state, dispatch } = useGame();
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(1); // avoid division by zero
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [questionCount, setQuestionCount] = useState(1);
  const [score, setScore] = useState(0);

  // constants for XP/Health
  const XP_PER_CORRECT = 10;
  const HEALTH_REWARD_CORRECT = 2;   // heal a little
  const HEALTH_PENALTY_WRONG = -10;  // lose hearts

  useEffect(() => {
    generateNewQuestion();
  }, []);

  const generateNewQuestion = () => {
    let divisor = Math.floor(Math.random() * 9) + 1; // 1–9
    let quotient = Math.floor(Math.random() * 10);   // 0–9
    let dividend = divisor * quotient;

    setNum1(dividend);
    setNum2(divisor);
    setAnswer("");
    setFeedback(null);
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault(); // prevent reload
    if (answer === "") return;

    const isCorrect = parseInt(answer, 10) === num1 / num2;

    if (isCorrect) {
      setFeedback("correct");
      setScore((prev) => prev + 10);

      // ✅ Update XP + health in global state
      dispatch({ type: "GAIN_XP", payload: XP_PER_CORRECT });
      dispatch({ type: "UPDATE_HEALTH", payload: HEALTH_REWARD_CORRECT });

      setTimeout(() => {
        if (questionCount < 10) {
          setQuestionCount((prev) => prev + 1);
          generateNewQuestion();
        } else {
          // Mark puzzle complete
          dispatch({
            type: "SOLVE_PUZZLE",
            payload: state?.currentRegion || "division-domain",
          });
          onSuccess && onSuccess();
        }
      }, 800); // short delay to show feedback
    } else {
      setFeedback("wrong");

      // ❌ wrong → lose health
      dispatch({ type: "UPDATE_HEALTH", payload: HEALTH_PENALTY_WRONG });
    }
  };

  const progressWidth = `${(questionCount - 1) * 10}%`;

  return (
    <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-6 mt-10 space-y-6 text-center">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="text-xl font-bold">Division Level</div>
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
        {questionCount <= 10 ? `${questionCount} of 10 levels completed` : "Completed"}
      </div>

      {/* Prompt */}
      <div className="text-lg font-semibold text-blue-700">
        Solve the division to continue!
      </div>

      {/* Question */}
      <div className="text-2xl font-bold">
        What is {num1} ÷ {num2}?
      </div>

      {/* Input + Submit */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          className="border-2 border-gray-300 p-2 rounded text-center w-24 text-lg"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          type="number"
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

      {/* Footer */}
      <div className="text-sm text-gray-500 mt-4">
        Only correct answers move you forward.
      </div>
    </div>
  );
}
