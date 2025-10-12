// src/routes/PrivateRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = () => {
    const { token, loading } = useAuth();

    if (loading) return null;

    // redirect guest user attempt to login page

    return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
