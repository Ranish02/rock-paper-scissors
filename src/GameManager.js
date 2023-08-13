import React, { useState, useEffect } from "react";

import GameInput from "./components/GameInput";
import ReadyRoom from "./components/ReadyRoom";
//import Users from './components/Users';
import WaitRoom from "./components/WaitRoom";
import UsersList from "./components/Users";

//import GokuEyes from './GokuEyes';
import Winner_screen from "./components/Winner_screen";
import { UAParser } from "ua-parser-js";

const GameManager = ({ socket }) => {
  const [username, setusername] = useState("Player");
  const [room, setroom] = useState("global");

  const [showjoinroom, setshowjoinroom] = useState(true);

  const [messages, setmessages] = useState([]);
  //users section
  const [users, setusers] = useState([]);
  const [userscount, setUsersCount] = useState(0);

  const [currentmessage, setcurrentmessage] = useState("");
  const [time, settime] = useState(0);
  const [isOpponentReady, setOpponentReady] = useState(false);
  const [Ready, setReady] = useState(false);

  const [myinput, setmyinput] = useState(0);
  const [oppinput, setoppinput] = useState(0);
  const [opponentName, setOpponentName] = useState();

  const [roundCounter, setRoundCounter] = useState(0);
  const [canSendInput, setSendInput] = useState(true);
  const [Winner, setWinner] = useState("TBD");

  const [GameState, setGameState] = useState("join_room");
  const [ErrMsg, setErrMsg] = useState("");

  const [wincount, setwincount] = useState([0, 0, 0]);
  // const [usersInput, setUsersInput] = useState([
  //     {
  //         username: username,
  //         input: 1,

  //     }]);
  //console.log("userinput is " + userinput[1]);

  // WIP
  const [usersinput, setusersinput] = useState();
  //will send my input to other client
  const SendmyInput = async () => {
    const messagedata = {
      room: room,
      input: myinput,
    };
    await socket.emit("user_input_send", messagedata);
  };

  const UpdateGameInput = async () => {
    setusersinput([
      { username: username, input: myinput },
      { username: opponentName, input: oppinput },
    ]);
  };

  // trying useeffect
  useEffect(() => {
    console.log("Socket updated");

    //on opponenet ready up this will call
    socket.on("opponent_is_ready", (data) => {
      console.log("Opponent has readied up");
      setOpponentReady(true);
    });
    //updates user list from the room joined
    socket.on("updateUsersList", (users) => {
      console.log(users);
      //console.log("received data" + users);
      setusers(users);
    });
    //will receive msg and call on any message or input in the server
    socket.on("received_message", (data) => {
      if (data.message == "Room already full") {
        console.log("Room is full");
        setGameState("join_room");
        setErrMsg("Room is full try other room id");
        setTimeout(() => {
          setErrMsg("");
        }, 3000);
      }
      console.log("received data" + data);
      setmessages((list) => [...list, data]);
    });

    //after server decides the winner this is send back
    socket.on("winnerdecided", (winner) => {
      console.log(winner);
      setoppinput(0);
      setmyinput(0);
      setGameState("winner_room");
      setWinner(winner);
      setcounter(13);
    });
    //input syncing
    socket.on("incoming_input", (data) => {
      console.log("Opponent Selected" + data);
      setoppinput(data);
      setcounter(10);
      setTimeout(() => {
        if (myinput == 0 && oppinput !== 0) {
          setmyinput(getRndInteger(1, 3));
          console.log("Input gareko abastha");
          SendAllInput();
        }
      }, 10000);

      //(true);
    });
  }, [socket]);

  useEffect(() => {
    console.log("winner decided");
    setRoundCounter((roundCounter) => roundCounter + 1);

    if (Winner != "TBD") {
      if (Winner == username) {
        setwincount([wincount[0] + 1, wincount[1], wincount[2]]);
      } else if (Winner == "Draw") {
        setwincount([wincount[0], wincount[1], wincount[2] + 1]);
      } else {
        setwincount([wincount[0], wincount[1] + 1, wincount[2]]);
      }
      setTimeout(() => {
        setGameState("game_room");
        console.log("game ko thau pugyo");
      }, 3000);
    }
  }, [Winner]);

  useEffect(() => {
    if (myinput !== 0) {
      //UpdateGameInput();
      //send data now

      //add send all input here later
      console.log("can send data");
      SendAllInput();
    }
    // console.log(oppinput);
  }, [oppinput]);

  const sendmessage = async () => {
    //console.log(messages);
    if (currentmessage !== null && username !== null) {
      const messagedata = {
        room: room,
        username: username,
        message: currentmessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      //alert("messagedata" + messagedata.message + messagedata.room + messagedata.author + messagedata.time);
      await socket.emit("send_message", messagedata);
      console.log(messagedata);
      setmessages((list) => [...list, messagedata]);
    }
  };

  function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  const joinroom = () => {
    // if (username === "Player") {
    //     const playernum = getRndInteger(100, 999);
    //     var randomname = "Player" + playernum;
    //     setusername(randomname);
    //     console.log(randomname);
    //     console.log(username);
    // }
    if (username !== "Player" && room !== "") {
      const userdata = {
        username: username,
        room: room,
      };
      socket.emit("join_room", userdata);
      setshowjoinroom(false);
      setGameState("wait_room");
    } else {
      console.log("Random name assignment");
      const playernum = getRndInteger(100, 999);
      var randomname = "Player" + playernum;
      setusername(randomname);
      //console.log(randomname);
      //console.log(username);
      const userdata = {
        username: randomname,
        room: room,
      };
      socket.emit("join_room", userdata);
      setshowjoinroom(false);
      setGameState("wait_room");
    }
  };

  useEffect(() => {
    var count = users.length;
    console.log(count);
    setUsersCount(count);
    setOpponentName(OpponentName());
  }, [users]);

  useEffect(() => {
    if (userscount > 1) {
      setGameState("ready_room");
    } else if (userscount > 0 && userscount < 2) {
      setGameState("wait_room");
    }
  }, [userscount]);
  useEffect(() => {
    if (isOpponentReady && Ready) {
      setGameState("game_room");
    }
  }, [Ready]);
  useEffect(() => {
    if (isOpponentReady && Ready) {
      setGameState("game_room");
    }
  }, [isOpponentReady]);

  const starttimer = (time) => {
    setcounter(time);
  };
  const readyplayer = async () => {
    const msgdata = {
      username: username,
      room: room,
    };
    await socket.emit("readyplayer", msgdata);
    starttimer(12);
    setReady(true);
    console.log("I readied up");
  };
  //timer function // countdown
  const [counter, setcounter] = useState();
  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setcounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  const OpponentName = () => {
    let oppU = users.filter((user) => user !== username);
    //console.log(oppU);
    return oppU[0];
  };

  //users input set this will run and send the data
  // useEffect(() => {
  //     console.log(usersinput);

  // }, [usersinput]);
  const SendAllInput = async () => {
    // UpdateGameInput();
    console.log("sending this input");
    // console.log(usersinput);
    //UpdateGameInput();
    const messagedata = [
      {
        //id: 1,
        username: username,
        input: myinput,
      },
      {
        //id: 2,

        username: opponentName,
        input: oppinput,
      },
      { room: room },
    ];
    console.log("messagedata is");
    console.log(messagedata);
    await socket.emit("decide_winner", messagedata);
  };

  const regame = () => {
    setGameState("game_room");
  };

  const handleGame = (data) => {
    if (myinput === 0) {
      setmyinput(data);
      setcounter(10);
    } else {
      console.log("Already inputted" + myinput);
    }

    //console.log("my input data is " + data);
  };
  useEffect(() => {
    if (myinput !== 0) {
      SendmyInput();
      // console.log("my input is" + myinput);
    }
  }, [myinput]);

  const Debugger = () => {
    console.log("---------------");
    console.log("My username is " + username);
    console.log("My input is " + myinput);
    console.log(" opp nameis " + opponentName);
    console.log(" opp input is " + oppinput);
    console.log(usersinput);
    console.log("---------------");
  };
  // var ua = new UAParser();
  // var result = ua.getResult();
  // // console.log(result);
  // console.log(result.device.type);
  // const devicetype = result.device.type;
  // if (devicetype == "mobile") {
  //     var showGoku = false;
  // }
  // else {
  //     var showGoku = true;
  // }

  //add div for gokueyes
  //     <div className='w-[400px] hidden lg:flex'>
  //     {/* <GokuEyes /> */}

  // </div>
  return (
    <div className="flex justify-between items-center h-[97vh]">
      <div className="lg:flex w-full">
        <div className="flex justify-center w-full h-[600px] mt-24 lg:mt-0 ">
          <div className="gradientoverlay text-center w-[700px] lg:w-[800px] shadow-2xl rounded-lg mt-8">
            {GameState == "join_room" ? (
              //join room page here
              <>
                <div className="border-b-4 border-gray-500 py-4 text-3xl font-bold bg-white">
                  Join Room
                </div>
                <div className="text-[#ff4848] font-bold">
                  {ErrMsg != "" ? ErrMsg : ""}
                </div>
                <div className=" flex justify-center items-center rainbow py-4 px-4 h-[80%] ">
                  <div>
                    <div>
                      <input
                        type="text"
                        className="p-4 rounded-lg"
                        placeholder="User123"
                        onChange={(event) => {
                          setusername(event.target.value);
                        }}
                      />
                    </div>
                    <div className="mt-8">
                      <input
                        type="text"
                        className="p-4 rounded-lg"
                        placeholder="room123"
                        onChange={(event) => {
                          setroom(event.target.value);
                        }}
                      />
                    </div>
                    <div className="bg-[#333] text-white h-[50px] mt-8 text-center cursor-pointer">
                      <button onClick={joinroom} className="w-full h-full">
                        Join
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : GameState == "wait_room" ? (
              //waiting room section here
              <WaitRoom />
            ) : GameState == "ready_room" ? (
              //waiting room section here
              <ReadyRoom
                readyplayer={readyplayer}
                opponentName={opponentName}
              />
            ) : GameState == "game_room" ? (
              <>
                <GameInput
                  handleGame={handleGame}
                  roundCounter={roundCounter}
                  wincount={wincount}
                  myinput={myinput}
                  counter={counter}
                />
              </>
            ) : // <AnotherAnim handleGame={handleGame} />
            //<GameAnim handleGame={handleGame} />
            GameState == "winner_room" ? (
              <>
                <Winner_screen
                  winner={Winner}
                  username={username}
                  opponentname={opponentName}
                  roundCounter={roundCounter}
                  wincount={wincount}
                  regame={regame}
                />
              </>
            ) : (
              // <AnotherAnim handleGame={handleGame} />
              //<GameAnim handleGame={handleGame} />
              ""
            )}
          </div>
        </div>
        <div>
          <div className="h-full">
            {GameState == "winner_room" || GameState == "game_room" ? (
              <UsersList
                users={users}
                room={room}
                username={username}
                myinput={myinput}
                oppinput={oppinput}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameManager;
