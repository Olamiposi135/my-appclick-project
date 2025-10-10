import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { FloatButton } from "antd";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WelcomePage from "./pages/WelcomePage";
import Register from "./pages/Register";
import Login from "./pages/Login";

const App = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
            </Routes>
            <Footer />
            <FloatButton.BackTop />
        </BrowserRouter>
    );
};

export default App;
