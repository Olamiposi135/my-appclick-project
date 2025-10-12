import React, { useState } from "react";
import { FaRegComment } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { useAuth } from "../context/AuthContext";
import axiosClient from "../api/axiosClient";
import { useNavigate, Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const PostCard = ({ post }) => {
    const { user, token } = useAuth();
    const navigate = useNavigate();

    const [comments, setComments] = useState(post.comments || []);
    const [likes, setLikes] = useState(
        post.likes?.length || post.likes_count || 0
    );
    const [isLiked, setIsLiked] = useState(post.is_liked || false);
    const [showComments, setShowComments] = useState(false);
    const [commentText, setCommentText] = useState("");
    const [loadingComment, setLoadingComment] = useState(false);

    //  Like Handler
    const handleLike = async () => {
        if (!token) return navigate("/login");

        try {
            setIsLiked(!isLiked);
            setLikes((prev) => (isLiked ? prev - 1 : prev + 1));

            await axiosClient.post(
                `/post/${post.id}/like`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
        } catch (error) {
            console.error("Error liking post:", error);
        }
    };

    //  toggle comment , open and close
    const handleShowComments = async () => {
        if (showComments) return setShowComments(false);

        try {
            const res = await axiosClient.get(`/single/post/${post.id}`);
            const comments = res.data.post?.comments || [];
            setComments(comments);
            setShowComments(true);
        } catch (error) {
            console.error("Failed to load comments:", error);
        }
    };

    // Send Comment
    const handleSendComment = async () => {
        if (!token) return navigate("/login");
        const text = commentText.trim();
        if (!text) return;

        setLoadingComment(true);
        try {
            const res = await axiosClient.post(
                `/post/${post.id}/comment`,
                { content: text },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            const newComment = res.data.comment;
            setComments((prev) => [...prev, newComment]);
            setCommentText("");
        } catch (error) {
            console.error("Error posting comment:", error);
        } finally {
            setLoadingComment(false);
        }
    };

    //  Handle edit to navigate to edit post page
    const handleEdit = () => {
        navigate(`/edit/post/${post.id}`);
    };

    const isOwner = user?.id === post.user?.id;

    const handleDelete = async (e) => {
        e.preventDefault();

        if (!token) return navigate("/login");

        // confirm alert to avoid mistake
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this post?"
        );
        if (!confirmDelete) return;

        try {
            const res = await axiosClient.delete(`/delete/post/${post.id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            // Show confirmation message
            alert("Post deleted successfully!");

            navigate(-1); // go back to previous page
        } catch (error) {
            console.error("Error Deleting post:", error);
            alert(
                error.response?.data?.error ||
                    "Failed to delete post. Please try again."
            );
        }
    };

    return (
        <div className="bg-neutral-800 text-white rounded-lg shadow-md p-6 border border-neutral-700 my-4 max-w-2xl mx-auto relative">
            {/*  Edit Button (Only if user owns post) */}
            {isOwner && (
                <div className="flex justify-end items-center gap-3">
                    <button
                        onClick={handleEdit}
                        className="hover:-translate-y-0.5 transition"
                        title="Edit Post"
                    >
                        <FaEdit className=" text-lg text-sky-400  transition" />
                    </button>

                    <button
                        onClick={handleDelete}
                        className="p-2 rounded-full hover:bg-gray-700 transition"
                    >
                        <MdDelete className="text-red-500  text-lg" />
                    </button>
                </div>
            )}

            {/* Post title and content*/}
            <h4 className="text-xl font-semibold mb-2">{post.title}</h4>
            <p className="text-neutral-300 mb-2 whitespace-pre-line">
                {post.content?.length > 250
                    ? post.content.slice(0, 250) + "..."
                    : post.content}
            </p>

            <div className="text-sm text-neutral-400 mb-4">
                By {post.user?.username || "Anonymous"} •{" "}
                {new Date(post.created_at).toLocaleDateString()}
            </div>

            {/* Like Buttons */}
            <div className="flex items-center gap-4 mt-2">
                <button
                    onClick={handleLike}
                    className="flex items-center gap-1 bg-sky-200 text-black hover:bg-sky-100 px-3 py-1 rounded transition"
                >
                    {isLiked ? "❤️" : "🤍"} {likes}
                </button>

                <button
                    onClick={handleShowComments}
                    className="flex items-center gap-2 bg-blue-500 hover:bg-blue-400 px-3 py-1 rounded transition"
                >
                    <FaRegComment />
                    {comments.length}
                </button>
            </div>

            {/*  Comments Section */}
            {showComments && (
                <div className="mt-4 border-t border-neutral-700 pt-3">
                    <div className="flex items-center gap-2 mb-3">
                        <textarea
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder="Add a comment..."
                            className="flex-1 bg-neutral-700 text-white rounded-lg px-3 py-2 border border-neutral-600 focus:border-sky-400 focus:outline-none resize-none"
                            rows={1}
                        />
                        <button
                            onClick={handleSendComment}
                            disabled={loadingComment}
                            className="bg-sky-600 hover:bg-sky-500 p-2 rounded-lg text-white"
                        >
                            {loadingComment ? (
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                <IoSend size={20} />
                            )}
                        </button>
                    </div>

                    {comments.length > 0 ? (
                        <ul className="space-y-2">
                            {comments.map((c, i) => (
                                <li
                                    key={c.id || i}
                                    className="bg-neutral-700 rounded-lg p-3 text-sm"
                                >
                                    <p>{c.comment || c.content}</p>
                                    <span className="text-xs text-neutral-400">
                                        — {c.user?.username || "Anonymous"}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-neutral-500 text-sm">
                            No comments yet.
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default PostCard;
