"use client";

import React from "react";

export default function Panel({image,headText,bodyText,link}:{image?:string,headText?:string,bodyText?:string,link?:string}){
    return(
         <div>
        <div className="md:text-right text-center py-5">
          <h1>{headText}</h1>
        </div>
          <div className="w-full flex flex-col md:flex-row items-center justify-center md:gap-10 gap-5">
      <a href={link||"/"} className="md:hidden w-24 h-24 rounded-full overflow-hidden">
        <img src={image} alt={image} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}/> 
      </a>
      <a href="/panels/NASM"  className="hidden md:block  w-[10vw] h-[10vw] overflow-hidden shadow-sm shrink-0 rounded-full">
           <img src={image} alt={image}   style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}/>
      </a>
      <div className="flex-1 ">
          <p className="md:text-justify text-center break-words text-sm md:text-base" >{bodyText}</p>
      </div> 
    </div>
     <div className="w-full flex md:justify-end items-center justify-center">
                <a href={link||"/"}>
                    <button className="py-2 px-5 mt-5 text-[clamp(0.8rem,2vw,1.1rem)] hover:bg-[#7288AE] rounded cursor-pointer">
                        learn more
                    </button>  
                </a>     
                </div>       
    
      </div>
    );
}