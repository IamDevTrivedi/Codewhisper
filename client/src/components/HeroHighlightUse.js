import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "./ui/hero-highlight";
import { LogIn, UserPlus } from "lucide-react";
import { IconTerminal2 } from "@tabler/icons-react";
import { Link } from "react-router-dom";

export function HeroHighlightUse() {
    return (
        <HeroHighlight>
            {/* Animated Hero Heading */}
            <motion.h1
                initial={{
                    opacity: 0,
                    y: 20,
                }}
                animate={{
                    opacity: 1,
                    y: [20, -5, 0],
                }}
                transition={{
                    duration: 0.5,
                    ease: [0.4, 0.0, 0.2, 1],
                }}
                className="text-3xl px-4 md:text-5xl lg:text-6xl font-bold text-white max-w-5xl leading-relaxed lg:leading-snug text-center mx-auto"
            >
                Code smarter, collaborate better with{" "}
                <Highlight className="text-white">
                    CodeWhisper.
                </Highlight>
            </motion.h1>

            {/* Subheading */}
            <p className="mt-6 text-lg md:text-xl text-neutral-400 text-center max-w-3xl mx-auto">
                Seamlessly code in multiple languages, collaborate in real-time, and share code links with a single click. Perfect for developers, teams, and dreamers alike.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col items-center justify-center gap-6">
                <div>
                    <Link
                        to="/editor-demo"
                        className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-medium text-lg rounded-lg shadow-lg transition-all duration-200 flex items-center gap-2">
                        <IconTerminal2 className="w-5 h-5" />
                        Try a Demo
                    </Link>
                </div>

                <div className="flex gap-4 items-center">
                    <Link
                        to="/login"
                        className="px-6 py-3 border-2 border-indigo-500 text-indigo-500 hover:bg-indigo-900/20 font-medium text-lg rounded-lg shadow-lg transition-all duration-200 flex items-center gap-2">
                        <LogIn className="w-5 h-5" />
                        Login
                    </Link>
                    <Link
                        to="/signup"
                        className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-medium text-lg rounded-lg shadow-lg transition-all duration-200 flex items-center gap-2">
                        <UserPlus className="w-5 h-5" />
                        Sign Up Now
                    </Link>
                </div>
            </div>
        </HeroHighlight>
    );
}