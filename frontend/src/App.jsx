import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { FloatButton } from "antd";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WelcomePage from "./pages/WelcomePage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import Dashboard from "./pages/Dashboard";
import EditPost from "./pages/EditPost";
import NotFoundPage from "./pages/NotFoundPage";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import GuestRoute from "./routes/GuestRoute";
import PrivateRoute from "./routes/PrivateRoute";
import UserPosts from "./pages/UserPosts";
import DashboardLayout from "./components/DashboardLayout";
import SettingsPage from "./pages/SettingsPage";

const App = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <DashboardLayout>
                    <ScrollToTop />
                    <Routes>
                        <Route path="/" element={<WelcomePage />} />

                        {/* Guest user routes */}

                        <Route element={<GuestRoute />}>
                            <Route path="/register" element={<Register />} />
                            <Route path="/login" element={<Login />} />
                            <Route
                                path="/forgot-login/password"
                                element={<ForgotPassword />}
                            />
                            <Route
                                path="/reset-password"
                                element={<ResetPassword />}
                            />
                        </Route>

                        {/* Authenticated users routes */}

                        <Route element={<PrivateRoute />}>
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route
                                path="/edit/post/:postId"
                                element={<EditPost />}
                            />
                            <Route
                                path="/user/:userId/posts"
                                element={<UserPosts />}
                            />
                            <Route
                                path="/settings"
                                element={<SettingsPage />}
                            />
                        </Route>

                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                    <Footer />
                    <FloatButton.BackTop />
                </DashboardLayout>
            </AuthProvider>
        </BrowserRouter>
    );
};

export default App;
