import React from "react";

function Settings({
  snakeColor,
  appleColor,
  areaColor,
  playing,
  effects,
  changeGameSpeed,
  changeAreaColor,
  changeSnakeColor,
  changeAppleColor,
  handleEffect,
  playPause,
}) {
  return (
    <div>
      <label className="input-group mt-3">color of snake</label>
      <input
        className="form-control"
        type="color"
        value={snakeColor}
        onChange={(e) => changeSnakeColor(e)}
      />
      <label className="input-group mt-3">color of apple</label>
      <input
        className="form-control"
        type="color"
        value={appleColor}
        onChange={(e) => changeAppleColor(e)}
      />
      <label className="input-group mt-3">color of game area</label>
      <input
        className="form-control"
        type="color"
        value={areaColor}
        onChange={(e) => changeAreaColor(e)}
      />

      <button
        className={`btn btn-${playing ? "primary" : "secondary"} btn-md mt-3`}
        onClick={() => playPause()}
      >
        music
      </button>

      <button
        className={`btn btn-${effects ? "primary" : "secondary"} btn-md mt-3`}
        onClick={() => handleEffect()}
      >
        sounds
      </button>
      <div className="input-group mt-3">
        <label className="input-group">Choose your speed:</label>
        <select name="Game speed" onChange={(e) => changeGameSpeed(e)}>
          <option value="0">easy</option>
          <option value="1">medium</option>
          <option value="2">hard</option>
          <option value="3">expert</option>
        </select>
      </div>
    </div>
  );
}

export default Settings;
