import React from "react";
import { BackgroundLines } from "./ui/background-lines";

export function BackgroundLinesUse() {
    return (
        <BackgroundLines className="min-h-screen flex items-center justify-center w-full flex-col px-4 py-12 md:py-24">
            <div className="max-w-6xl w-full space-y-8 md:space-y-12">
                <h1 className="text-center">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500 text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight">
                        CodeWhisper
                    </span>
                    <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-500 to-neutral-300 text-3xl md:text-4xl lg:text-5xl font-semibold tracking-wide">
                        Code Smarter.<span className="mx-2 md:mx-3" />Collaborate Better.
                    </span>
                </h1>

                <div className="space-y-6 md:space-y-8 px-4">
                    <p className="max-w-3xl mx-auto text-base md:text-lg lg:text-xl text-neutral-300 text-center leading-relaxed">
                        Unlock seamless coding in multiple languages with real-time collaboration.
                        Create code rooms, share links with a single click, and code with ease.
                    </p>
                    <p className="max-w-3xl mx-auto text-sm md:text-base lg:text-lg text-cyan-100/80 text-center italic">
                        Designed for developers, by developer.
                    </p>
                </div>
            </div>
        </BackgroundLines>
    );
}