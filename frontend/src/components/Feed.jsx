import React, { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "./PostCard";
import { useAuth } from "../context/AuthContext";
import PostInput from "./PostInput";

const Feed = () => {
    const { user, token } = useAuth();
    const [posts, setPosts] = useState([]);
    const [nextPageUrl, setNextPageUrl] = useState(
        "http://localhost:8000/api/all/posts"
    );
    const [loading, setLoading] = useState(false);

    const handlePostCreated = (newPost) => {
        setPosts((prev) => [newPost, ...prev]);
    };

    const loadPosts = async () => {
        if (!nextPageUrl || loading) return;
        setLoading(true);
        try {
            const res = await axios.get(nextPageUrl);

            const postsData = res.data?.posts?.data || [];
            const nextPage = res.data?.posts?.next_page_url || null;

            setPosts((prev) => {
                const existing = new Set(prev.map((p) => p.id));
                const newOnes = postsData.filter((p) => !existing.has(p.id));
                return [...prev, ...newOnes];
            });
            setNextPageUrl(nextPage);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPosts();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + window.scrollY >=
                document.body.offsetHeight - 200
            ) {
                loadPosts();
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [nextPageUrl, loading]);

    return (
        <div className="max-w-3xl mx-auto mt-10 ">
            {user ? (
                <PostInput onPostCreated={handlePostCreated} />
            ) : (
                <div className="text-lg italic font-medium text-center border border-gray-300 max-w-xl mx-auto my-10 shadow-md py-10 rounded-xl">
                    {" "}
                    Login or join us today to explore full features
                </div>
            )}
            {posts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}

            {loading && (
                <p className="text-center text-gray-500 my-5">
                    Loading more posts...
                </p>
            )}

            {!nextPageUrl && (
                <p className="text-center text-gray-500 my-5">
                    No more posts to load.
                </p>
            )}
        </div>
    );
};

export default Feed;
