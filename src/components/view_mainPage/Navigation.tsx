"use client";

import { useState } from 'react';
import {FaTimes} from "react-icons/fa";
import {CiMenuFries} from "react-icons/ci";


export default function Navigation(){
    const [click,setClick]=useState(false);
    const [timelineOpen, setTimelineOpen] = useState(false);
    const [simulatorOpen, setSimulatorOpen] = useState(false);
    const handleClick=()=>setClick(!click);
    const content=<>
   <div className="absolute z-50 h-auto w-full left-0 right-0 top-[60px] md:hidden bg-stone-100 backdrop-blur-lg bg-opacity-95 overflow-y-auto shadow-xl">
        <ul className="text-center text-xl flex flex-col gap-4">
            <a href="/additional"><li className=" h-[80px] flex items-center justify-center text-black font-[Baskerville]"> Overview </li></a>
                <div className="group relative flex flex-col items-center justify-center font-[Baskerville]">
                    <button 
                        onClick={() => setTimelineOpen(!timelineOpen)}
                        className="w-full py-4 flex justify-center items-center text-black font-medium "
                    > <span className="h-[80px] px-20 flex items-center justify-center text-black">Timeline</span></button>
                    {timelineOpen&&(
                        <div className=" z-20 w-full flex flex-col text-black rounded-md bg-[#EAECF0]  text-black font-[Baskerville]">
                                <a href="/panels/ENIAC" className="w-full px-15 py-2 text-stone-800 rounded transition-colors">ENIAC</a>
                                <a href="/panels/UNIVAC" className="w-full px-15 py-2 text-stone-800 rounded transition-colors">UNIVAC</a>
                                <a href="/panels/IBM701" className="w-full px-15 py-2 text-stone-800 rounded transition-colors ">IBM 701</a>
                                <a href="/panels/CDC6600" className="w-full px-15 py-2 text-stone-800 rounded transition-colors">CDC 6600</a>
                                <a href="/panels/CISC" className="w-full px-15 py-2 text-stone-800  rounded transition-colors ">CISC</a>
                                <a href="/panels/NASM" className="w-full px-15 py-2 text-stone-800 rounded transition-colors">NASM</a>
                        </div>
                    )}
                        
                    </div>
             <a href="/simulator" className=" h-[80px] flex items-center justify-center text-black font-[Baskerville]">Simulator</a>
        </ul>
     </div>
                    </>
    return(
        <nav className="fixed z-50 top-0 left-0 right-0 bg-white shadow-md">
            <div className=" h-[7vh] w-full md:gap-10 flex items-center">
                        <div className="h-full flex justify-start px-10 ">
                           <a href="/" className="w-[10vw] flex items-center justify-center hover:bg-[#E5DCD0] text-black font-[Baskerville] transition cursor-pointer ">CSARCH2</a>
                        </div>
                        <div className="hidden md:flex w-full h-full text-[clamp(0.8rem,2.5vw,1rem)] flex justify-end">
                            <div className="flex justify-end">
                                {/* Overview */}
                            <a href="/additional" className="w-[10vw] flex items-center justify-center hover:bg-[#E5DCD0] text-black font-[Baskerville] transition cursor-pointer ">Overview</a>
                            {/*Timeline Bar with drop down */}
                                <div className="flex items-center group relative md:hover:bg-[#E5DCD0]"> {/*Add the font at this line to change the font style */}
                                    <button onClick={()=> setTimelineOpen(!timelineOpen)} className="w-[10vw] flex items-center justify-center font-[Baskerville] text-black transition cursor-pointer">Timeline</button>
                                    <div className={`absolute z-20 w-[10vw] top-full left-1/2 -translate-x-1/2 ${timelineOpen?"flex":"hidden"} group-hover:flex flex-col justify-center items-center bg-white shadow-lg rounded-md text-black text-black font-[Baskerville]`}>
                                            <a href="/panels/ENIAC" className="w-full  py-2 text-center text-stone-800 hover:bg-[#E5DCD0] hover:text-black rounded transition-colors ">ENIAC</a>
                                            <a href="/panels/UNIVAC" className="w-full  py-2 text-center text-stone-800 hover:bg-[#E5DCD0] hover:text-black rounded transition-colors ">UNIVAC</a>
                                            <a href="/panels/IBM701" className="w-full  py-2 text-center text-stone-800 hover:bg-[#E5DCD0] hover:text-black rounded transition-colors ">IBM 701</a>
                                            <a href="/panels/CDC6600" className="w-full  py-2 text-center text-stone-800 hover:bg-[#E5DCD0] hover:text-black rounded transition-colors ">CDC 6600</a>
                                            <a href="/panels/CISC" className="w-full  py-2 text-center text-stone-800 hover:bg-[#E5DCD0] hover:text-black rounded transition-colors ">CISC</a>
                                            <a href="/panels/NASM" className="w-full  py-2 text-center text-stone-800 hover:bg-[#E5DCD0] hover:text-black rounded transition-colors ">NASM</a>
                                    </div>
                                </div>
                                <a href="/simulator" className=" w-[10vw] flex items-center justify-center hover:bg-[#E5DCD0] text-black font-[Baskerville] transition cursor-pointer ">Simulator</a>
                            </div>
                            
                            </div>
                        <div>
                   
                        </div>
                <div>
             {click && content}
                </div>
                
                     {<button className="block md:hidden transition-none w-[80vw] flex justify-end p-5" onClick={handleClick}> {click? <FaTimes size={28} className="text-black w-[80vw] flex justify-end p-5"/>:<CiMenuFries size={28} className="text-black"/>}</button>}
            </div>
        </nav>
    )
}