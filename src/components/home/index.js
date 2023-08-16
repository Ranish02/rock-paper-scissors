import React, { useEffect, useState } from "react";
import GameScreen from "../gamescreen";
import GameFight from "../screens/gameplay";
import UserList from "../ui/usersList";
import ScoreBoard from "../ui/scoreboard";
import JoinRoom from "../screens/joinroom";
import Settings from "../ui/cards/settings";
import { IoMdSettings } from "react-icons/io";

const Homepage = ({ socket }) => {
  const [gameState, setGameState] = useState("join"); // join || waiting || gameplay
  const [gametimer, setGameTimer] = useState(10);

  const [settingsOpen, setSettingsOpen] = useState(false);

  const [username, setUsername] = useState("Player");
  const [roomId, setRoomId] = useState("global");
  const [userList, setUserList] = useState([]);
  const [winStatus, setWinStatus] = useState("");
  const [ready, setReady] = useState(false);

  const [Round, setRound] = useState(0);
  const [myPlayerNumber, setMyPlayerNumber] = useState(1);
  const [counter, setcounter] = useState();

  useEffect(() => {
    setTimeout(() => {
      setWinStatus("");
    }, 1000);
  }, [winStatus]);

  const [score, setScore] = useState({
    wins: 0,
    loss: 0,
    draw: 0,
  });

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
      // alert(data[1]);
    });

    socket.on("getAllUsers", (data) => {
      alert("data");
      // setDebugData(data);
    });
    socket.on("winnerDecided", (data) => {
      setRound(Round + 1);
      setErrorMsg(data.winner + ":" + myPlayerNumber);
      if (data.winner === 0) {
        // setErrorMsg();
        setWinStatus("draw");
        setScore({ ...score, draw: score.draw + 1 });
      } else {
        if (myPlayerNumber === data.winner) {
          setWinStatus("win");
          setScore({ ...score, wins: score.wins + 1 });
          // todo
        } else {
          setWinStatus("loss");
          setScore({ ...score, loss: score.loss + 1 });
        }

        // setErrorMsg("something went wrong");
      }

      // setDebugData(data);
    });

    socket.on("updatedGameStatus", (data) => {
      if (data.cmd === "start-round") {
        setTimeout(() => {
          startTimer(data.time);
        }, 1000);
        setCurrentInput(0);
      }
    });
    socket.on("opponentDisconnected", (data) => {
      setGameState("join");
      resetPoints();
    });

    //one by one--------------------------------------------------

    //updates user list from the room joined
    socket.on("updateUsersList", (users) => {
      console.log(users);
      setUserList(users);

      // setDebugData(users);
      // userList.map(())
      users.map((user) => {
        if (user.username === username) {
          setMyPlayerNumber(user.playerNumber);
        }
        return null;
      });
      // console.log("test  my user name " + username);
      // if (users[0].username == username) {
      //   alert("i am first player");
      // }
      // setErrorMsg(users[0]);
    });
  }, [socket, username, score, myPlayerNumber]);

  const startTimer = (time) => {
    // setErrorMsg("Game Started ! Starting timer");
    setcounter(time || 10);
  };

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setcounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  const [errorMsg, setErrorMsg] = useState("");

  const [debugData, setDebugData] = useState();

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
  const resetPoints = () => {
    setRound(0);
    setScore({
      wins: 0,
      loss: 0,
      draw: 0,
    });
  };

  const props = {
    username,
    setUsername,
    roomId,
    setRoomId,
    joinRoom,
  };
  const handleGameStart = () => {
    if (gameState !== "gameplay") {
      setGameState("gameplay");
    }
    startTimer();
  };

  const handleTest = () => {
    startTimer();
    // socket.emit("getallusers", (data) => {
    //   setDebugData(data);
    // });
  };
  const toggleReady = () => {
    try {
      if (!ready) {
        setReady(!ready);
        socket.emit("readyplayer");
      } else {
        setReady(!ready);
        socket.emit("unreadyplayer");
      }
    } catch (error) {
      setErrorMsg("Something went Wrong");
    }
  };

  const handleLeave = () => {
    try {
      setGameState("join");
      setUserList([]);
      socket.emit("leave");
      resetPoints();
    } catch (error) {
      setErrorMsg("Something went Wrong");
    }
  };
  const [currentInput, setCurrentInput] = useState(0);
  const handleSendInput = (userinput) => {
    try {
      // if (currentInput === 0) {
      console.log(userinput);
      setCurrentInput(userinput);
      // setErrorMsg(userinput);
      socket.emit("giveInput", userinput);
      // }
    } catch (error) {
      setErrorMsg("Something Went Wrong");
    }
  };
  return (
    <main className="h-full transition-colors duration-500">
      <pre>{JSON.stringify(debugData, null, "\t")}</pre>

      <div
        className="h-full mt-auto flex flex-col gap-y-8 md:gap-y-12 border border-black px-0 md:px-6 pt-12 rounded-lg pb-6 min-w-[440px] relative bg-[#42ffa7]"
        // data-aos="zoom-in"
      >
        {/* {errorMsg !== "" && (
          <div className="text-right text-red-500 absolute top-4 left-4">
            {errorMsg}
          </div>
        )} */}

        {gameState !== "gameplay" &&
        userList[0]?.username === username &&
        false ? (
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
              className={`${
                ready ? "bg-green-500" : "bg-red-500"
              }  w-full rounded-md text-white p-4`}
              onClick={toggleReady}
              autoFocus>
              {ready ? "Ready" : "Not Ready"}
            </button>
          </>
        ) : gameState === "gameplay" ? (
          <>
            <ScoreBoard
              score={score}
              counter={counter}
              currentInput={currentInput}
            />
            <GameFight
              winStatus={winStatus}
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
            username={username}
            myPlayerNumber={myPlayerNumber}
          />
        ) : null}

        {/* <GameScreen /> */}
        {gameState === "waiting" || gameState === "gameplay" ? (
          <div className="flex justify-end">
            <button
              className="p-2 bg-red-500 w-24 rounded-md text-white"
              onClick={handleLeave}>
              Leave
            </button>
          </div>
        ) : null}
        {/* <div className="flex justify-end">
          <button
            className="p-2 bg-purple-500 w-24 rounded-md text-white"
            onClick={handleTest}>
            Test Button
          </button>
        </div> */}
      </div>
    </main>
  );
};

export default Homepage;
