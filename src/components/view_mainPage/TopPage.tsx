"use client";

import React from "react";
import { TbBackground } from "react-icons/tb";


export default function HugeCircle({target}:{target?:string}){
    const handleClick =()=>{
        if(target){
            const id=document.getElementById(target);
            if(id){
                id.scrollIntoView({behavior:'smooth',block:'center'});
            }
        }
    }
    return(
        <div className="min-h-screen w-full bg-center bg-cover bg-no-repeat flex items-center justify-center" style={{backgroundImage:"url('/images/others/Bg_first.jpg')"}}>
            <div className="min-h-screen w-full absolute inset-0 bg-black/75"></div>
            <div className="relative z-10 text-white text-center">

                <h2 className="text-[clamp(1.75rem,2vw+1rem,2.25rem)] font-[Baskerville]"> x86-History </h2>
            </div>
            <div className="absolute bottom-8 flex flex-col justify-center items-center cursor-pointer">
                    <h4 className="mt-6 text-[clamp(0.40rem,2vw+1rem,0.80rem)] font-[Baskerville]"> scroll down</h4>
                    <div onClick={handleClick} className=" mt-2 text-[clamp(1rem,2vw+1rem,1.5rem)] font-[Baskerville] animate-bounce">
                         ↓
                    </div>
            </div>

            {/*<div className="rounded-full  w-[25rem] h-[25rem] flex items-center justify-center border-1 border-white bg-[#9CA7EF]/25 hover:bg-[#9CA7EF]/75 transition-color duration-300 ease-in-out">
                <div className="rounded-full  w-[20rem] h-[20rem] flex items-center justify-center  border-1 border-white bg-[#4958B7]/30 hover:bg-[#4958B7]/75 transition-color duration-300 ease-in-out">
                    <div onClick={handleClick}  className="rounded-full w-[15rem] h-[15rem] gap-6 flex flex-col items-center justify-center border-1 border-white bg-[#111844] text-center">
                        <h2 className="text-[clamp(1.75rem,2vw+1rem,2.25rem)] font-[Baskerville] text-white"> x86-History </h2>
                    </div>
                </div>
            </div>*/}
           
           
        </div>
    );
}