import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { useAuth } from "../context/AuthContext";
import BackButton from "../components/BackNavBtn";

const EditPost = () => {
    const params = useParams();
    const pid = params.postId || params.id; // Accept either route param
    const navigate = useNavigate();
    const { user, token } = useAuth();

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!pid) {
            setError("Invalid post ID.");
            setLoading(false);
            return;
        }

        const fetchPost = async () => {
            try {
                const res = await axiosClient.get(`/edit/post/${pid}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const fetchedPost = res.data?.post;

                if (!fetchedPost) {
                    setError("Post not found.");
                    return;
                }

                if (fetchedPost.user_id !== user?.id) {
                    setError("You are not authorized to edit this post.");
                    return;
                }

                setPost(fetchedPost);
            } catch (err) {
                setError("Failed to load post.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [pid, user]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!post?.title || !post?.content) return;

        setSaving(true);
        try {
            await axiosClient.put(
                `/edit/post/${pid}`,
                {
                    post_id: pid,
                    title: post.title,
                    content: post.content,
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            alert("Post updated successfully!");
            navigate(-1);
        } catch (err) {
            console.error(err);
            alert("Failed to update post.");
        } finally {
            setSaving(false);
        }
    };

    if (loading)
        return (
            <div className="min-h-screen flex justify-center items-center">
                <p className="text-center mt-20 text-gray-300">
                    Loading post...
                </p>
            </div>
        );
    if (error)
        return (
            <div className="min-h-screen flex justify-center items-center">
                <BackButton className="fixed top-30" />
                <p className="text-center text-xl text-red-400">{error}</p>
            </div>
        );

    return (
        <div className="max-w-3xl mx-auto mt-30 mb-10 bg-neutral-50 text-gray-900 p-6 rounded-lg shadow-lg min-h-screen">
            <BackButton />
            <h2 className="text-2xl font-semibold mb-4 text-center py-4">
                Edit and Update your Post{" "}
                <span className="text-blue-500 italic ml-3">
                    {user?.username}
                </span>
            </h2>

            <form
                onSubmit={handleUpdate}
                className="w-full max-w-2xl mx-auto mb-20 border border-neutral-400 rounded-2xl p-4 shadow-md flex flex-col gap-4 bg-neutral-100"
            >
                <div>
                    <label className="block text-neutral-700 mb-1">Title</label>
                    <input
                        type="text"
                        placeholder="Post title"
                        value={post?.title || ""}
                        onChange={(e) =>
                            setPost({ ...post, title: e.target.value })
                        }
                        className="w-full  rounded-xl px-3 py-2 border border-neutral-400 focus:border-sky-400 focus:outline-none text-gray-900 bg-gray-200"
                    />
                </div>

                <div>
                    <label className="block text-neutral-700 mb-1">
                        Content
                    </label>
                    <textarea
                        value={post?.content || ""}
                        placeholder="What's on your mind..."
                        onChange={(e) =>
                            setPost({ ...post, content: e.target.value })
                        }
                        rows="8"
                        maxLength="500"
                        className="w-full resize-none overflow-hidden  text-gray-900 text-base bg-gray-200 md:text-lg p-3 rounded-xl border border-neutral-700 focus:border-sky-500  focus:ring-sky-600 focus:outline-none transition-all"
                    />
                </div>
                <p className="text-sm text-neutral-400">
                    {post?.content.length}/500
                </p>

                <div className="flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="bg-neutral-600 hover:bg-neutral-500 text-gray-50 px-4 py-2 rounded-lg"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={saving}
                        className={`px-5 py-2 rounded-xl text-white text-sm font-medium transition-all ${
                            saving
                                ? "bg-sky-800 opacity-60 cursor-not-allowed"
                                : "bg-sky-600 hover:bg-sky-500"
                        }`}
                    >
                        {saving ? "Saving..." : "Update Post"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditPost;
