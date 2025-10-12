import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axiosClient from "../api/axiosClient";

const PostInput = ({ onPostCreated }) => {
    const { token, user } = useAuth();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const textareaRef = useRef(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height =
                textareaRef.current.scrollHeight + "px";
        }
    }, [content]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!token) return navigate("/login");
        if (!content.trim() || !title.trim() || loading) return;

        setLoading(true);
        try {
            const res = await axiosClient.post(
                "/add/post",
                { content, title },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (res.data.post) {
                //Notify and update the post feeds
                onPostCreated && onPostCreated(res.data.post);
            }

            setContent("");
            setTitle("");
        } catch (error) {
            console.error("Error creating post:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-2xl mx-auto mb-20 border border-neutral-700 rounded-2xl p-4 shadow-md flex flex-col gap-2"
        >
            <input
                value={title}
                type="text"
                placeholder="Post title"
                onChange={(e) => setTitle(e.target.value)}
                className="border focus:outline-none p-3 rounded-2xl font-semibold text-lg "
            />
            <textarea
                ref={textareaRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={`What's on your mind, ${
                    user?.username || "guest"
                }?`}
                className="w-full resize-none overflow-hidden bg-transparent text-gray-900 text-base md:text-lg p-3 rounded-xl border border-neutral-700 focus:border-sky-500 focus:ring-1 focus:ring-sky-600 focus:outline-none transition-all"
                rows="4"
                maxLength="500"
                disabled={loading}
            />

            <div className="flex items-center justify-between mt-3">
                <p className="text-sm text-neutral-400">{content.length}/500</p>

                <button
                    type="submit"
                    disabled={loading || !content.trim() || !title.trim()}
                    className={`px-5 py-2 rounded-xl text-white text-sm font-medium transition-all ${
                        loading
                            ? "bg-sky-800 opacity-60 cursor-not-allowed"
                            : "bg-sky-600 hover:bg-sky-500"
                    }`}
                >
                    {loading ? "Posting..." : "Post"}
                </button>
            </div>
        </form>
    );
};

export default PostInput;
