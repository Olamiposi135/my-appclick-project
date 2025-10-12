import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("access_token"));
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const verifyToken = async () => {
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const res = await axiosClient.get("/user", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(res.data);
                localStorage.setItem("user", JSON.stringify(res.data));
            } catch (error) {
                console.warn("Invalid or expired token. Logging out...");
                handleLogout(false); // don’t navigate again on auto-logout
            } finally {
                setLoading(false);
            }
        };

        verifyToken();
    }, [token]);

    const handleLogin = (newToken, newUser) => {
        setToken(newToken);
        setUser(newUser);
        localStorage.setItem("access_token", newToken);
        localStorage.setItem("user", JSON.stringify(newUser));
        navigate("/dashboard");
    };

    const handleLogout = async (redirect = true) => {
        try {
            if (token) {
                await axiosClient.post(
                    "/logout",
                    {},
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            }
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            setToken(null);
            setUser(null);
            localStorage.removeItem("access_token");
            localStorage.removeItem("user");
            if (redirect) navigate("/login");
        }
    };

    const value = {
        user,
        token,
        login: handleLogin,
        logout: handleLogout,
        loading,
    };

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center text-gray-400">
                Checking authentication...
            </div>
        );
    }

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
