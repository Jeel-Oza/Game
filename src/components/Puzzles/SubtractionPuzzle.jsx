import { useState, useEffect } from "react";
import { useGame } from "../../context/PlayerContext";

export default function SubtractionPuzzle({ onSuccess }) {
  const { gainXp } = useGame();

  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [questionCount, setQuestionCount] = useState(1);
  const [score, setScore] = useState(0);

  useEffect(() => {
    generateNewQuestion();
  }, []);

  const generateNewQuestion = () => {
    const a = Math.floor(Math.random() * 20) + 10; // Range 10-29
    const b = Math.floor(Math.random() * a); // ensures no negative
    setNum1(a);
    setNum2(b);
    setAnswer("");
    setFeedback(null);
  };

  const handleSubmit = () => {
    if (answer === "") return;

    const userAnswer = parseInt(answer);
    const correctAnswer = num1 - num2;
    const isCorrect = userAnswer === correctAnswer;

    if (isCorrect) {
      setFeedback("correct");
      setScore((prev) => prev + 10);
      gainXp(10);

      setTimeout(() => {
        if (questionCount < 10) {
          setQuestionCount((prev) => prev + 1);
          generateNewQuestion();
        } else {
          // Puzzle completed - call the onSuccess callback
          onSuccess();
        }
      }, 1000);
    } else {
      setFeedback("wrong");
      setTimeout(() => {
        setFeedback(null);
      }, 2000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const progressWidth = `${(questionCount - 1) * 10}%`;

  return (
    <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-6 mt-10 space-y-6 text-center">
      <div className="flex justify-between items-center">
        <div className="text-xl font-bold text-purple-700">Subtraction Sanctuary</div>
        <div className="text-sm text-purple-600 font-semibold">Score: {score}</div>
      </div>

      <div className="w-full bg-gray-200 h-3 rounded-full">
        <div
          className="bg-purple-500 h-3 rounded-full transition-all duration-500"
          style={{ width: progressWidth }}
        />
      </div>
      <div className="text-sm text-gray-500">
        {questionCount <= 10 ? `Question ${questionCount} of 10` : "Completed"}
      </div>

      <div className="text-lg font-semibold text-purple-700">
        Solve the subtraction to continue your quest!
      </div>

      <div className="text-3xl font-bold text-gray-800">
        {num1} - {num2} = ?
      </div>

      <input
        className="border-2 border-purple-300 focus:border-purple-500 focus:outline-none p-3 rounded-lg text-center w-32 text-xl"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        onKeyPress={handleKeyPress}
        type="number"
        placeholder="?"
        disabled={feedback === "correct"}
      />

      <div>
        <button
          onClick={handleSubmit}
          className="mt-2 bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg disabled:bg-gray-400 transition-colors duration-200 font-semibold"
          disabled={answer === "" || feedback === "correct"}
        >
          Submit Answer
        </button>
      </div>

      {feedback === "correct" && (
        <div className="text-green-600 font-semibold text-xl animate-pulse">
          ✅ Excellent! Moving to next question...
        </div>
      )}
      {feedback === "wrong" && (
        <div className="text-red-600 font-semibold text-xl">
          ❌ Not quite right! Try again.
        </div>
      )}

      <div className="text-sm text-gray-500 mt-4">
        Complete all 10 questions to master the Subtraction Sanctuary!
      </div>
    </div>
  );
}