"use client";
import React, { useContext } from "react";
import { HoveredLink, Menu, MenuItem } from "./ui/navbar-menu";
import { cn } from "../lib/utils";
import { HoverBorderGradient } from "./ui/hover-border-gradient";
import { HomeIcon } from "lucide-react";
import { AppContext } from "../Context/AppContext";


export function Navbar({ className }) {
    const [active, setActive] = React.useState(null);

    const { userData, sendVerificationOtp, logout } = useContext(AppContext);

    return (
        <div
            className={cn(
                "fixed top-5 inset-x-0 max-w-6xl mx-auto z-50 flex justify-center items-center px-1",
                className
            )}
        >
            <Menu
                setActive={setActive}
                className="flex justify-between items-center gap-6 md:gap-8"
            >

                <HoveredLink
                    href="/"
                    className="px-4 py-2 bg-gray-100 text-black rounded-md hover:bg-gray-200 transition-colors text-xs md:text-base"
                >
                    <HomeIcon size={24} />
                </HoveredLink>


                <MenuItem setActive={setActive} active={active} item="Services">
                    <div className="flex flex-col gap-2">
                        <HoveredLink
                            href="/editor-demo"
                            className="px-4 py-2 bg-gray-100 text-black rounded-md hover:bg-gray-200 transition-colors text-xs md:text-base"
                        >
                            Try Now
                        </HoveredLink>
                        <HoveredLink
                            href="/room"
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-xs md:text-base"
                        >
                            Go to Rooms
                        </HoveredLink>
                        <HoveredLink
                            href="/editor"
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-xs md:text-base"
                        >
                            Open Editor
                        </HoveredLink>
                        <HoveredLink
                            href="/aurora"
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-xs md:text-base"
                        >
                            Ask Aurora
                        </HoveredLink>
                    </div>
                </MenuItem>


                {userData ? (
                    userData.isAccountVerified ? (

                        <>
                            <HoveredLink
                                href="/editor"
                                className="text-xs md:text-base text-neutral-700 hover:text-black transition-colors"
                            >
                                Editor
                            </HoveredLink>
                            <div onClick={logout}>
                                <HoveredLink
                                    href="/"
                                    className="text-xs md:text-base text-neutral-700 hover:text-black transition-colors"
                                >
                                    Logout
                                </HoveredLink>
                            </div>
                        </>

                    ) : (

                        <>
                            <div onClick={async () => {
                                await sendVerificationOtp();
                            }}>
                                <HoveredLink
                                    href="/verify-email"
                                    className="text-xs md:text-base text-neutral-700 hover:text-black transition-colors"
                                >
                                    Verify Account
                                </HoveredLink>
                            </div>

                            <div onClick={logout}>
                                <HoveredLink
                                    href="/"
                                    className="text-xs md:text-base text-neutral-700 hover:text-black transition-colors"
                                >
                                    Logout
                                </HoveredLink>
                            </div>

                        </>
                    )
                ) : (

                    <>
                        <HoveredLink
                            href="/login"
                            className="text-xs md:text-base text-neutral-700 hover:text-black transition-colors"
                        >
                            Login
                        </HoveredLink>
                        <HoveredLink
                            href="/signup"
                            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors text-xs md:text-base"
                        >
                            Sign Up
                        </HoveredLink></>

                )}

            </Menu>
        </div>
    );
}

export default Navbar;