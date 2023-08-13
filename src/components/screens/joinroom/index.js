import React, { useState } from "react";
import UsernamePage from "./usernamePage";
import RoomSelectPage from "./roomSelectPage";

const JoinRoom = ({ username, setUsername, roomId, setRoomId, joinRoom }) => {
  const handleJoinRoom = (e) => {
    e.preventDefault();
    if (username === "") {
      alert("Please type a username");
      return null;
    }
    joinRoom();
    // alert("Joining room");
  };

  const [pageState, setPageState] = useState(0); // 0 means username page and 1 means room select
  const props = {
    username,
    setUsername,
    roomId,
    setRoomId,
    handleJoinRoom,
    setPageState,
  };
  //   const apiUrl = process.env.SOCKET_IO_URL;

  return (
    <div className="text-center font-gamer ">
      <div className="w-full border-b-1 border-gray-500 py-4 text-3xl font-bold ">
        Join Room
      </div>
      {/* <div className='text-[#ff4848] font-bold'>{ErrMsg != "" ? (ErrMsg) : ""}</div> */}
      <div className=" flex justify-center items-center  py-4 px-4 ">
        <form action="" onSubmit={handleJoinRoom}>
          {pageState === 0 ? (
            <UsernamePage {...props} />
          ) : pageState === 1 ? (
            <RoomSelectPage {...props} />
          ) : null}
        </form>
      </div>
    </div>
  );
};

export default JoinRoom;
