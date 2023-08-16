import React from "react";

const InputCard = ({ input, handleSendInput, currentInput, winStatus }) => {
  const isCurrentSelected = input == input.id;
  return (
    <div
      className={`mx-4 w-24 h-24 ${"Asdad"}   text-black flex flex-col text-center  transition-transform duration-300 py-1 rounded-lg shadow-sm shadow-black  border-black cursor-pointer ${
        currentInput === input.id
          ? "scale-125 border-4 border-purple-500 text-purple-500"
          : "hover:scale-125 border-2"
      } 
      ${
        winStatus === "win"
          ? "bg-green-500"
          : winStatus === "draw"
          ? "bg-yellow-500"
          : winStatus === "loss"
          ? "bg-red-500"
          : "bg-white"
      }`}
      onClick={() => {
        handleSendInput(input.id);
      }}>
      <div className="my-auto ">
        {React.cloneElement(input.icon, {
          size: 35,
          className: "mx-auto",
        })}
      </div>
      <h2>{input?.label}</h2>
    </div>
  );
};

export default InputCard;
