import React from "react";
import GokuEyes from "./GokuEyes";
import chatbubble from "./images/bubblechat.png";
import { useState, useEffect } from "react";

import io from "socket.io-client";
// import Chat from "./Chat";
// import GameManager from "./GameManager";
import Homepage from "./components/home";
import Footer from "./components/shared-elements/footer";

import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
// import AnotherAnim from "./components/AnotherAnim";

// import Game from "./Game";

import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  const apiUrl = process.env.SOCKET_IO_URL;
  const socket = io.connect("https://rps-server-2-0.onrender.com/");
  // const socket = io.connect("http://localhost:3002/");
  useEffect(() => {
    AOS.init();
  }, []);

  // const [isivisible, setIsVisible] = useState(false);

  return (
    <BrowserRouter basename="/rock-paper-scissors">
      <Routes>
        <Route
          exact
          path="/"
          element={
            <>
              <main className=" min-h-screen flex flex-col bg-gray-200">
                <div className="flex-1 flex justify-center container mx-auto items-center  ">
                  <Homepage socket={socket} />
                  {apiUrl}
                </div>

                <Footer />
              </main>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

// <div>
//       {/* <div className='bg-[#adadad] text-white p-2 text-center'>
//         <button onClick={() => {
//           setIsVisible(v => !v);
//         }}>
//           Mount
//         </button>
//       </div> */}
//       <div className="">
//         {/* <Chat socket={socket} /> */}
//         {/* <GokuEyes /> */}
//         {/* {isivisible ? "" : ""} */}
//         <GameManager socket={socket} />

//         {/* <GameManager socket={socket} /> */}
//       </div>
//       <div className="text-right mt-32 lg:mt-0">
//         by
//         <a href="https://ranishkunwar.com.np/"> Ranish Kunwar</a>
//       </div>
//     </div>

export default App;
