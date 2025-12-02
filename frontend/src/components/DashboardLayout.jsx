// DashboardLayout.jsx
import React, { useState } from "react";
import {
    BellOutlined,
    HomeFilled,
    HomeOutlined,
    LoginOutlined,
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    ReadOutlined,
    SettingFilled,
    UserOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { FaRegBookmark } from "react-icons/fa6";
import { MdOutlinePostAdd } from "react-icons/md";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const { Header, Sider, Content } = Layout;

const DashboardLayout = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    // import auth from context folder
    const { user, token, logout } = useAuth();

    let menuItems = [];

    if (user || token) {
        // Logged in menu
        menuItems = [
            {
                key: "1",
                icon: <HomeOutlined />,
                label: <Link to="/dashboard">Dashboard</Link>,
            },
            {
                key: "2",
                icon: <UserOutlined />,
                label: <Link to="/profile">Profile</Link>,
            },
            {
                key: "3",
                icon: <MdOutlinePostAdd />,
                label: <Link to="/post">Post</Link>,
            },
            {
                key: "4",
                icon: <ReadOutlined />,
                label: <Link to="/feeds">Feeds</Link>,
            },
            {
                key: "5",
                icon: <FaRegBookmark />,
                label: <Link to="/bookmarks">Bookmarks</Link>,
            },
            {
                key: "6",
                icon: <BellOutlined />,
                label: <Link to="/notifications">Notifications</Link>,
            },
            {
                key: "7",
                icon: <SettingFilled />,
                label: <Link to="/settings">Settings</Link>,
            },
            { key: "8", icon: <LogoutOutlined />, label: "Logout" },
        ];
    } else {
        // Logged out menu
        menuItems = [
            {
                key: "9",
                icon: <HomeFilled />,
                label: <Link to="/">Welcome</Link>,
            },
            {
                key: "10",
                icon: <LoginOutlined />,
                label: <Link to="/login">Login</Link>,
            },
            {
                key: "11",
                icon: <UserOutlined />,
                label: <Link to="/register">Sign Up</Link>,
            },
        ];
    }

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                style={{
                    position: "fixed",
                    height: "100vh",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    zIndex: 999,
                }}
            >
                <div className="demo-logo-vertical" />

                <Header style={{ padding: 0 }}>
                    <Button
                        type="text"
                        icon={
                            collapsed ? (
                                <MenuUnfoldOutlined />
                            ) : (
                                <MenuFoldOutlined />
                            )
                        }
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: 24,
                            width: 64,
                            height: 64,
                            color: "white",
                        }}
                    />
                </Header>
                <Menu
                    onClick={({ key }) => {
                        if (key === "8") {
                            logout();
                        }
                    }}
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={["1"]}
                    items={menuItems}
                />
            </Sider>

            <Layout>
                <Content
                    style={{
                        marginLeft: " 3.5rem",

                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};

export default DashboardLayout;
