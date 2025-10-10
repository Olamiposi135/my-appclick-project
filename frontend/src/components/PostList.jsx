import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import axiosClient from "../api/axiosClient";

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let mounted = true;
        const fetchPosts = async () => {
            try {
                const res = await axiosClient.get("/posts");
                if (!res.ok) throw new Error(`Server error ${res.status}`);
                const data = await res.json();
                if (mounted) setPosts(data);
            } catch (err) {
                if (mounted) setError(err.message || "Failed to load posts");
            } finally {
                if (mounted) setLoading(false);
            }
        };
        fetchPosts();
        return () => {
            mounted = false;
        };
    }, []);

    if (loading)
        return (
            <div className="py-20 text-center text-gray-500">
                Loading posts...
            </div>
        );
    if (error)
        return (
            <div className="py-20 text-center text-red-500">Error: {error}</div>
        );
    if (!posts || posts.length === 0)
        return (
            <div className="py-20 text-center text-gray-500">
                No posts yet. Be the first to write one!
            </div>
        );

    return (
        <main className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post) => (
                <PostCard key={post.id || post._id} post={post} />
            ))}
        </main>
    );
};

export default PostList;
