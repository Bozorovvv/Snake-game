import React from "react";

function Snake({ snakeLocation }) {
  return (
    <div>
      {snakeLocation.map((loc, i) => {
        const style = {
          left: `${loc[0]}%`,
          top: `${loc[1]}%`,
        };
        return <div className="snake-body" key={i} style={style}></div>;
      })}
    </div>
  );
}

export default Snake;
