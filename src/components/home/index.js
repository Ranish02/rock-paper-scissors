import React, { useEffect, useState } from "react";
import GameScreen from "../gamescreen";
import GameFight from "../screens/gameplay";
import UserList from "../ui/usersList";
import ScoreBoard from "../ui/scoreboard";
import JoinRoom from "../screens/joinroom";
import Settings from "../ui/cards/settings";
import { IoMdSettings } from "react-icons/io";
const testdata = {
  score: {
    wins: 0,
    loss: 2,
    draw: 1,
  },
  users: ["Rnaish", "UserGamers2123"],
};
const Homepage = ({ socket }) => {
  const [gameState, setGameState] = useState("join");
  const [gametimer, setGameTimer] = useState(10);

  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    console.log("Socket updated");

    //on opponenet ready up this will call
    socket.on("opponent_is_ready", (data) => {
      console.log("Opponent has readied up");
      // setOpponentReady(true);
    });

    //will receive msg and call on any message or input in the server
    socket.on("received_message", (data) => {
      if (data.message === "Room already full") {
        console.log("Room is full");
        setGameState("join_room");
        // setErrMsg("Room is full try other room id");
        setTimeout(() => {
          // setErrMsg("");
        }, 3000);
      }
      console.log("received data" + data);
      // setmessages((list) => [...list, data]);
    });
    socket.on("game-mode", (data) => {
      if (data === "game-start") {
        handleGameStart();
      }
    });

    socket.on("getAllUsers", (data) => {
      alert("data");
      setDebugData(data);
    });

    //one by one--------------------------------------------------

    //updates user list from the room joined
    socket.on("updateUsersList", (users) => {
      console.log(users);
      setUserList(users);
      // setErrorMsg(users[0]);
    });
  }, [socket]);

  const startTimer = () => {
    setErrorMsg("Game Started ! Starting timer");
    setcounter(10);
  };
  const [counter, setcounter] = useState();
  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setcounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  const [errorMsg, setErrorMsg] = useState("");

  const [debugData, setDebugData] = useState();
  useEffect(() => {
    if (errorMsg !== "") {
      setTimeout(() => {
        setErrorMsg("");
      }, 3000);
    }
  }, [errorMsg]);

  const joinRoom = () => {
    setErrorMsg("Joining Room");
    const userdata = {
      username: username,
      room: roomId,
    };
    socket.emit("join_room", userdata);

    setGameState("waiting");
    // setGameState("gameplay");

    console.log(userdata);
  };
  const [username, setUsername] = useState("Test");
  const [roomId, setRoomId] = useState("global");
  const [userList, setUserList] = useState([]);
  const props = {
    username,
    setUsername,
    roomId,
    setRoomId,
    joinRoom,
  };
  const handleGameStart = () => {
    startTimer();
    setGameState("gameplay");
  };

  const handleTest = () => {
    startTimer();
    // socket.emit("getallusers", (data) => {
    //   setDebugData(data);
    // });
  };
  const handleReady = () => {
    try {
      socket.emit("readyplayer");
    } catch (error) {
      setErrorMsg("Something went Wrong");
    }
  };
  const handleunReady = () => {
    try {
      socket.emit("unreadyplayer");
    } catch (error) {
      setErrorMsg("Something went Wrong");
    }
  };
  const handleLeave = () => {
    try {
      setGameState("join");
      setUserList([]);
      socket.emit("leave");
    } catch (error) {
      setErrorMsg("Something went Wrong");
    }
  };
  const [currentInput, setCurrentInput] = useState(0);
  const handleSendInput = (userinput) => {
    try {
      if (currentInput === 0) {
        console.log(userinput);
        setCurrentInput(userinput);
        setErrorMsg(userinput);
        socket.emit("send_input", userinput);
      }
    } catch (error) {
      setErrorMsg("Something Went Wrong");
    }
  };
  return (
    <main className="h-full transition-colors duration-500">
      <pre>{JSON.stringify(debugData, null, "\t")}</pre>

      <div
        className="h-full mt-auto flex flex-col gap-y-8 md:gap-y-12 border border-black px-0 md:px-6 pt-12 rounded-lg pb-6 min-w-[440px] relative"
        // data-aos="zoom-in"
      >
        {errorMsg !== "" && (
          <div className="text-right text-red-500 absolute top-4 right-4">
            {errorMsg}
          </div>
        )}

        {gameState === "gameplay" && userList[0]?.username === username ? (
          <div className="text-right text-black absolute top-4 right-4">
            <IoMdSettings
              onClick={() => setSettingsOpen(!settingsOpen)}
              size={25}
              className=" ml-auto"
            />

            {settingsOpen && (
              <Settings gameTimer={gametimer} setGameTimer={setGameTimer} />
            )}
          </div>
        ) : (
          ""
        )}

        {gameState === "join" ? (
          <JoinRoom {...props} />
        ) : gameState === "waiting" ? (
          <>
            <button
              className=" bg-green-500 w-full rounded-md text-white p-4"
              onClick={handleReady}>
              Ready
            </button>
            <button
              className=" bg-red-500 w-full rounded-md text-white p-4"
              onClick={handleunReady}>
              UnReady
            </button>
          </>
        ) : gameState === "gameplay" ? (
          <>
            <ScoreBoard score={testdata.score} counter={counter} />
            <GameFight
              handleSendInput={handleSendInput}
              currentInput={currentInput}
            />
          </>
        ) : null}
        {gameState !== "join" ? (
          <UserList
            userList={userList}
            setUserList={setUserList}
            gameState={gameState}
          />
        ) : null}
        {/* <GameScreen /> */}
        <div className="flex justify-end">
          <button
            className="p-2 bg-red-500 w-24 rounded-md text-white"
            onClick={handleLeave}>
            Leave
          </button>
        </div>
        <div className="flex justify-end">
          <button
            className="p-2 bg-purple-500 w-24 rounded-md text-white"
            onClick={handleTest}>
            Test Button
          </button>
        </div>
      </div>
    </main>
  );
};

export default Homepage;
