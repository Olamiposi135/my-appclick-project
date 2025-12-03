import React, { useState } from "react";
import SettingsCard from "./SettingsCard";

const PrivacySettings = ({ user }) => {
    const [isProfilePublic, setIsProfilePublic] = useState(
        user.isPublic || false
    );
    const [status, setStatus] = useState("");

    const handleSave = async () => {
        setStatus("Saving...");
        try {
            console.log("Updating privacy settings:", { isProfilePublic });
            // const response = await fetch('/api/user/privacy', { method: 'PATCH', ... });
            setStatus("Privacy settings saved!");
        } catch (error) {
            setStatus("Failed to save settings.");
        }
    };

    return (
        <SettingsCard
            title="Privacy"
            description="Control how your information is displayed to others."
        >
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h4 className="font-medium text-gray-900">
                            Public Profile
                        </h4>
                        <p className="text-sm text-gray-500">
                            Allow others to see your profile and posts.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={() => setIsProfilePublic(!isProfilePublic)}
                        className={`${
                            isProfilePublic ? "bg-indigo-600" : "bg-gray-200"
                        } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                    >
                        <span
                            className={`${
                                isProfilePublic
                                    ? "translate-x-6"
                                    : "translate-x-1"
                            } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                        />
                    </button>
                </div>
                <div className="flex items-center justify-between pt-4 border-t">
                    <button
                        onClick={handleSave}
                        className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
                    >
                        Save Privacy Settings
                    </button>
                    {status && (
                        <p className="text-sm text-gray-600">{status}</p>
                    )}
                </div>
            </div>
        </SettingsCard>
    );
};

export default PrivacySettings;
