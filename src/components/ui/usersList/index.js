import React, { Fragment } from "react";
import { FaCrown } from "react-icons/fa";

const testUsers = [
  //   {
  //     name: "Ranish",
  //     ready: true,
  //     wins: 0,
  //     loss: 1,
  //     draw: 2,
  //   },
  //   {
  //     name: "Kunwar",
  //     ready: true,
  //     wins: 0,
  //     loss: 1,
  //     draw: 2,
  //   },
  {
    username: "Ranish",
    ready: true,
    wins: 0,
    loss: 0,
    draw: 0,
    playerNumber: 2,
  },
  {
    username: "Kunwar",
    ready: false,
    wins: 0,
    loss: 0,
    draw: 0,
    playerNumber: 2,
  },
];

const UserList = ({ userList, setUserList, gameState, myPlayerNumber }) => {
  //   setUserList(testUsers);
  //   console.log(userList);
  return (
    <div
      className={`h-full bg- rounded-md text-white p-4 transition-colors duration-500 ease-in-out ${
        gameState === "gameplay"
          ? "bg-black"
          : userList[0]?.ready && userList[1]?.ready
          ? "bg-green-500"
          : "bg-black"
      }`}>
      <ul className=" p-4 text-xl text-center flex flex-col gap-y-2 font-gamer ">
        {userList.length !== 0 ? (
          <Fragment>
            <div className={`border border-white py-2 relative`}>
              <span
                className={`bg-green-500 absolute top-0 left-0 h-full z-0 transition-all duration-500 ease-in-out ${
                  gameState === "gameplay"
                    ? "bg-black"
                    : userList[0]?.ready
                    ? "w-full"
                    : "w-0"
                }`}></span>
              <span className="z-20 sticky flex justify-center gap-2">
                {userList[0]?.username}{" "}
                {myPlayerNumber === 1 ? <FaCrown /> : null}
                {/* {userList[0]?.username === username ? <FaCrown /> : null} */}
              </span>
            </div>

            <div className="text-4xl font-bold no-underline ">vs</div>

            <div className="relative border border-white py-2">
              <span
                className={`bg-green-500 absolute top-0 left-0 h-full z-0 transition-all duration-500 ease-in-out ${
                  gameState === "gameplay"
                    ? "bg-black"
                    : userList[1]?.ready
                    ? "w-full"
                    : "w-0"
                }`}></span>
              <span className="z-20 sticky flex justify-center gap-2">
                {userList.length >= 2 ? userList[1]?.username : "WAITING"}

                {myPlayerNumber === 2 ? <FaCrown /> : null}
                {/* {userList[1]?.username === username ? <FaCrown /> : null} */}
              </span>
            </div>
          </Fragment>
        ) : (
          <></>
        )}
      </ul>
    </div>
  );
};

export default UserList;
