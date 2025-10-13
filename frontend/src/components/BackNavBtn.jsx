import React from "react";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

const BackButton = ({ label = "Go Back", className = "" }) => {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate(-1)}
            className={`flex items-center gap-2 bg-neutral-700 hover:bg-neutral-600 text-white px-4 py-2 rounded-2xl transition-all text-sm duration-200 ${className}`}
        >
            <IoMdArrowRoundBack size={18} />
            <span>{label}</span>
        </button>
    );
};

export default BackButton;
