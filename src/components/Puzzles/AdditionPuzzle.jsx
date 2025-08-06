import { useState, useEffect } from "react";

export default function AdditionPuzzle({ onSuccess }) {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [questionCount, setQuestionCount] = useState(1);

  useEffect(() => {
    generateNewQuestion();
  }, []);

  const generateNewQuestion = () => {
    setNum1(Math.floor(Math.random() * 10));
    setNum2(Math.floor(Math.random() * 10));
    setAnswer("");
    setFeedback("");
  };

  const handleSubmit = () => {
    const correctAnswer = num1 + num2;
    if (parseInt(answer) === correctAnswer) {
      setFeedback("Correct!");
      if (questionCount < 10) {
        setTimeout(() => {
          setQuestionCount(prev => prev + 1);
          generateNewQuestion();
        }, 1000);
      } else {
        onSuccess(); // Level complete
      }
    } else {
      setFeedback("Wrong! Try again.");
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-lg text-center space-y-4">
      <div className="text-xl font-bold">Question {questionCount} of 10</div>
      <div className="text-lg">What is {num1} + {num2}?</div>
      <input
        className="border p-2 rounded text-center"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        type="number"
      />
      <div className="text-red-600 font-medium">{feedback}</div>
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </div>
  );
}
