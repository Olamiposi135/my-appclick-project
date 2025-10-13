import React, { useState } from "react";
import axios from "axios";
import axiosClient from "../api/axiosClient";
import { Link } from "react-router-dom";
import BackButton from "../components/BackNavBtn";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        setError("");

        try {
            const response = await axiosClient.post("/forgot-password", {
                email,
            });
            setMessage(response.data.message);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                    "Failed to send password reset link."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 my-10 md:my-16 bg-white">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-2.5 w-full max-w-md bg-neutral-800 text-white border border-neutral-700 rounded-2xl p-6 shadow-lg"
            >
                <div className="text-center ">
                    {message && <p className="text-green-500">{message}</p>}
                    {error && <p className="text-red-500">{error}</p>}
                </div>
                <p className="text-3xl font-semibold flex items-center text-sky-400 relative pl-8">
                    Forgot Password
                    <span className="absolute left-0 w-4 h-4 rounded-full bg-sky-400 animate-pulse"></span>
                </p>
                <p className="text-sm text-neutral-400 mb-2">
                    Enter your credentials to access your account.
                </p>

                {/* Email to reset password */}
                <label className="relative">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input-class"
                        placeholder=" "
                    />
                    <span className="absolute left-3 top-2 text-neutral-400 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-500 peer-focus:top-2 peer-focus:text-sm peer-focus:text-sky-400">
                        Enter your email
                    </span>
                </label>
                {error.email && (
                    <p className="text-red-400 text-xs mt-1">{error.email}</p>
                )}

                <div className="flex items-center gap-3 my-3 ">
                    <BackButton className=" py-2 w-fit  font-semibold  " />
                    <button
                        type="submit"
                        className="flex-1  bg-sky-500 hover:bg-sky-400 text-white font-semibold py-2 rounded-2xl transition-colors"
                    >
                        {loading ? "Sending reset link" : "Recover Password"}
                    </button>
                </div>
                <p>
                    <Link to="/login" className="text-sky-400 hover:underline">
                        Login your account
                    </Link>
                </p>

                <p className="text-center text-sm text-neutral-400 mt-2">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="text-sky-400 hover:underline"
                    >
                        Register
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default ForgotPassword;
