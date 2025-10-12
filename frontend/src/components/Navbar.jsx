import React, { useEffect, useRef, useState } from "react";

import { FiMenu } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { FcHome } from "react-icons/fc";
import { FcAbout } from "react-icons/fc";
import { FcBusiness } from "react-icons/fc";
import { FcAnswers } from "react-icons/fc";
import { FcPhone } from "react-icons/fc";
import { FaUserCircle } from "react-icons/fa";

import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const [navbar, setNavbar] = useState(false);
    const [profile, setProfile] = useState(false);
    const { user, token, logout } = useAuth();

    const isNavbar = () => {
        setNavbar(!navbar);
    };

    const isProfile = (e) => {
        e.stopPropagation();
        setProfile(!profile);
    };

    // Close the menu when clicking outside
    const profileRef = useRef(null);
    const mobileMenuRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                mobileMenuRef.current &&
                !mobileMenuRef.current.contains(event.target)
            ) {
                setNavbar(false);
            }
            if (
                profileRef.current &&
                !profileRef.current.contains(event.target)
            ) {
                setProfile(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
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

                                <Link to="/feeds">
                                    <li className="cursor-pointer text-gray-200 dark:text-gray-100 hover:text-blue-300 dark:hover:text-blue-400 py-2 px-4 rounded hover:bg-blue-800/50 dark:hover:bg-blue-900/50 duration-300 whitespace-nowrap">
                                        Feeds
                                    </li>
                                </Link>
                                <Link to="/feeds">
                                    <li className="cursor-pointer text-gray-200 dark:text-gray-100 hover:text-blue-300 dark:hover:text-blue-400 py-2 px-4 rounded hover:bg-blue-800/50 dark:hover:bg-blue-900/50 duration-300 whitespace-nowrap">
                                        Latest News
                                    </li>
                                </Link>
                                <Link to="/feeds">
                                    <li className="cursor-pointer text-gray-200 dark:text-gray-100 hover:text-blue-300 dark:hover:text-blue-400 py-2 px-4 rounded hover:bg-blue-800/50 dark:hover:bg-blue-900/50 duration-300 whitespace-nowrap">
                                        About Us
                                    </li>
                                </Link>
                                <Link to="/feeds">
                                    <li className="cursor-pointer text-gray-200 dark:text-gray-100 hover:text-blue-300 dark:hover:text-blue-400 py-2 px-4 rounded hover:bg-blue-800/50 dark:hover:bg-blue-900/50 duration-300 whitespace-nowrap">
                                        Contact Support
                                    </li>
                                </Link>
                            </ul>
                        </div>
                    </div>
                    {!user ? (
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
                    ) : (
                        <>
                            <div
                                onClick={isProfile}
                                className=" flex items-center gap-3 cursor-pointer z-50 text-gray-100 p-2 rounded-md hover:bg-blue-800/50 dark:hover:bg-blue-900/50 duration-300 relative"
                            >
                                {profile ? (
                                    <FaUserCircle size={24} />
                                ) : (
                                    <FaUserCircle size={24} />
                                )}

                                {profile && (
                                    <div
                                        className="absolute top-16 right-0 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600"
                                        ref={profileRef}
                                    >
                                        <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                                            <Link to="/profile">
                                                <h3 className="font-semibold cursor-pointer">
                                                    {`${
                                                        user?.first_name?.[0]?.toUpperCase() +
                                                        user?.first_name?.slice(
                                                            1
                                                        )
                                                    } ${
                                                        user?.last_name?.[0]?.toUpperCase() +
                                                        user?.last_name?.slice(
                                                            1
                                                        )
                                                    }`}
                                                </h3>
                                            </Link>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                {user?.email}
                                            </p>
                                        </div>
                                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                                            <li>
                                                <Link
                                                    to="/dashboard"
                                                    className="block px-4 py-2
                                                hover:bg-gray-100
                                                dark:hover:bg-gray-600
                                                dark:hover:text-white"
                                                >
                                                    Dashboard
                                                </Link>
                                            </li>
                                            <li>
                                                <a
                                                    href="#"
                                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                >
                                                    Settings
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="#"
                                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                >
                                                    Earnings
                                                </a>
                                            </li>
                                        </ul>
                                        <div className="py-2">
                                            <form action="">
                                                <button
                                                    onClick={logout}
                                                    className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                                >
                                                    Sign out
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </nav>

            {/* Mobile Navbar */}
            <nav className="fixed top-0 w-full flex text-white dark:text-gray-100 justify-between items-center lg:hidden px-5 py-4 z-50 bg-gradient-to-r from-indigo-800 to-blue-900 dark:from-gray-950 dark:to-blue-950 backdrop-blur-sm shadow-md border-b border-indigo-700 dark:border-gray-800">
                <div>
                    <Link to="/">
                        <h2 className="text-3xl font-bold">OLA</h2>
                    </Link>
                </div>

                <div className="flex items-center gap-3">
                    {user && (
                        <div
                            onClick={() => setProfile(!profile)}
                            className="relative text-white cursor-pointer"
                        >
                            <FaUserCircle size={28} />
                            {profile && (
                                <div
                                    ref={profileRef}
                                    className="absolute right-0 top-12 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow-md dark:bg-gray-700 dark:divide-gray-600 z-50"
                                >
                                    <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                                        <Link to="/profile">
                                            <h3 className="font-semibold">
                                                {`${
                                                    user?.first_name?.[0]?.toUpperCase() +
                                                    user?.first_name?.slice(1)
                                                } ${
                                                    user?.last_name?.[0]?.toUpperCase() +
                                                    user?.last_name?.slice(1)
                                                }`}
                                            </h3>
                                        </Link>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">
                                            {user?.email}
                                        </p>
                                    </div>
                                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                                        <li>
                                            <Link
                                                to="/dashboard"
                                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                            >
                                                Dashboard
                                            </Link>
                                        </li>
                                        <li>
                                            <a
                                                href="#"
                                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                            >
                                                Settings
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#"
                                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                            >
                                                Earnings
                                            </a>
                                        </li>
                                    </ul>
                                    <div className="py-2">
                                        <button
                                            onClick={logout}
                                            className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                        >
                                            Sign out
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    <div
                        onClick={isNavbar}
                        className="border-2 border-blue-400 dark:border-blue-700 text-blue-400 dark:text-blue-300 p-2 rounded-md cursor-pointer text-3xl"
                    >
                        {!navbar ? <FiMenu /> : <AiOutlineClose />}
                    </div>
                </div>
            </nav>

            {/* Mobile Slide-out Menu */}
            <div
                onClick={isNavbar}
                ref={mobileMenuRef}
                className={`fixed top-[72px] left-0 w-full min-h-screen bg-gradient-to-r from-indigo-800 to-blue-900/95 dark:from-gray-950 dark:to-blue-950/95 backdrop-blur-sm z-40 transition-all duration-700 ${
                    navbar
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-full opacity-0"
                }`}
            >
                <ul className="flex flex-col gap-2 text-gray-200 dark:text-gray-100 px-4">
                    <Link to="/">
                        <li className="text-xl px-3 py-5 cursor-pointer border-b border-gray-200 dark:border-gray-700 hover:text-blue-300 dark:hover:text-blue-400 duration-300 flex gap-6 items-center active:text-blue-400">
                            <FcHome size={24} /> Home
                        </li>
                    </Link>

                    <Link to="/feeds">
                        <li className="text-xl px-3 py-5 cursor-pointer border-b border-gray-200 dark:border-gray-700 hover:text-blue-300 dark:hover:text-blue-400 duration-300 flex gap-6 items-center active:text-blue-400">
                            <FcBusiness size={24} /> Feeds
                        </li>
                    </Link>

                    <Link to="/about">
                        <li className="text-xl px-3 py-5 cursor-pointer border-b border-gray-200 dark:border-gray-700 hover:text-blue-300 dark:hover:text-blue-400 duration-300 flex gap-6 items-center active:text-blue-400">
                            <FcAbout size={24} /> About Us
                        </li>
                    </Link>

                    <Link to="/learn-more">
                        <li className="text-xl px-3 py-5 border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:text-blue-300 dark:hover:text-blue-400 duration-300 flex gap-6 items-center active:text-blue-400">
                            <FcAnswers size={24} /> Latest News
                        </li>
                    </Link>

                    <Link to="/contact">
                        <li className="text-xl px-3 py-5 cursor-pointer hover:text-blue-300 dark:hover:text-blue-400 duration-300 flex gap-6 items-center active:text-blue-400">
                            <FcPhone size={24} /> Contact Support
                        </li>
                    </Link>
                </ul>

                {!user && (
                    <>
                        <Link to="/login" className="flex justify-center">
                            <button className="my-5 text-white dark:text-gray-100 w-[80%] font-semibold text-xl py-3 px-6 ring-2 ring-blue-400 dark:ring-blue-700 hover:bg-blue-900 dark:hover:bg-blue-950 duration-500 rounded-2xl shadow-lg">
                                Login
                            </button>
                        </Link>

                        <Link to="/register" className="flex justify-center">
                            <button className="my-5 text-blue-900 dark:text-blue-300 w-[80%] font-semibold text-xl py-3 px-6 ring-2 ring-blue-400 dark:ring-blue-700 bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-900 duration-500 rounded-2xl shadow-lg">
                                Sign Up
                            </button>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Navbar;
