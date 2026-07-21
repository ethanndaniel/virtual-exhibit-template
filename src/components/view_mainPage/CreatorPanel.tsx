"use client";

import React from "react";
import CreatorsCircle from "./CreatorsCircle";

export default function CreatorPanel(){
    return(
        <div className="xl:p-40 gap-5 w-full flex flex-col items-center justify-center bg-[#111844] overflow-hidden">
            <h1 className="py-10 text-[clamp(1.5rem,2vw+1rem,1.8rem)] font-[Georgia] text-white">CREATORS</h1>
            <div className="h-full w-full gap-5 bg-[#111844] flex flex-wrap items-center justify-center">
                <CreatorsCircle name="Ethan Magbatoc" image="/images/Creators/Ethan.jpeg" />
                <CreatorsCircle name="Catherine Gunita" image="/images/Creators/Cath.jpeg" />
                <CreatorsCircle name="Gabrielle Bactong" image="/images/Creators/Gabe.jpeg" />
                <CreatorsCircle name="Jose Bryan Perez" image="/images/Creators/Jose.jpeg" />
                <CreatorsCircle name="Nyan Jezreel Espineli" image="/images/Creators/Nyan.jpeg" />
            </div>
            <h1 className="py-10 text-[clamp(1.5rem,2vw+1rem,1.8rem)] font-[Georgia] text-white">CSARCH2_S02</h1>
        </div>
        
    );
}