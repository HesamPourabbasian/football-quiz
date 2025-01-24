import React from "react";

function WelcomeModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-2xl font-semibold text-gray-800">Welcome to the Quiz!</h2>
        <p className="text-lg text-gray-600 mt-4">
          Test your knowledge by guessing the football players!
        </p>
        <button
          onClick={onClose}
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg mt-6 hover:bg-blue-600"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
}

export default WelcomeModal;
