import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import axiosClient from "../api/axiosClient";

export default function LoginForm() {
    const [formData, setFormData] = useState({
        login: "", // email or username
        password: "",
    });

    const { login } = useAuth();
    const [errorFields, setErrorFields] = useState({});
    const [generalError, setGeneralError] = useState("");
    const [spinner, setSpinner] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSpinner(true);
        setErrorFields({});
        setGeneralError("");

        // Frontend validation
        const newErrors = {};
        if (!formData.login.trim())
            newErrors.login = "Email or Username is required";
        if (!formData.password.trim())
            newErrors.password = "Password is required";

        if (Object.keys(newErrors).length > 0) {
            setErrorFields(newErrors);
            setSpinner(false);
            return;
        }

        try {
            const res = await axiosClient.post("/login", {
                login: formData.login,
                password: formData.password,
            });

            const { access_token, user } = res.data;

            login(access_token, user);

            // Redirect
            navigate("/dashboard");
        } catch (err) {
            if (err?.response?.data?.errors) {
                setErrorFields(err.response.data.errors);
            } else if (err?.response?.data?.message) {
                setGeneralError(err.response.data.message);
            } else {
                setGeneralError("Login failed. Please try again.");
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
                    Login
                    <span className="absolute left-0 w-4 h-4 rounded-full bg-sky-400 animate-pulse"></span>
                </p>
                <p className="text-sm text-neutral-400 mb-2">
                    Enter your credentials to access your account.
                </p>

                {generalError && (
                    <p className="text-red-400 text-sm mb-2">{generalError}</p>
                )}

                {/* Login (email or username) */}
                <label className="relative">
                    <input
                        type="text"
                        value={formData.login}
                        onChange={(e) =>
                            setFormData({ ...formData, login: e.target.value })
                        }
                        className="input-class"
                        placeholder=" "
                    />
                    <span className="absolute left-3 top-2 text-neutral-400 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-500 peer-focus:top-2 peer-focus:text-sm peer-focus:text-sky-400">
                        Email or Username
                    </span>
                    {errorFields.login && (
                        <p className="text-red-400 text-xs mt-1">
                            {errorFields.login}
                        </p>
                    )}
                </label>

                {/* Password */}
                <label className="relative">
                    <input
                        type="password"
                        value={formData.password}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                password: e.target.value,
                            })
                        }
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

                <button
                    type="submit"
                    className="mt-2 bg-sky-500 hover:bg-sky-400 text-white font-semibold py-2 rounded-lg transition-colors"
                >
                    {spinner ? (
                        <div className="w-5 h-5 border-4 border-white border-t-transparent border-b-transparent rounded-full animate-spin mx-auto"></div>
                    ) : (
                        "Login"
                    )}
                </button>
                <p>
                    <Link
                        to="/forgot-login/password"
                        className="text-sky-400 hover:underline"
                    >
                        Forgot Password?
                    </Link>
                </p>

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
