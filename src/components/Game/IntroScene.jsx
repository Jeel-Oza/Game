import { useEffect, useState } from "react";
import knightImg from "../../assets/video-unscreen.gif"; // Use your uploaded image
import sampleVideo from '../../assets/2.webm'; // adjust the path

export default function IntroScene({ onContinue }) {
  const [dialog, setDialog] = useState([
    "Welcome, brave Knight of Numbers!",
    "The Kingdom of Math is in danger...",
    "Only your logic and skill can restore balance!",
    "Your first mission lies in Addition Alley!"
  ]);
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    if (index < dialog.length - 1) {
      setIndex(index + 1);
    } else {
      onContinue(); // Start the game
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-2 mt-20">

    {/* <video autoPlay muted loop playsInline className="w-32 object-contain">
      <source src={sampleVideo} type="video/webm" />
        Your browser does not support the video tag.
    </video> */}

      <img src={knightImg} alt="Knight" className="w-32" />
      <div className="bg-white p-4 rounded-xl shadow-lg max-w-md text-center">
        <p>{dialog[index]}</p>
      </div>
      <button
        onClick={handleNext}
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        {index < dialog.length - 1 ? "Next" : "Begin Quest"}
      </button>
    </div>
  );
}
