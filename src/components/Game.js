import React, { useState, useEffect } from "react";
import GameArea from "./GameArea";
import Settings from "./Settings";
import Statistics from "./Statistics";
import WinnerSound from "../sounds/win.wav";
import BackgroundSound from "../sounds/chael.mp3";
import GameOverSound from "../sounds/gameover.wav";

function Game() {
  const [snakeColor, setSnakeColor] = useState("#309bff");
  const [appleColor, setAppleColor] = useState("#ff4830");
  const [areaColor, setAreaColor] = useState("#fff");
  const [musicIs, setMusicIs] = useState(false);
  const [soundEffects, setSoundEffects] = useState(false);
  const [gameSpeed, setGameSpeed] = useState(200);
  const [gameScore, setGameScore] = useState(false);
  const gameMusic = new Audio(BackgroundSound);
  const winnerSound = new Audio(WinnerSound);
  const gameOverSound = new Audio(GameOverSound);

  useEffect(() => {
    handlePlayMusic();
  }, [musicIs]); // eslint-disable-line react-hooks/exhaustive-deps

  function changeSnakeColor(e) {
    setSnakeColor(e.target.value);
  }
  function changeAppleColor(e) {
    setAppleColor(e.target.value);
  }
  function changeAreaColor(e) {
    setAreaColor(e.target.value);
  }

  function handleMusic() {
    setMusicIs(!musicIs);
    gameMusic.pause();
  }

  function handleEffect() {
    setSoundEffects(!soundEffects);
  }

  function handlePlayMusic() {
    if (musicIs) {
      gameMusic.play();
    }
  }

  function foodSound() {
    if (soundEffects) {
      winnerSound.play();
    }
  }

  function endGameSound() {
    if (soundEffects) {
      gameOverSound.play();
    }
  }

  function handleGameScore() {
    setGameScore(!gameScore);
  }

  function changeGameSpeed(e) {
    let speed = e.target.value;
    if (speed === 0) {
      setGameSpeed(200);
    } else if (speed === 1) {
      setGameSpeed(150);
    } else if (speed === 2) {
      setGameSpeed(100);
    } else {
      setGameSpeed(50);
    }
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col">
          <Settings
            music={musicIs}
            effects={soundEffects}
            snakeColor={snakeColor}
            appleColor={appleColor}
            areaColor={areaColor}
            handleEffect={handleEffect}
            handleMusic={handleMusic}
            changeAreaColor={changeAreaColor}
            changeSnakeColor={changeSnakeColor}
            changeAppleColor={changeAppleColor}
            changeGameSpeed={changeGameSpeed}
          />
        </div>
        <div className="col">
          <GameArea
            foodSound={foodSound}
            handleGameScore={handleGameScore}
            endGameSound={endGameSound}
            snakeColor={snakeColor}
            appleColor={appleColor}
            areaColor={areaColor}
            gameSpeed={gameSpeed}
          />
        </div>
        <div className="col">
          <Statistics gameScore={gameScore} />
        </div>
      </div>
    </div>
  );
}

export default Game;
