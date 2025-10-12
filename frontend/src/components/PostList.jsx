import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import axiosClient from "../api/axiosClient";

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axiosClient.get("/all/posts").then((res) => setPosts(res.data));
    }, []);

    // if (loading)
    //     return (
    //         <div className="py-20 text-center text-gray-500">
    //             Loading posts...
    //         </div>
    //     );
    // if (error)
    //     return (
    //         <div className="py-20 text-center text-red-500">Error: {error}</div>
    //     );

    return (
        <main className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post) => (
                <PostCard key={post.id || post._id} post={post} />
            ))}
        </main>
    );
};

export default PostList;
