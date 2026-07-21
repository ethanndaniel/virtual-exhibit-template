"use client";

import React from "react";


export default function TimelineCircle({image,text,target}:{image:string,text:string, target?:string}){
    const handleClick =()=>{
        if(target){
            const id=document.getElementById(target);
            if(id){
                id.scrollIntoView({behavior:'smooth',block:'center'});
            }
        }
    }
    return(
        <div onClick={handleClick} className="w-auto h-auto gap-4 p-5 flex flex-col items-center justify-center transform hover:scale-120 transition-transform duration-300 ease-in-out">
           <div className="rounded-full md:w-[10vw] md:h-[22vh] w-[25vw] h-[12vh] border-2 border-black bg-white overflow-hidden shadow-sm shrink-0">
            <img src={image} alt={image} className="rounded-full w-full h-full border-black"/>
            </div>
            <h3 className="md:w-[8vw] w-[20vw] h-[8vh] text-[clamp(1rem,0.5vw+0.8rem,1rem)] font-bold font-[Georgia] text-white p-1 flex items-center justify-center text-center ">{text}</h3>
        </div>
       
    );
}