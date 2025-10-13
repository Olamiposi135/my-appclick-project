import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import PostCard from "./PostCard";
import { useAuth } from "../context/AuthContext";
import BackButton from "./BackNavBtn";

const UsersPosts = () => {
    const { token } = useAuth();
    const { userId } = useParams();
    const [posts, setPosts] = useState([]);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [nextPageUrl, setNextPageUrl] = useState(null);
    const navigate = useNavigate();

    const loadProfilePosts = async (url) => {
        if (loading) return;
        setLoading(true);

        if (!token) {
            return navigate("/login");
        }

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
        if (!userId) return;
        setPosts([]); // reset posts when switching users
        loadProfilePosts(`/user/${userId}/posts`);
    }, [userId]);

    return (
        <div className="container mx-auto mt-10 px-4">
            <div>
                <BackButton />
            </div>
            {userData && (
                <h2 className="text-2xl md:text-3xl font-semibold text-blue-500 my-5 italic py-4 text-center">
                    {userData.username}'s Posts
                </h2>
            )}

            {posts.length === 0 && !loading && (
                <div className="space-y-5">
                    <BackButton />
                    <p className="text-center text-gray-400">No posts yet.</p>
                </div>
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

export default UsersPosts;
