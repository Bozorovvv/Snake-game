import React, { useState, useEffect } from "react";
import Apple from "./gameComponents/Apple";
import GameOver from "./gameComponents/GameOver";
import Pause from "./gameComponents/Pause";
import Snake from "./gameComponents/Snake";

function getRandomCoordinates() {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random() * (max - min + 1) * min) / 2) * 2;
  let y = Math.floor((Math.random() * (max - min + 1) * min) / 2) * 2;
  return [x, y];
}

export default function GameArea({
  snakeColor,
  appleColor,
  areaColor,
  foodSound,
  endGameSound,
  gameSpeed,
  handleGameScore,
}) {
  const [highScore, setHighScore] = useState(
    localStorage.getItem("highestScore") || 0
  );
  const [intervalId, setIntervalId] = useState();
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [direction, setDirection] = useState("RIGHT");
  const [speed, setSpeed] = useState();
  const [pause, setPause] = useState(false);
  const [gameOverBanner, setGameOverBanner] = useState(false);
  const [apple, setApple] = useState(getRandomCoordinates());
  const [snake, setSnake] = useState([
    [0, 0],
    [2, 0],
  ]);

  // // componentDidUpdate on snake change
  useEffect(() => {
    setSpeed(gameSpeed);
    if (!gameOver) {
      checkOutBorder();
      checkCollapsed();
      checkEat();
      document.onkeydown = onKeyDown;
      let interval = setInterval(moveSnake, speed);
      return () => clearInterval(interval);
    }
  }, [direction, gameOver, snake, score, highScore, speed]); // eslint-disable-line react-hooks/exhaustive-deps

  function onKeyDown(e) {
    switch (e.keyCode) {
      case 38:
        if (direction !== "DOWN") {
          setDirection("UP");
        }
        break;
      case 40:
        if (direction !== "UP") {
          setDirection("DOWN");
        }
        break;
      case 37:
        if (direction !== "RIGHT") {
          setDirection("LEFT");
        }
        break;
      case 39:
        if (direction !== "LEFT") {
          setDirection("RIGHT");
        }
        break;
      case 32:
        if (!gameOver) {
          setPause(false);
          pausedGame();
        }
        break;
      case 27:
        setGameOver(true);
        setPause(true);
        break;
      default:
        break;
    }
  }

  function moveSnake() {
    setSnake((prev) => {
      let dots = [...prev];
      let head = dots[dots.length - 1];
      switch (direction) {
        case "RIGHT":
          head = [head[0] + 2, head[1]];
          break;
        case "LEFT":
          head = [head[0] - 2, head[1]];
          break;
        case "DOWN":
          head = [head[0], head[1] + 2];
          break;
        case "UP":
          head = [head[0], head[1] - 2];
          break;
        // no default
      }
      dots.push(head);
      dots.shift();
      return dots;
    });
  }

  function checkOutBorder() {
    let head = snake[snake.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      onGameOver();
    }
  }

  function checkCollapsed() {
    let snakeBody = [...snake];
    let head = snakeBody[snakeBody.length - 1];
    snakeBody.pop();
    snakeBody.forEach((dot) => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
        onGameOver();
      }
    });
  }

  function checkEat() {
    let head = snake[snake.length - 1];
    if (head[0] === apple[0] && head[1] === apple[1]) {
      setApple(getRandomCoordinates());
      enlargeSnake();
      changeScores();
      foodSound();
    }
  }

  function enlargeSnake() {
    let newSnake = [...snake];
    newSnake.unshift([]);
    setSnake(newSnake);
  }

  function pausedGame() {
    setGameOver(false);
    setGameOverBanner(false);
    setHighScore(highScore);
    setIntervalId("");
  }

  function onGameOver() {
    handleGameScore();
    endGameSound();
    handleStorage();
    setGameOverBanner(true);
    setDirection("RIGHT");
    setSnake([
      [0, 0],
      [2, 0],
    ]);
    setGameOver(true);
    setScore(0);
    setHighScore(highScore);
    clearInterval(intervalId);
  }

  function changeScores() {
    let changedScore = score + 1;
    if (changedScore > highScore) {
      setHighScore(changedScore);
    }
    setScore(changedScore);
  }
  function handleStorage() {
    localStorage.setItem("highScore", highScore);
    localStorage.setItem(
      "Scores",
      localStorage.getItem("Scores") + "," + score
    );
  }

  return (
    <div className="app-area">
      <div className="app" style={{ backgroundColor: areaColor }}>
        <div>
          <Snake snakeLocation={snake} snakeColor={snakeColor} />
          {pause && !gameOverBanner ? <Pause /> : null}
          {gameOverBanner && !pause ? <GameOver /> : null}
          <Apple appleLocation={apple} appleColor={appleColor} />
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center mt-4">
        <h4>HighScore:&nbsp;{highScore} </h4>
        <h4>Your score:&nbsp;{score}</h4>
      </div>
    </div>
  );
}
