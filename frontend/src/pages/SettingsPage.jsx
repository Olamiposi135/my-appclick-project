import React from "react";

import ProfileSettings from "../components/settings/ProfileSettings";
import PasswordSettings from "../components/settings/PasswordSettings";
import PrivacySettings from "../components/settings/PrivacySettings";
import { useAuth } from "../context/AuthContext";

const SettingsPage = () => {
    const { user } = useAuth() || {};

    if (!user) {
        return (
            <div className="py-20 text-center">
                Please log in to view your settings.
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-3xl mx-auto px-4 space-y-8">
                <header>
                    <h1 className="text-3xl font-extrabold text-gray-900">
                        Account Settings
                    </h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Manage your profile, password, and privacy preferences.
                    </p>
                </header>

                <main className="space-y-6">
                    <ProfileSettings user={user} />
                    <PasswordSettings />
                    <PrivacySettings user={user} />
                </main>
            </div>
        </div>
    );
};

export default SettingsPage;
