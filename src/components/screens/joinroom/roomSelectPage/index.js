import React from "react";

const RoomSelectPage = ({
  username,
  setUsername,
  roomId,
  setRoomId,
  handleJoinRoom,
  setPageState,
}) => {
  function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  const handleSetUsername = () => {
    if (username === "Player") {
      const playernum = getRndInteger(100, 999);
      var randomname = "Player" + playernum;
      setUsername(randomname);
    }
    handleJoinRoom();
  };
  return (
    <div data-aos="fade-left">
      <div className="mt-8">
        <input
          type="text"
          autoFocus
          className="p-4 rounded-lg"
          placeholder="room id"
          value={roomId}
          onChange={(event) => {
            setRoomId(event.target.value);
          }}
          maxLength={10}
        />
      </div>
      <div className="w-full">
        <button
          type="submit"
          onClick={handleSetUsername}
          className="bg-[#333] text-white h-[50px] mt-8 text-center cursor-pointer w-full hover:bg-white/60 hover:text-black/90">
          Join Room
        </button>
      </div>
      <div className="w-24 mx-auto text-xs">
        <button
          type="button"
          onClick={() => {
            setPageState(0);
          }}
          className=" h-[30px] mt-8 text-center cursor-pointer w-full bg-white/60 text-black/90">
          Back
        </button>
      </div>
    </div>
  );
};

export default RoomSelectPage;
