import React, { Fragment } from "react";
import { inputsIcons } from "../../../data/icons";
import InputCard from "../../ui/cards/inputCard";

const GameFight = ({ handleSendInput, input, currentInput, winStatus }) => {
  return (
    <div className="flex justify-around w-full">
      {inputsIcons.map((input) => (
        <Fragment key={input.id}>
          <InputCard
            winStatus={winStatus}
            input={input}
            handleSendInput={handleSendInput}
            currentInput={currentInput}
          />
        </Fragment>
      ))}
    </div>
  );
};

export default GameFight;
