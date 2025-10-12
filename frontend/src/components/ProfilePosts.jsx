import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import PostCard from "./PostCard";
import { useAuth } from "../context/AuthContext";

const ProfilePosts = () => {
    const { userId } = useParams(); // for public profiles
    const { user } = useAuth(); // for logged-in user
    const idToFetch = userId || user?.id; // auto fallback
    const [posts, setPosts] = useState([]);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [nextPageUrl, setNextPageUrl] = useState(null);

    const loadProfilePosts = async (url = `/user/${idToFetch}/posts`) => {
        if (loading || !idToFetch) return;
        setLoading(true);

        try {
            const res = await axiosClient.get(url);
            const fetchedPosts = res.data?.posts?.data || [];
            setUserData(res.data?.user || null);
            setPosts((prev) => [...prev, ...fetchedPosts]);
            setNextPageUrl(res.data?.posts?.next_page_url || null);
        } catch (err) {
            console.error("Error fetching profile posts:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setPosts([]); // reset when changing user
        if (idToFetch) loadProfilePosts();
    }, [idToFetch]);

    return (
        <div className="container mx-auto mt-10 px-4">
            {userData && (
                <h2 className="text-2xl font-semibold text-white mb-4">
                    {userData.username}'s Posts
                </h2>
            )}

            {posts.length === 0 && !loading && (
                <p className="text-center text-gray-400">No posts yet.</p>
            )}

            {posts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}

            {loading && (
                <p className="text-center text-gray-400 my-5">
                    Loading more posts...
                </p>
            )}

            {!loading && nextPageUrl && (
                <div className="text-center mt-6">
                    <button
                        onClick={() => loadProfilePosts(nextPageUrl)}
                        className="bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-500"
                    >
                        Load More
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfilePosts;
