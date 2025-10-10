import React, { useEffect, useRef, useState } from "react";

import { FiMenu } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { FcHome } from "react-icons/fc";
import { FcAbout } from "react-icons/fc";
import { FcBusiness } from "react-icons/fc";
import { FcAnswers } from "react-icons/fc";
import { FcPhone } from "react-icons/fc";

import { Link } from "react-router-dom";

const Navbar = () => {
    const [navbar, setNavbar] = useState(false);
    const isNavbar = () => {
        setNavbar(!navbar);
    };

    // Close the menu when clicking outside
    const menuRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setNavbar(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div>
            {/* Desktop Navbar */}
            <nav className="hidden lg:block fixed top-0 w-full z-40 py-6 bg-gradient-to-r from-indigo-800 to-blue-900 dark:from-gray-950 dark:to-blue-950 backdrop-blur-sm shadow-lg border-b border-indigo-700 dark:border-gray-800">
                <div className="container mx-auto flex justify-between items-center px-4">
                    <div className="flex items-center gap-10 shrink ">
                        <div className="flex items-center min-w-[200px]">
                            <Link to="/">
                                <h1 className="text-2xl md:text-3xl font-bold py-2 px-4 text-white dark:text-gray-100 hover:text-blue-300 dark:hover:text-blue-400 duration-300">
                                    OLA
                                </h1>
                            </Link>
                        </div>
                        <div>
                            <ul className="flex shrink-0  items-center  mt-3 md:mt-0 ">
                                <Link to="/">
                                    <li className="cursor-pointer text-gray-200 dark:text-gray-100 hover:text-blue-300 dark:hover:text-blue-400 py-2 px-4 rounded hover:bg-blue-800/50 dark:hover:bg-blue-900/50 duration-300">
                                        Home
                                    </li>
                                </Link>
                                <Link to="/grants/list">
                                    <li className="cursor-pointer text-gray-200 dark:text-gray-100 hover:text-blue-300 dark:hover:text-blue-400 py-2 px-4 rounded hover:bg-blue-800/50 dark:hover:bg-blue-900/50 duration-300 whitespace-nowrap">
                                        Feedbacks
                                    </li>
                                </Link>
                                <Link to="/about">
                                    <li className="cursor-pointer text-gray-200 dark:text-gray-100 hover:text-blue-300 dark:hover:text-blue-400 py-2 px-4 rounded hover:bg-blue-800/50 dark:hover:bg-blue-900/50 duration-300 whitespace-nowrap">
                                        About Us
                                    </li>
                                </Link>
                                <Link to="/learn-more">
                                    <li className="cursor-pointer text-gray-200 dark:text-gray-100 hover:text-blue-300 dark:hover:text-blue-400 py-2 px-4 rounded hover:bg-blue-800/50 dark:hover:bg-blue-900/50 duration-300 whitespace-nowrap">
                                        Learn More
                                    </li>
                                </Link>
                                <Link to="/contact">
                                    <li className="cursor-pointer text-gray-200 dark:text-gray-100 hover:text-blue-300 dark:hover:text-blue-400 py-2 px-4 rounded hover:bg-blue-800/50 dark:hover:bg-blue-900/50 duration-300 whitespace-nowrap">
                                        Contact US
                                    </li>
                                </Link>
                            </ul>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-3 mt-3 md:mt-0">
                        <Link to="/login">
                            <button className="text-white dark:text-gray-100 text-base -lg py-2 px-4 ring-2 ring-blue-400 dark:ring-blue-700 hover:scale-95 duration-400 rounded-2xl shadow-lg focus:outline-none active:bg-blue-700 dark:active:bg-blue-900">
                                Login
                            </button>
                        </Link>
                        <Link to="/register">
                            <button className="text-blue-900 dark:text-blue-300 text-base py-2 px-4 ring-2 ring-blue-400 dark:ring-blue-700 bg-gray-300 dark:bg-gray-800 hover:scale-95 duration-400 rounded-2xl shadow-lg focus:outline-none active:bg-gray-400 dark:active:bg-gray-900">
                                Sign Up
                            </button>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Mobile Nav */}
            <nav className="fixed top-0 w-full flex text-white dark:text-gray-100 justify-between items-center lg:hidden px-5 py-4 z-80 bg-gradient-to-r from-indigo-800 to-blue-900 dark:from-gray-950 dark:to-blue-950 backdrop-blur-sm shadow-md border-b border-indigo-700 dark:border-gray-800">
                <div>
                    <Link to="/">
                        <h2 className="text-3xl font-bold">OLA</h2>
                    </Link>
                </div>
                <div
                    onClick={isNavbar}
                    className="border-2 border-blue-400 dark:border-blue-700 text-blue-400 dark:text-blue-300 p-2 rounded-md cursor-pointer text-4xl"
                >
                    {!navbar ? <FiMenu /> : <AiOutlineClose />}
                </div>
            </nav>

            <div
                ref={menuRef}
                onClick={isNavbar}
                className={
                    navbar
                        ? "fixed z-80 top-20 w-full min-h-screen py-6 ease-in-out duration-1000 bg-gradient-to-r from-indigo-800 to-blue-900/90 dark:from-gray-950 dark:to-blue-950/90"
                        : "fixed right-[-100%]"
                }
            >
                <ul className="flex flex-col gap-2 text-gray-200 dark:text-gray-100 px-4">
                    <Link to="/">
                        <li className="text-xl px-3 py-5 cursor-pointer border-b border-gray-200 dark:border-gray-700 hover:text-blue-300 dark:hover:text-blue-400 duration-[0.5s] flex gap-6 items-center active:text-blue-400 dark:active:text-blue-400">
                            <FcHome size={24} /> Home
                        </li>
                    </Link>

                    <Link to="/grants/list">
                        <li className="text-xl px-3 py-5 cursor-pointer border-b border-gray-200 dark:border-gray-700 hover:text-blue-300 dark:hover:text-blue-400 duration-[0.5s] flex gap-6 items-center active:text-blue-400 dark:active:text-blue-400">
                            <FcBusiness size={24} /> Feedbacks
                        </li>
                    </Link>

                    <Link to="/about">
                        <li className="text-xl px-3 py-5 cursor-pointer border-b border-gray-200 dark:border-gray-700 hover:text-blue-300 dark:hover:text-blue-400 duration-[0.5s] flex gap-6 items-center active:text-blue-400 dark:active:text-blue-400">
                            <FcAbout size={24} /> About US
                        </li>
                    </Link>

                    <Link to="/learn-more">
                        <li className="text-xl px-3 py-5 border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:text-blue-300 dark:hover:text-blue-400 duration-[0.5s] flex gap-6 items-center active:text-blue-400 dark:active:text-blue-400">
                            <FcAnswers size={24} /> Learn More
                        </li>
                    </Link>

                    <Link to="/contact">
                        <li className="text-xl px-3 py-5 cursor-pointer hover:text-blue-300 dark:hover:text-blue-400 duration-[0.5s] flex gap-6 items-center active:text-blue-400 dark:active:text-blue-400">
                            <FcPhone size={24} /> Contact US
                        </li>
                    </Link>
                </ul>
                <Link to="/login" className="flex justify-center">
                    <button className="my-5 text-white dark:text-gray-100 w-[80%] font-semibold text-xl py-3 px-6 ring-2 ring-blue-400 dark:ring-blue-700 hover:bg-blue-900 dark:hover:bg-blue-950 duration-500 cursor-pointer rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-700 whitespace-nowrap">
                        Login
                    </button>
                </Link>
                <Link to="/register" className="flex justify-center">
                    <button className="my-5 text-blue-900 dark:text-blue-300 w-[80%] font-semibold text-xl py-3 px-6 ring-2 ring-blue-400 dark:ring-blue-700 bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-900 duration-500 cursor-pointer rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-700 whitespace-nowrap">
                        Sign Up
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Navbar;
