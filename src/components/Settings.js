import React from "react";

function Settings({
  snakeColor,
  appleColor,
  areaColor,
  music,
  effects,
  changeGameSpeed,
  changeAreaColor,
  changeSnakeColor,
  changeAppleColor,
  handleEffect,
  handleMusic,
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
        className={`btn btn-${music ? "primary" : "secondary"} btn-md mt-3`}
        onClick={() => handleMusic()}
      >
        music
      </button>
      {/* <input type="range" min="0" max="1" step={0.1} id="vol-control" className={"form-control-range"} onChange={e => changeMusicVolume(e)}/> */}

      <button
        className={`btn btn-${effects ? "primary" : "secondary"} btn-md mt-3`}
        onClick={() => handleEffect()}
      >
        sounds
      </button>
      {/* <input type="range" min="0" max="1" step={0.1} id="vol-control" className={"form-control-range"} onChange={e => changeEffectsVolume(e)}/> */}
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
