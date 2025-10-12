import React from "react";
import { useAuth } from "../context/AuthContext";

import { IoHome } from "react-icons/io5";
import { Link } from "react-router-dom";
import Feed from "../components/Feed";

const WelcomePage = () => {
    // show a friendly greeting when auth hook is available
    const { user } = useAuth() || {};
    return (
        <div className="min-h-screen bg-gray-50 py-12 my-20">
            <div className="max-w-5xl mx-auto px-4">
                <header className="mb-8 flex gap-4 items-center">
                    {user && (
                        <Link to="/dashboard">
                            <IoHome className="text-blue-800 cursor-pointer text-2xl" />
                        </Link>
                    )}
                    <div className="space-y-2.5">
                        <h1 className="text-3xl font-extrabold text-gray-900">
                            OLA Blogging Platform
                        </h1>
                        <p className=" text-lg text-gray-600">
                            Welcome
                            {user?.username
                                ? `, ${user.username}`
                                : "  Guest !!"}
                            ! Read the latest posts below.
                        </p>
                    </div>
                </header>
                <main>
                    <Feed />
                </main>
            </div>
        </div>
    );
};

export default WelcomePage;
