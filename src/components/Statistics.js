import React, { useEffect, useState } from "react";

function Statistics({ gameScore }) {
  const [data, setData] = useState([]);

  function handleResetStats() {
    localStorage.removeItem("Scores");
    setData([]);
  }

  useEffect(() => {
    let scores = localStorage.getItem("Scores");
    if (scores !== null) {
      scores = scores.split(",");
      if (scores.length > 11) {
        while (scores.length !== 11) {
          scores.shift();
        }
      }
      setData(scores);
      localStorage.setItem("Scores", scores.toString());
    }
  }, [gameScore]);

  return (
    <>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {data.map((el, index) => {
            return el !== "null" && index !== 0 ? (
              <tr key={index}>
                <td>{index}</td>
                <td>{el}</td>
              </tr>
            ) : null;
          })}
        </tbody>
      </table>
      <button
        style={{ width: "100%" }}
        className={"btn btn-danger"}
        onClick={() => handleResetStats()}
      >
        Clear Stats
      </button>
    </>
  );
}

export default Statistics;
