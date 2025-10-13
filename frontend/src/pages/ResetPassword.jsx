import { useEffect, useState } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import axiosClient from "../api/axiosClient";

export default function ResetPassword() {
    const location = useLocation();
    const [message, setMessage] = useState("");
    const [token, setToken] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [errorFields, setErrorFields] = useState({});
    const [generalError, setGeneralError] = useState("");
    const [spinner, setSpinner] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const emailParam = queryParams.get("email");
        const tokenParam = queryParams.get("token");
        if (emailParam) setEmail(emailParam);
        if (tokenParam) setToken(tokenParam);
    }, [location]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSpinner(true);
        setErrorFields({});
        setGeneralError("");
        setMessage("");

        // Frontend validation
        const newErrors = {};
        if (!email.trim()) newErrors.login = "Email or Username is required";
        if (!password.trim()) newErrors.password = "Password is required";
        if (password !== confirmPassword)
            newErrors.confirmPassword = "Passwords do not match";

        if (Object.keys(newErrors).length > 0) {
            setErrorFields(newErrors);
            setSpinner(false);
            return;
        }

        try {
            const res = await axiosClient.post("/reset-password", {
                token,
                email,
                password,
                password_confirmation: confirmPassword,
            });

            setMessage(res.data.message);
            setTimeout(() => {
                navigate("/login"); // Redirect to login after successful password reset
            }, 3000);
        } catch (err) {
            if (err?.response?.data?.errors) {
                setErrorFields(err.response.data.errors);
            } else if (err?.response?.data?.message) {
                setGeneralError(err.response.data.message);
            } else {
                setGeneralError("Failed to reset password , try again.");
            }
        } finally {
            setSpinner(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 my-10 md:my-16 bg-white">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-2.5 w-full max-w-md bg-neutral-800 text-white border border-neutral-700 rounded-2xl p-6 shadow-lg"
            >
                <p className="text-3xl font-semibold flex items-center text-sky-400 relative pl-8">
                    Reset your Login
                    <span className="absolute left-0 w-4 h-4 rounded-full bg-sky-400 animate-pulse"></span>
                </p>
                <p className="text-sm text-neutral-400 mb-2">
                    Enter your credentials to reset your login.
                </p>

                {generalError && (
                    <p className="text-red-400 text-sm mb-2">{generalError}</p>
                )}

                <label className="relative">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input-class"
                        placeholder=" "
                    />
                    <span className="absolute left-3 top-2 text-neutral-400 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-500 peer-focus:top-2 peer-focus:text-sm peer-focus:text-sky-400">
                        Email
                    </span>
                    {errorFields.email && (
                        <p className="text-red-400 text-xs mt-1">
                            {errorFields.email}
                        </p>
                    )}
                </label>

                {/* Password */}
                <label className="relative">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input-class"
                        placeholder=" "
                    />
                    <span className="absolute left-3 top-2 text-neutral-400 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-500 peer-focus:top-2 peer-focus:text-sm peer-focus:text-sky-400">
                        Password
                    </span>
                    {errorFields.password && (
                        <p className="text-red-400 text-xs mt-1">
                            {errorFields.password}
                        </p>
                    )}
                </label>

                <label className="relative">
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="input-class"
                        placeholder=" "
                    />
                    <span className="absolute left-3 top-2 text-neutral-400 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-500 peer-focus:top-2 peer-focus:text-sm peer-focus:text-sky-400">
                        Password
                    </span>
                    {errorFields.confirmPassword && (
                        <p className="text-red-400 text-xs mt-1">
                            {errorFields.confirmPassword}
                        </p>
                    )}
                </label>

                <button
                    type="submit"
                    className="mt-2 bg-sky-500 hover:bg-sky-400 text-white font-semibold py-2 rounded-lg transition-colors"
                >
                    {!spinner ? "Reset Password" : "Resetting ..."}
                </button>

                <p className="text-center text-sm text-neutral-400 mt-2">
                    Don't have an account?{" "}
                    <a href="#" className="text-sky-400 hover:underline">
                        Register
                    </a>
                </p>
            </form>
        </div>
    );
}
