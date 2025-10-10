import { useState } from "react";
import axiosClient from "../api/axiosClient";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        username: "",
        password: "",
        confirmPassword: "",
    });

    const [errorFields, setErrorFields] = useState({});
    const [generalError, setGeneralError] = useState("");
    const [spinner, setSpinner] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!formData.firstName.trim())
            newErrors.firstName = "Firstname is required";
        if (!formData.lastName.trim())
            newErrors.lastName = "Lastname is required";
        if (!formData.username.trim())
            newErrors.username = "Username is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        if (!formData.phoneNumber.trim())
            newErrors.phoneNumber = "Phone number is required";
        if (formData.password.length < 6)
            newErrors.password = "Password must be at least 6 characters";
        if (formData.password !== formData.confirmPassword)
            newErrors.confirmPassword = "Passwords do not match";

        if (Object.keys(newErrors).length > 0) {
            setErrorFields(newErrors);
            setSpinner(false);
            return;
        }

        try {
            const res = await axiosClient.post("/register", {
                first_name: formData.firstName,
                last_name: formData.lastName,
                email: formData.email,
                phone_number: formData.phoneNumber,
                username: formData.username,
                password: formData.password,
                password_confirmation: formData.confirmPassword,
            });

            // Store token in localStorage
            localStorage.setItem("token", res.data.access_token);
            navigate("/dashboard");
        } catch (err) {
            if (err?.response?.data?.errors) {
                setErrorFields(err.response.data.errors);
            } else {
                setGeneralError("Something went wrong. Please try again.");
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 my-20">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-2.5 w-full max-w-md bg-neutral-800 text-white border border-neutral-700 rounded-2xl p-6 shadow-lg"
            >
                <p className="text-3xl font-semibold flex items-center text-sky-400 relative pl-8">
                    Register
                    <span className="absolute left-0 w-4 h-4 rounded-full bg-sky-400 animate-pulse"></span>
                </p>
                <p className="text-sm text-neutral-400">
                    Signup a new account.
                </p>

                {generalError && (
                    <p className="text-red-400 text-sm mb-2">{generalError}</p>
                )}

                {/* First + Last Name */}
                <div className="flex flex-col sm:flex-row gap-2">
                    <label className="relative flex-1">
                        <input
                            type="text"
                            value={formData.firstName}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    firstName: e.target.value,
                                })
                            }
                            className="input-class"
                        />
                        <span className="absolute left-3 top-2 text-neutral-400 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-500 peer-focus:top-2 peer-focus:text-sm peer-focus:text-sky-400">
                            Firstname
                        </span>
                        {errorFields.firstName && (
                            <p className="error-class">
                                {errorFields.firstName}
                            </p>
                        )}
                    </label>

                    <label className="relative flex-1">
                        <input
                            type="text"
                            value={formData.lastName}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    lastName: e.target.value,
                                })
                            }
                            className="input-class"
                        />
                        <span className="absolute left-3 top-2 text-neutral-400 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-500 peer-focus:top-2 peer-focus:text-sm peer-focus:text-sky-400">
                            Lastname
                        </span>
                        {errorFields.lastName && (
                            <p className="error-class">
                                {errorFields.lastName}
                            </p>
                        )}
                    </label>
                </div>

                {/* Username */}
                <label className="relative">
                    <input
                        type="text"
                        value={formData.username}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                username: e.target.value,
                            })
                        }
                        className="input-class"
                    />
                    <span className="absolute left-3 top-2 text-neutral-400 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-500 peer-focus:top-2 peer-focus:text-sm peer-focus:text-sky-400">
                        Username
                    </span>
                    {errorFields.username && (
                        <p className="error-class">{errorFields.username}</p>
                    )}
                </label>

                {/* Phone Number */}
                <label className="relative">
                    <input
                        type="text"
                        value={formData.phoneNumber}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                phoneNumber: e.target.value,
                            })
                        }
                        className="input-class"
                    />
                    <span className="absolute left-3 top-2 text-neutral-400 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-500 peer-focus:top-2 peer-focus:text-sm peer-focus:text-sky-400">
                        Phone Number
                    </span>
                    {errorFields.phoneNumber && (
                        <p className="error-class">{errorFields.phoneNumber}</p>
                    )}
                </label>

                {/* Email */}
                <label className="relative">
                    <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                        }
                        className="input-class"
                    />
                    <span className="absolute left-3 top-2 text-neutral-400 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-500 peer-focus:top-2 peer-focus:text-sm peer-focus:text-sky-400">
                        Email
                    </span>
                    {errorFields.email && (
                        <p className="error-class">{errorFields.email}</p>
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
                    />
                    <span className="absolute left-3 top-2 text-neutral-400 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-500 peer-focus:top-2 peer-focus:text-sm peer-focus:text-sky-400">
                        Password
                    </span>
                    {errorFields.password && (
                        <p className="error-class">{errorFields.password}</p>
                    )}
                </label>

                {/* Confirm Password */}
                <label className="relative">
                    <input
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                confirmPassword: e.target.value,
                            })
                        }
                        className="input-class"
                    />
                    <span className="absolute left-3 top-2 text-neutral-400 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-500 peer-focus:top-2 peer-focus:text-sm peer-focus:text-sky-400">
                        Confirm Password
                    </span>
                    {errorFields.confirmPassword && (
                        <p className="error-class">
                            {errorFields.confirmPassword}
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
                        "Create Account"
                    )}
                </button>

                <p className="text-center text-sm text-neutral-400">
                    Already have an account?{" "}
                    <a href="#" className="text-sky-400 hover:underline">
                        Sign in
                    </a>
                </p>
            </form>
        </div>
    );
}
