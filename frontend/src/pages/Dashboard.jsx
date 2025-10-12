import React, { useState } from "react";
import Feed from "../components/Feed";
import { useAuth } from "../context/AuthContext";
import ProfilePosts from "../components/ProfilePosts";

const Dashboard = () => {
    const { user } = useAuth();
    const [view, setView] = useState("feed");
    return (
        <div className="min-h-screen bg-gray-50 my-20 container  mx-auto py-10 px-4">
            <header className="flex justify-between items-center px-2 md:px-6 py-4 border-b border-neutral-700">
                <h1 className="text-blue-900 text-xl md:text-2xl italic font-bold">
                    Welcome,{" "}
                    {`${
                        user?.first_name?.[0]?.toUpperCase() +
                        user?.first_name?.slice(1)
                    } ${
                        user?.last_name?.[0]?.toUpperCase() +
                        user?.last_name?.slice(1)
                    }`}
                </h1>

                <div className="flex gap-3 flex-col md:flex-row">
                    <button
                        onClick={() => setView("feed")}
                        className={`px-4 py-2 rounded-lg ${
                            view === "feed"
                                ? "bg-sky-600 text-white"
                                : "bg-neutral-700 hover:bg-neutral-600 text-gray-100"
                        }`}
                    >
                        Feed
                    </button>

                    <button
                        onClick={() => setView("userPosts")}
                        className={`px-4 py-2 rounded-lg ${
                            view === "userPosts"
                                ? "bg-sky-600 text-white"
                                : "bg-neutral-700 hover:bg-neutral-600 text-gray-100"
                        }`}
                    >
                        My Posts
                    </button>
                </div>
            </header>

            <main className="px-6 py-4">
                {view === "feed" && <Feed />}
                {view === "userPosts" && (
                    <ProfilePosts active={view === "userPosts"} />
                )}
            </main>
        </div>
    );
};

export default Dashboard;
