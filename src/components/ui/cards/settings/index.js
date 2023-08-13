import React from "react";

const timerOptions = [3, 6, 10];
const Settings = ({ gameTimer, setGameTimer }) => {
  return (
    <div className="w-64 h-64 bg-blue-400 border-2 border-white rounded-md z-20 sticky text-white text-center">
      <div>Timer</div>

      <div className="grid grid-cols-3 ">
        {timerOptions.map((time) => (
          <span
            className={`border-r border-y border-white p-2 ${
              time === gameTimer ? "bg-white text-black" : ""
            }`}
            onClick={() => {
              setGameTimer(time);
            }}>
            {time} sec
          </span>
        ))}
        {/* <span className="border-y border-white p-2">3 sec</span>
        <span className="border border-white p-2">6 sec</span>
        <span className="border-y border-white p-2">10 sec</span> */}
      </div>
    </div>
  );
};

export default Settings;
