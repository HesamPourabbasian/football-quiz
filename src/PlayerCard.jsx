import React from "react";

function PlayerCard({ player, isBlurred }) {
  return (
    <div>
      <img
        src={player.img}
        alt={player.name}
        className={`w-48 h-48 mx-auto rounded-lg shadow-lg mb-4 ${
          isBlurred ? "blur-sm" : ""
        }`}
        onContextMenu={(e) => e.preventDefault()} // Prevent right-click
        draggable="false" // Prevent dragging
      />
      <h3 className="text-xl font-semibold text-gray-700">Hint:</h3>
      <p className="text-gray-600">{player.hint}</p>
    </div>
  );
}

export default PlayerCard;
