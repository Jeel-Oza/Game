import { useState, useEffect } from "react";
import { useGame } from "../../context/PlayerContext";

export default function MultiplicationPuzzle({ onSuccess }) {
  const { state, dispatch } = useGame();
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState(null); // "correct" or "wrong"
  const [questionCount, setQuestionCount] = useState(1);
  const [score, setScore] = useState(0);

  useEffect(() => {
    generateNewQuestion();
  }, []);

  const generateNewQuestion = () => {
    let a = Math.floor(Math.random() * 10);
    let b = Math.floor(Math.random() * 10);

    setNum1(a);
    setNum2(b);
    setAnswer("");
    setFeedback(null);
  };

  const handleSubmit = () => {
    if (answer === "") return;

    const isCorrect = parseInt(answer) === num1 * num2;

    if (isCorrect) {
      setFeedback("correct");
      setScore((prev) => prev + 10);

      setTimeout(() => {
        if (questionCount < 10) {
          setQuestionCount((prev) => prev + 1);
          generateNewQuestion();
        } else {
          // Mark region completed & unlock next
          dispatch({
            type: "SOLVE_PUZZLE",
            payload: state?.currentRegion || "multiplication-marsh",
          });
          onSuccess && onSuccess();
        }
      }, 1000);
    } else {
      setFeedback("wrong");
    }
  };

  const progressWidth = `${(questionCount - 1) * 10}%`;

  return (
    <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-6 mt-10 space-y-6 text-center">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="text-xl font-bold">Multiplication Level</div>
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
        Solve the multiplication to continue!
      </div>

      {/* Question */}
      <div className="text-2xl font-bold">
        What is {num1} × {num2}?
      </div>

      {/* Input */}
      <input
        className="border-2 border-gray-300 p-2 rounded text-center w-24 text-lg"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        type="number"
        placeholder="Answer"
      />

      {/* Submit Button */}
      <div>
        <button
          onClick={handleSubmit}
          className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded disabled:bg-gray-400"
          disabled={answer === ""}
        >
          Submit
        </button>
      </div>

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
