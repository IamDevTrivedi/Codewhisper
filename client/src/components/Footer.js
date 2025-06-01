import React from "react";
import { Link } from "react-router-dom";

export function Footer() {
    return (
        <footer className="bg-black text-gray-200 py-8">
            <div className="max-w-7xl border-neutral-800 py-3 border-t mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 px-6">
                {/* Branding */}
                <div className="text-center md:text-left">
                    <Link to="/" className="text-white text-lg font-semibold">CodeWhisper</Link>
                    <p className="text-gray-400 text-sm">
                        © {new Date().getFullYear()} CodeWhisper. All rights reserved.
                    </p>
                </div>

                {/* Links */}
                <div className="flex flex-col md:flex-row items-center gap-6 text-sm">
                    <Link
                        to="/about"
                        className="transition-colors hover:text-sky-400"
                    >
                        About
                    </Link>
                    <Link
                        to="/contact"
                        className="transition-colors hover:text-sky-400"
                    >
                        Contact
                    </Link>
                    <Link
                        to="/privacy"
                        className="transition-colors hover:text-sky-400"
                    >
                        Privacy
                    </Link>
                    <Link
                        to="/login"
                        className="transition-colors hover:text-sky-400"
                    >
                        Login
                    </Link>
                    <Link
                        to="/signup"
                        className="transition-colors hover:text-sky-400"
                    >
                        Sign Up
                    </Link>
                </div>
            </div>
        </footer>
    );
}

export default Footer;