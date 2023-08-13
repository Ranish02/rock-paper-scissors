import React, { useState, useEffect } from 'react';

import Rock from '../images/rock.png';
import Scisorrs from '../images/scisorrs.png';
import Paper from '../images/Paper.png';

import Aos from 'aos';
import 'aos/dist/aos.css';

const GameInput = ({ handleGame, roundCounter, wincount, myinput, counter }) => {
    //65ff8b
    useEffect(() => {
        Aos.init({
            // duration: 2500,
            // delay: 400,
        })
    }, []);
    return (
        <div className='w-full'>
            <div>
                <div className='flex justify-evenly mb-20 font-bold bg-[#FFF] py-2 border-t-2 border-gray-300'>

                    <div className='text-[#0f0] border-x px-16'>
                        Win
                        <div>
                            {wincount[0]}
                        </div>
                    </div>
                    <div className='text-[#f00] border-x px-16'>
                        Loss
                        <div>
                            {wincount[1]}
                        </div>
                    </div>
                    <div className='text-[#ef0] border-x px-16'>
                        Draw
                        <div>
                            {wincount[2]}
                        </div>
                    </div>
                </div>
                <div>
                    Round :
                    {roundCounter}
                </div>


                <div className='w-[700px] lg:w-[800px] h-[300px] flex items-center justify-center'>
                    <div className='w-full'>


                        <div className='flex justify-around items-center rounded-xl w-full mt-4  '>
                            <div className="transform transition duration-200 hover:scale-110 shadow-2xl cursor-grab"
                                onClick={() => {
                                    handleGame(1);
                                    console.log("Rock");

                                }}
                            >
                                <div className="transform transition duration-120 hover:scale-110 bg-[#333] text-white" >
                                    <div data-aos="zoom-in" data-aos-delay="50" className='border-4 
                                            border-black transform transition duration-500 hover:scale-110'>
                                        <img src={Rock} alt="" className='w-[100px]' />
                                        Rock
                                        {myinput == 1 ? (<div className='border-b-8 border-[#fd3a3a]'>

                                        </div>) :
                                            ""}

                                    </div>
                                </div>
                            </div>
                            <div className="transform transition duration-200 hover:scale-110  bg-[#333] text-white shadow-2xl cursor-grab"
                                onClick={() => {
                                    handleGame(2);
                                    console.log("Paper")

                                }}
                            >
                                <div data-aos="zoom-in" data-aos-delay="50" className='border-4 
                                            border-black transform transition duration-500 hover:scale-110'>
                                    <img src={Paper} alt="" className='w-[100px]' />
                                    Paper
                                    {myinput == 2 ? (<div className='border-b-8 border-[#fd3a3a]'>

                                    </div>) :
                                        ""}
                                </div>
                            </div>
                            <div className="transform transition duration-200 hover:scale-110 shadow-2xl cursor-grab"

                                onClick={() => {
                                    handleGame(3);
                                    console.log("Scisorrs");

                                }}
                            >
                                <div data-aos="zoom-in" data-aos-delay="150" className='border-4 border-black transform transition duration-500 hover:scale-110 bg-[#333] text-white'>
                                    <img src={Scisorrs} alt="" className='w-[100px]' />
                                    Scisorrs
                                    {myinput == 3 ? (<div className='border-b-8 border-[#fd3a3a]'>

                                    </div>) :
                                        ""}
                                </div>
                            </div>

                        </div>
                        
                        {myinput === 0 ?
                            (<div className='mt-8'>
                                Your Turn...
                                {counter}
                            </div>) :
                            (<div className='mt-8'>
                                Opponent Turn...
                                {counter}
                            </div>)
                        }
                    </div>
                </div>
            </div>

        </div>

    );
}

export default GameInput;
