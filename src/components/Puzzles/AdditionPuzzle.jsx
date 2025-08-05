import { useState, useEffect } from "react";

export default function AdditionPuzzle({ onSuccess }) {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    setNum1(Math.floor(Math.random() * 10));
    setNum2(Math.floor(Math.random() * 10));
  }, []);

  const isCorrect = parseInt(answer) === num1 + num2;

  return (
    <div className="bg-white p-4 rounded shadow-lg text-center space-y-4">
      <div className="text-xl">What is {num1} + {num2}?</div>
      <input
        className="border p-2 rounded"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        type="number"
      />
      {isCorrect && (
        <button onClick={onSuccess} className="bg-green-500 text-white px-4 py-2 rounded">
          Correct! Continue
        </button>
      )}
    </div>
  );
}
