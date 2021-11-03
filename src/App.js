import React, { useState, useEffect, useMemo } from "react";
import Apple from "./components/Apple";
import Snake from "./components/Snake";

function getRandomCoordinates() {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random() * (max - min + 1) * min) / 2) * 2;
  let y = Math.floor((Math.random() * (max - min + 1) * min) / 2) * 2;
  return [x, y];
}

export default function App() {
  const [highScore, setHighScore] = useState(
    localStorage.getItem("highestScore") || 0
  );
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [inte, setInte] = useState(undefined);
  const [direction, setDirection] = useState("RIGHT");
  const [speed, setSpeed] = useState(200);
  const [apple, setApple] = useState(getRandomCoordinates());
  const [snake, setSnake] = useState([
    [0, 0],
    [2, 0],
  ]);

  // useEffect(() => {
  //   /// componentDidMount
  //   document.onkeydown = onKeyDown;
  //   setInterval(moveSnake, speed);
  //   if (!gameOver) {
  //     checkOutBorder();
  //     checkCollapsed();
  //     checkEat();
  //   }
  // }, []);

  // // componentDidUpdate on snake change
  // useEffect(() => {
  //   // console.log(snake);
  // }, [snake]);

  function onKeyDown(e) {
    e = e || window.event;
    switch (e.keyCode) {
      case 38:
        setDirection("UP");
        break;
      case 40:
        setDirection("DOWN");
        break;
      case 37:
        setDirection("LEFT");
        break;
      case 39:
        setDirection("RIGHT");
        break;
      case 32:
        if (gameOver) {
          startGame();
        }
        break;
    }
  }

  function moveSnake() {
    console.log(snake);
    let dots = [...snake];
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
    }
    dots.push(head);
    console.log(dots);
    dots.shift();
    setSnake(dots);
  }

  function checkCollapsed() {
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach((dot) => {
      if (head[0] == dot[0] && head[1] == dot[1]) {
        onGameOver();
      }
    });
  }

  function checkOutBorder() {
    let head = snake[snake.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      onGameOver();
    }
  }

  function checkEat() {
    let head = snake[snake.length - 1];
    if (head[0] == apple[0] && head[1] == apple[1]) {
      setApple(getRandomCoordinates());
      enlargeSnake();
      increaseSpeed();
      changeScores();
    }
  }

  function enlargeSnake() {
    let newSnake = [...snake];
    newSnake.unshift([]);
    setSnake(newSnake);
  }

  function increaseSpeed() {
    if (speed > 10) {
      setSpeed((speed -= 10));
    }
  }

  function startGame() {
    setInte(undefined);
    setDirection("RIGHT");
    setSpeed(200);
    setApple(getRandomCoordinates());
    setSnake([
      [0, 0],
      [2, 0],
    ]);
    setScore(0);
    setGameOver(false);
    setHighScore(highScore);
    setInterval(moveSnake, speed);
  }

  function onGameOver() {
    clearInterval(inte);
    setGameOver(true);
    setInte(undefined);
    setDirection("RIGHT");
    setSpeed(200);
    setApple(getRandomCoordinates());
    setSnake([
      [0, 0],
      [2, 0],
    ]);
  }

  function changeScores() {
    score += 1;
    if (score > highScore) {
      highScore = score;
    }
    setHighScore(highScore);
    setScore(score);
  }

  return (
    <div className="app-area">
      <div className="app">
        <div>
          <Snake snakeLocation={snake} />
          {gameOver ? (
            <>
              <div className="game-over">GAME OVER</div>
              <div className="space">press SPACE to start</div>
            </>
          ) : null}
          <Apple appleLocation={apple} />
        </div>
      </div>
      <div className="score">
        <h1>Snake game</h1>
        <h2>
          High score: <p>{highScore}</p>
        </h2>
        <h2>
          Your score: <p>{score}</p>
        </h2>
      </div>
    </div>
  );
}
