import React from "react";

const InputCard = ({ input, handleSendInput, currentInput }) => {
  return (
    <div
      className={`mx-4 w-24 h-24 bg-white text-black flex flex-col text-center  transition-transform duration-300 py-1 rounded-lg shadow-sm shadow-black  border-black cursor-pointer ${
        currentInput === input.id
          ? "scale-125 border-4 border-purple-500 text-purple-500"
          : "hover:scale-125 border-2"
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
