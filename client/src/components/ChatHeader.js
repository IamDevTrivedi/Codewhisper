import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MoveLeft } from 'lucide-react';

export default function ChatHeader() {

    const navigate = useNavigate();

    return (
        <header className="sticky top-0 z-10 border-b border-gray-500/40 bg-gradient-to-r from-neutral-900 via-black to-neutral-900 backdrop-blur-md shadow-lg">
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
                {/* Logo and title */}
                <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-sky-600 to-blue-500 text-white font-bold shadow-lg">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 6C6.477 6 2 10.477 2 16c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zM12 4v2m0 16v-2m8-8h-2M6 16H4"
                            />
                        </svg>
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-xl font-bold text-white tracking-wide">
                            Aurora
                        </h1>
                        <span className="text-xs text-white">AI Code Assistant</span>
                    </div>
                    {/* Responsive subtitle */}
                    <h2 className="hidden md:block text-sm font-medium text-white">
                        Your cosmic companion for coding excellence
                    </h2>
                </div>

                {/* Center section with home link */}
                <div className="flex items-center gap-6">
                    <span
                        onClick={() => navigate(-1)}
                        className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r bg-blue-900/30 border border-blue-800 hover:border hover:border-gray-400 transition-all duration-300 text-white text-sm font-medium shadow-md"
                    >
                        <MoveLeft size={16} />
                        Go Back
                    </span>
                </div>
            </div>
        </header>
    );
}