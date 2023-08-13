import React from "react";

const ScoreBoard = ({ score, counter }) => {
  //   const counterr = 9 * 10;
  const w = `${counter * 10}%`;
  return (
    <div className="w-full flex justify-around bg-white/80 p-4 pb-6 border border-black text-center relative">
      <div className="text-green-400">
        <div>WINS</div>
        <span>{score.wins}</span>
      </div>
      <div className="text-red-400">
        <div>LOSS</div>
        <span>{score.loss}</span>
      </div>
      <div className="text-yellow-400">
        <div>DRAW</div>
        <span>{score.draw}</span>
      </div>
      {counter > 0 ? (
        <>
          <span
            className={`w-[${100}%] duration-1000 transition-all absolute bottom-0 left-0 bg-red-500`}
            style={{
              width: w,
              height: "25px",
            }}></span>
          <span className="absolute bottom-0 left-50">{counter}</span>
          {counter < 4 ? (
            <span className="absolute bottom-[-25px] left-50 ">
              HURRY!! Select One
            </span>
          ) : null}
        </>
      ) : null}
    </div>
  );
};

export default ScoreBoard;
