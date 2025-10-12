// src/routes/GuestRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const GuestRoute = ({ children }) => {
    const { token, loading } = useAuth();

    // Avoid redirect flash while verifying token
    if (loading) return null;

    return token ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export default GuestRoute;
