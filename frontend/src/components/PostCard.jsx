import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../context/auth";
import { useState } from "react";
import axiosClient from "../api/axiosClient";
import { FaRegComment } from "react-icons/fa";
import { IoSend } from "react-icons/io5";

export default function PostCard({ post }) {
    const navigate = useNavigate();
    const [likes, setLikes] = useState(post.likes_count || 0);
    const [comments, setComments] = useState(post.comments || []);
    const [openComments, setOpenComments] = useState(false);
    const [commentText, setCommentText] = useState("");
    const [loadingComment, setLoadingComment] = useState(false);

    const handleLike = async () => {
        if (!isLoggedIn()) return navigate("/login");

        try {
            const res = await axiosClient.post(`/post/${post.id}/like`);
            if (res.data?.liked) {
                setLikes((prev) => prev + 1);
            } else {
                setLikes((prev) => Math.max(prev - 1, 0));
            }
        } catch (error) {
            console.error("Error liking post:", error);
        }
    };

    //  Toggle comments section
    const toggleComments = () => setOpenComments((prev) => !prev);

    const handleSendComment = async () => {
        if (!isLoggedIn()) return navigate("/login");
        if (!commentText.trim()) return;

        setLoadingComment(true);
        try {
            const res = await axiosClient.post(`/post/${post.id}/comment`, {
                content: commentText.trim(),
            });

            if (res.data?.comment) {
                // append new comment to list
                setComments((prev) => [...prev, res.data.comment]);
            }

            setCommentText("");
        } catch (error) {
            console.error("Error sending comment:", error);
        } finally {
            setLoadingComment(false);
        }
    };

    const title = post.title || "Untitled";
    const excerpt =
        post.excerpt || (post.content ? `${post.content.slice(0, 160)}...` : "");
    const author = post.author?.name || post.author || "Unknown";
    const date = post.publishedAt
        ? new Date(post.publishedAt).toLocaleDateString()
        : "";

    return (
        <div className="bg-neutral-800 text-white p-4 rounded-xl shadow mb-6 w-full max-w-2xl mx-auto border border-neutral-700">
            <article className="bg-white shadow-sm rounded-lg p-6 hover:shadow-md transition">
                <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
                <p className="mt-2 text-gray-600 text-sm">{excerpt}</p>
                <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                    <div>{author}</div>
                    <div>{date}</div>
                </div>
            </article>

            <div className="flex gap-3 mt-4 items-center">
                <button
                    onClick={handleLike}
                    className="bg-sky-600 hover:bg-sky-500 px-3 py-1 rounded transition-colors"
                >
                    ❤️ {likes}
                </button>

                <button
                    onClick={toggleComments}
                    className="bg-blue-600 hover:bg-blue-500 px-3 py-1 rounded flex items-center gap-2 transition-colors"
                >
                    <FaRegComment /> {comments.length} Comments
                </button>
            </div>

            {openComments && (
                <div className="mt-4 border-t border-neutral-700 pt-3">
                    <div className="space-y-2 max-h-60 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-neutral-700">
                        {comments.length > 0 ? (
                            comments.map((c, i) => (
                                <div
                                    key={i}
                                    className="bg-neutral-700 rounded-lg p-2 text-sm"
                                >
                                    <p className="font-semibold text-sky-400">
                                        {c.user?.name || "Anonymous"}
                                    </p>
                                    <p>{c.content}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-neutral-400 text-sm">
                                No comments yet.
                            </p>
                        )}
                    </div>

                    <div className="flex items-center gap-2 mt-3">
                        <input
                            type="text"
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder="Add a comment..."
                            className="flex-1 bg-neutral-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
                        />
                        <button
                            onClick={handleSendComment}
                            disabled={loadingComment}
                            className="bg-sky-600 hover:bg-sky-500 p-2 rounded-lg text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loadingComment ? (
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                <IoSend size={18} />
                            )}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
