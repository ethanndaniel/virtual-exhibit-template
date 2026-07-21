import React, { useEffect, useState } from 'react';

const images = [
    { image: '/virtual-exhibit-template/images/Timeline1.png', title: "ENIAC" },
    { image: '/virtual-exhibit-template/images/Timeline2.png', title: "UNIVAC" },
    { image: '/virtual-exhibit-template/images/Timeline3.png', title: "IBM 701" },
    { image: '/virtual-exhibit-template/images/Timeline4.png', title: "CDC 6600" },
    { image: '/virtual-exhibit-template/images/Timeline5.png', title: "CISC" },
    { image: '/virtual-exhibit-template/images/Timeline6.png', title: "x86-64 NASM AL" },
];

export default function IntroductionCarousel() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-12 my-auto">
            
            {/* Text Column - Forced text-justify */}
            <div className="flex-1 text-justify px-4">
                <h2 className="text-3xl font-bold font-[Georgia] text-white border-b border-stone-700 pb-3 mb-4 text-left">
                    Introduction
                </h2>
                <p className="text-stone-300 font-[Perpetua] text-lg leading-relaxed text-justify">
                    Assembly Language is a low-level language that allows programmers to communicate directly with computer hardware, offering more speed, space, and capability than most high-level languages. But before x86-64, ARM, MIPS and the more popular assembly languages used today, computer scientists had to communicate directly with hardware using long strings of 0s and 1s. This website aims to give a brief overview on the evolution of the x86-64 instruction set architecture (ISA).
                </p>
            </div>

            {/* Image Column - Centered explicitly via margin-auto */}
            <div className="flex flex-col items-center justify-center mx-auto mt-8 bg-stone-900 border border-stone-800 p-4 rounded-xl shadow-2xl flex-shrink-0">
                <div className="w-[380px] h-[240px] overflow-hidden rounded-lg bg-stone-950 flex items-center justify-center mx-auto">
                    <img 
                        src={images[current].image} 
                        alt={images[current].title} 
                        style={{ width: '380px', height: '240px', objectFit: 'cover' }}
                        className="transition-all duration-500 ease-in-out hover:scale-105 block mx-auto"
                    />
                </div>
                <div className="mt-3 text-center w-full">
                    <span className="text-xs uppercase tracking-widest text-stone-400 font-mono block">Featured Machine</span>
                    <h3 className="text-xl font-bold font-[Georgia] text-white">
                        {images[current].title}
                    </h3>
                </div>
            </div>

        </div>
    );
}