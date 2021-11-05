import React from "react";

function Apple({ appleLocation, appleColor }) {
  const style = {
    left: `${appleLocation[0]}%`,
    top: `${appleLocation[1]}%`,
    backgroundColor: appleColor,
  };
  return <div className="apple" style={style}></div>;
}

export default Apple;
