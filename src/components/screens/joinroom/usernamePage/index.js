import React from "react";

const UsernamePage = ({
  username,
  setUsername,
  roomId,
  setRoomId,
  handleJoinRoom,
  setPageState,
}) => {
  return (
    <div data-aos="fade-left">
      <div>
        <input
          type="text"
          className="p-4 rounded-lg"
          placeholder="Enter username"
          value={username}
          autoFocus
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          maxLength={10}
        />
      </div>

      <div className="w-full">
        <button
          onClick={() => {
            if (username !== "") {
              setPageState(1);
            }
          }}
          className="bg-[#333] text-white h-[50px] mt-8 text-center cursor-pointer w-full hover:bg-white/60 hover:text-black/90">
          Enter
        </button>
      </div>
    </div>
  );
};

export default UsernamePage;
