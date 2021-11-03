import React from "react";

function Apple({ appleLocation }) {
  const style = {
    left: `${appleLocation[0]}%`,
    top: `${appleLocation[1]}%`,
  };
  return <div className="apple" style={style}></div>;
}

export default Apple;
