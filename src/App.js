import React, { Component } from "react";
import Apple from "./components/Apple";
import Snake from "./components/Snake";

const getRandomCoordinates = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random() * (max - min + 1) * min) / 2) * 2;
  let y = Math.floor((Math.random() * (max - min + 1) * min) / 2) * 2;
  return [x, y];
};

const initialState = {
  score: 0,
  highScore: localStorage.getItem("highestScore") || 0,
  gameOver: false,
  interval: undefined,
  direction: "RIGHT",
  speed: 200,
  apple: getRandomCoordinates(),
  snake: [
    [0, 0],
    [2, 0],
  ],
};

class App extends Component {
  state = initialState;

  componentDidMount() {
    const interval = setInterval(this.moveSnake, this.state.speed);
    this.setState({ interval });
    document.onkeydown = this.onKeyDown;
  }

  componentDidUpdate() {
    if (!this.state.gameOver) {
      this.checkOutBorder();
      this.checkCollapsed();
      this.checkEat();
    }
  }

  onKeyDown = (e) => {
    e = e || window.event;
    switch (e.keyCode) {
      case 38:
        this.setState({ direction: "UP" });
        break;
      case 40:
        this.setState({ direction: "DOWN" });
        break;
      case 37:
        this.setState({ direction: "LEFT" });
        break;
      case 39:
        this.setState({ direction: "RIGHT" });
        break;
      case 32:
        if (this.state.gameOver) {
          this.startGame();
        }
        break;
    }
  };

  moveSnake = () => {
    let dots = [...this.state.snake];
    let head = dots[dots.length - 1];
    switch (this.state.direction) {
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
    dots.shift();
    this.setState({
      snake: dots,
    });
  };

  checkCollapsed() {
    let snake = [this.state.snake];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach((dot) => {
      if (head[0] == dot[0] && head[1] == dot[1]) {
        this.gameOver();
      }
    });
  }

  checkOutBorder() {
    let head = this.state.snake[this.state.snake.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      this.gameOver();
    }
  }

  checkEat() {
    let head = this.state.snake[this.state.snake.length - 1];
    let apple = this.state.apple;
    if (head[0] == apple[0] && head[1] == apple[1]) {
      this.setState({
        apple: getRandomCoordinates(),
      });
      this.enlargeSnake();
      this.increaseSpeed();
      this.changeScores();
    }
  }

  enlargeSnake() {
    let newSnake = [...this.state.snake];
    newSnake.unshift([]);
    this.setState({
      snake: newSnake,
    });
  }

  increaseSpeed() {
    if (this.state.speed > 10) {
      this.setState({
        speed: this.state.speed - 10,
      });
    }
  }

  startGame() {
    const { highScore } = this.state;
    this.setState(initialState);
    this.setState({ highScore });
    const interval = setInterval(this.moveSnake, this.state.speed);
    this.setState({ interval });
  }

  gameOver() {
    clearInterval(this.state.interval);
    this.setState({
      gameOver: true,
      interval: undefined,
      direction: "RIGHT",
      speed: 200,
      apple: getRandomCoordinates(),
      snake: [
        [0, 0],
        [2, 0],
      ],
    });
  }

  changeScores() {
    let { score, highScore } = this.state;
    score += 1;
    if (score > highScore) {
      highScore = score;
    }
    this.setState({ score, highScore });
  }

  render() {
    return (
      <div className="app-area">
        <div className="app">
          <div>
            <Snake snakeLocation={this.state.snake} />
            {this.state.gameOver ? (
              <>
                <div className="game-over">GAME OVER</div>
                <div className="space">press SPACE to start</div>
              </>
            ) : null}
            <Apple appleLocation={this.state.apple} />
          </div>
        </div>
        <div className="score">
          <h1>Snake game</h1>
          <h2>
            High score: <p>{this.state.highScore}</p>
          </h2>
          <h2>
            Your score: <p>{this.state.score}</p>
          </h2>
        </div>
      </div>
    );
  }
}

export default App;
