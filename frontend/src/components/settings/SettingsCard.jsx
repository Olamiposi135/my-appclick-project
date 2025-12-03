import React from "react";

const SettingsCard = ({ title, description, children }) => {
    return (
        <section className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="p-6 border-b">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                    {title}
                </h3>
                {description && (
                    <p className="mt-1 text-sm text-gray-500">{description}</p>
                )}
            </div>
            <div className="p-6">{children}</div>
        </section>
    );
};

export default SettingsCard;
