import React from "react";

function Statistics({highScore, score}) {
  return (
    <div className="score">
      <h1>Snake game</h1>
      <h2>
        High score: <p>{highScore}</p>
      </h2>
      <h2>
        Your score: <p>{score}</p>
      </h2>
    </div>
  );
}

export default Statistics;
