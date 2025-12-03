import React, { useState } from "react";
import SettingsCard from "./SettingsCard";
import { useAuth } from "../../context/AuthContext";
import axiosClient from "../../api/axiosClient";

const ProfileSettings = () => {
    const { user, token } = useAuth() || {};

    const [firstName, setFirstName] = useState(user.first_name || "");
    const [lastName, setLastName] = useState(user.last_name || "");
    const [username] = useState(user.username || "");
    const [phoneNumber, setPhoneNumber] = useState(user.phone_number || "");
    const [email, setEmail] = useState(user.email || "");
    const [status, setStatus] = useState({ message: "", type: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ message: "Saving...", type: "info" });

        try {
            const response = await axiosClient.patch(
                "/user/update-profile",
                {
                    first_name: firstName,
                    last_name: lastName,
                    phone_number: phoneNumber,
                    email: email,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setStatus({
                message:
                    response.data?.message || "Profile updated successfully!",
                type: "success",
            });
        } catch (error) {
            let message = "Something went wrong. Please try again.";

            // Validation errors (422)
            if (
                error?.response?.status === 422 &&
                error?.response?.data?.errors
            ) {
                const firstKey = Object.keys(error.response.data.errors)[0];
                message = error.response.data.errors[firstKey][0];
            }
            // Other known backend message
            else if (error?.response?.data?.message) {
                message = error.response.data.message;
            }

            setStatus({ message, type: "error" });
        }
    };

    return (
        <SettingsCard
            title="Profile Information"
            description="Update your personal details."
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        First Name
                    </label>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Last Name
                    </label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Username
                    </label>
                    <input
                        type="text"
                        value={username}
                        readOnly
                        className="mt-1 text-gray-500 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Phone Number
                    </label>
                    <input
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <button
                        type="submit"
                        className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Save Changes
                    </button>
                    {status.message && (
                        <p
                            className={`text-sm ${
                                status.type === "error"
                                    ? "text-red-600"
                                    : status.type === "success"
                                    ? "text-green-600"
                                    : "text-gray-600"
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

export default ProfileSettings;
