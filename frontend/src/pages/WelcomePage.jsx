import React from "react";
import { useAuth } from "../context/AuthContext";
import PostList from "../components/PostList";

const WelcomePage = () => {
    // show a friendly greeting when auth hook is available
    const { user } = useAuth() || {};
    return (
        <div className="min-h-screen bg-gray-50 py-12 my-20">
            <div className="max-w-5xl mx-auto px-4">
                <header className="mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-900">
                        OLA Blogging Platform
                    </h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Welcome{user?.username ? `, ${user.username}` : ""}!
                        Read the latest posts below.
                    </p>
                </header>

                <PostList />
            </div>
        </div>
    );
};

export default WelcomePage;
