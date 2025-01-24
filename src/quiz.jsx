import React, { useState, useEffect } from "react";
import playersData from "./players.json"; // Assuming JSON file
import PlayerCard from "./PlayerCard";
import WelcomeModal from "./welcome"; // Import the WelcomeModal component

function Quiz() {
  const [shuffledPlayers, setShuffledPlayers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [userGuess, setUserGuess] = useState("");
  const [isBlurred, setIsBlurred] = useState(true);
  const [feedback, setFeedback] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(true); // State to control the modal visibility
  const [showResults, setShowResults] = useState(false); // State to show results after quiz finishes
  const [playerCount, setPlayerCount] = useState(5); // Default number of players

  // Shuffle players on app load
  useEffect(() => {
    const shuffled = [...playersData].sort(() => Math.random() - 0.5); // Randomly shuffle players
    setShuffledPlayers(shuffled.slice(0, playerCount)); // Use player count to slice the list
  }, [playerCount]);

  const handleGuess = () => {
    const currentPlayer = shuffledPlayers[currentQuestion];
    const correctAnswer = currentPlayer.name.toLowerCase();
    const userAnswer = userGuess.trim().toLowerCase();

    const nameParts = correctAnswer.split(" ");
    const isCorrect =
      nameParts.some((part) => part === userAnswer) ||
      userAnswer === correctAnswer;

    if (isCorrect) {
      setScore(score + 1);
      setFeedback("Correct! 🎉");
    } else {
      setFeedback(`Incorrect! The correct answer is ${currentPlayer.name}.`);
    }

    // Reveal the image and move to the next question after a delay
    setIsBlurred(false);
    setTimeout(() => {
      setFeedback(null);
      setUserGuess("");
      setIsBlurred(true); // Blur the image again for the next question

      if (currentQuestion + 1 < shuffledPlayers.length) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowResults(true); // Show results after the last player
      }
    }, 2000);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal when the user clicks start
  };

  // Handle the change in the number of players to guess
  const handlePlayerCountChange = (e) => {
    setPlayerCount(parseInt(e.target.value, 10)); // Update the number of players
    setCurrentQuestion(0); // Reset the question count
    setScore(0); // Reset the score
    setShowResults(false); // Reset results
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md mx-auto mt-1">
      {isModalOpen && <WelcomeModal onClose={handleCloseModal} />}{" "}
      {/* Show modal if open */}
      {/* Player Count Selection */}
      {!isModalOpen && !showResults && (
        <div className="mb-4">
          <label htmlFor="playerCount" className="text-sm text-gray-500">
            Choose the number of players you want to guess:
          </label>
          <select
            id="playerCount"
            value={playerCount}
            onChange={handlePlayerCountChange}
            className="mt-2 border border-gray-300 rounded-lg p-3 w-full text-sm font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-100 transition duration-300 ease-in-out"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
            <option value={25}>25</option>
            <option value={30}>30</option>
            <option value={35}>35</option>
            <option value={40}>40</option>
            <option value={45}>45</option>
            <option value={50}>50</option>
          </select>
        </div>
      )}
      {showResults ? (
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Quiz Finished!</h2>
          <p className="text-lg font-medium">
            You guessed {score}/{shuffledPlayers.length} players correctly!
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg mt-6 hover:bg-blue-600"
          >
            Play Again
          </button>
        </div>
      ) : shuffledPlayers.length > 0 ? (
        <div className="text-center">
          <div className="mb-4">
            <p className="text-sm text-gray-500">
              Player {currentQuestion + 1} of {shuffledPlayers.length}
            </p>
            <p className="text-lg font-semibold">
              Correct guesses: {score}/{shuffledPlayers.length}
            </p>
          </div>
          <PlayerCard
            player={shuffledPlayers[currentQuestion]}
            isBlurred={isBlurred} // Pass blur state
          />
          <input
            type="text"
            value={userGuess}
            onChange={(e) => setUserGuess(e.target.value)}
            placeholder="Enter player's name"
            className="border bg-white border-gray-300 rounded-lg p-2 w-full mt-4"
          />
          <button
            onClick={handleGuess}
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg mt-4 hover:bg-blue-600"
          >
            Submit
          </button>
          {feedback && (
            <p
              className={`mt-4 text-lg font-medium ${
                feedback.includes("Correct") ? "text-green-500" : "text-red-500"
              }`}
            >
              {feedback}
            </p>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Quiz;
