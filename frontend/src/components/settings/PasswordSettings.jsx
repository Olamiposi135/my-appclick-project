import React, { useState } from "react";
import SettingsCard from "./SettingsCard";
import { useAuth } from "../../context/AuthContext";
import axiosClient from "../../api/axiosClient";
import { FiEye, FiEyeOff } from "react-icons/fi";

const PasswordSettings = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [status, setStatus] = useState({ message: "", type: "" });
    const [loading, setLoading] = useState(false);
    const { token } = useAuth() || {};

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setStatus({
                message: "New passwords do not match.",
                type: "error",
            });
            return;
        }

        if (!token) {
            setStatus({
                message: "Authentication error. Please log in again.",
                type: "error",
            });
            return;
        }

        setLoading(true);
        setStatus({ message: "Changing password...", type: "" });

        try {
            const response = await axiosClient.put(
                "/change-password",
                {
                    currentPassword,
                    newPassword,
                    newPassword_confirmation: confirmPassword,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setStatus({
                message:
                    response.data?.message || "Password changed successfully!",
                type: "success",
            });

            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (err) {
            let message = "Failed to change password. Please try again.";

            if (err?.response?.status === 422 && err?.response?.data?.errors) {
                const errors = err.response.data.errors;
                const firstKey = Object.keys(errors)[0];
                message = errors[firstKey][0];
            } else if (err?.response?.data?.message) {
                message = err.response.data.message;
            }

            setStatus({ message, type: "error" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <SettingsCard
            title="Change Password"
            description="Choose a strong password and don't reuse it for other accounts."
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Current Password */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Current Password
                    </label>

                    <div className="relative">
                        <input
                            type={showCurrent ? "text" : "password"}
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 pr-10 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            required
                            disabled={loading}
                        />

                        <button
                            type="button"
                            onClick={() => setShowCurrent(!showCurrent)}
                            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                            tabIndex={-1}
                        >
                            {showCurrent ? <FiEyeOff /> : <FiEye />}
                        </button>
                    </div>
                </div>

                {/* New Password */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        New Password
                    </label>

                    <div className="relative">
                        <input
                            type={showNew ? "text" : "password"}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 pr-10 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            required
                            disabled={loading}
                        />

                        <button
                            type="button"
                            onClick={() => setShowNew(!showNew)}
                            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                            tabIndex={-1}
                        >
                            {showNew ? <FiEyeOff /> : <FiEye />}
                        </button>
                    </div>
                </div>

                {/* Confirm New Password */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Confirm New Password
                    </label>

                    <div className="relative">
                        <input
                            type={showConfirm ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 pr-10 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            required
                            disabled={loading}
                        />

                        <button
                            type="button"
                            onClick={() => setShowConfirm(!showConfirm)}
                            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                            tabIndex={-1}
                        >
                            {showConfirm ? <FiEyeOff /> : <FiEye />}
                        </button>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <button
                        type="submit"
                        className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:bg-indigo-300"
                        disabled={loading}
                    >
                        {loading ? "Changing..." : "Change Password"}
                    </button>

                    {status.message && (
                        <p
                            className={`text-sm ${
                                status.type === "error"
                                    ? "text-red-600"
                                    : "text-green-600"
                            }`}
                        >
                            {status.message}
                        </p>
                    )}
                </div>
            </form>
        </SettingsCard>
    );
};

export default PasswordSettings;
