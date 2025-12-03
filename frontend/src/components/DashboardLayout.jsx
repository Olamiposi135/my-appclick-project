// DashboardLayout.jsx
import React, { useEffect, useState } from "react";
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
import { Button, Layout, Menu, Drawer, theme } from "antd";
import { FaRegBookmark } from "react-icons/fa6";
import { MdOutlinePostAdd } from "react-icons/md";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const { Header, Sider, Content } = Layout;

const DashboardLayout = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const { user, token, logout } = useAuth();

    // update isMobile on resize
    useEffect(() => {
        const mql = window.matchMedia("(max-width: 767px)");

        const handleChange = (e) => setIsMobile(e.matches);

        // listen to media query changes
        if (mql.addEventListener) mql.addEventListener("change", handleChange);
        else mql.addListener(handleChange); // fallback

        // cleanup
        return () => {
            if (mql.removeEventListener)
                mql.removeEventListener("change", handleChange);
            else mql.removeListener(handleChange);
        };
    }, []);

    // Build menu items based on auth
    let menuItems = [];

    if (user || token) {
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

    const handleMenuClick = ({ key }) => {
        if (key === "8") {
            logout();
        }

        // close mobile drawer after click
        if (isMobile) setDrawerOpen(false);
    };

    const renderMenu = () => (
        <Menu
            onClick={handleMenuClick}
            theme="dark"
            mode="inline"
            items={menuItems}
        />
    );

    // header style: fixed only for mobile so button stays sticky
    const headerStyle = isMobile
        ? {
              background: "#001529",
              height: 64,
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              zIndex: 1000,
              display: "flex",
              alignItems: "center",
              padding: "0 12px",
          }
        : {
              background: colorBgContainer,
              padding: 0,
          };

    return (
        <Layout style={{ minHeight: "100vh" }}>
            {/* Desktop Sider (visible on non-mobile) */}
            {!isMobile && (
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                    width={200}
                    style={{
                        position: "fixed",
                        height: "100vh",
                        left: 0,
                        top: 0,
                        bottom: 0,
                        zIndex: 999,
                    }}
                >
                    <div style={{ height: 44 }} />{" "}
                    {/* spacer for the header inside sider if needed */}
                    {/* collapse button inside sider header area */}
                    <div style={{ padding: "8px 16px" }}>
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
                            style={{ fontSize: 20, color: "white" }}
                        />
                    </div>
                    {renderMenu()}
                </Sider>
            )}

            {/* Mobile Drawer (visible on mobile) */}
            {isMobile && (
                <Drawer
                    title="Menu"
                    placement="left"
                    closable
                    onClose={() => setDrawerOpen(false)}
                    open={drawerOpen}
                    bodyStyle={{ padding: 0 }}
                >
                    {renderMenu()}
                </Drawer>
            )}

            {/* Top header - fixed only on mobile so button sticks */}
            <Layout
                style={{ marginLeft: !isMobile ? (collapsed ? 80 : 200) : 0 }}
            >
                <Header style={headerStyle}>
                    {/* Mobile sticky menu button */}
                    {isMobile && (
                        <Button
                            type="primary"
                            icon={<MenuUnfoldOutlined />}
                            onClick={() => setDrawerOpen(true)}
                            style={{ marginRight: 12 }}
                        />
                    )}

                    {/* Optionally show a page title or other header content */}
                    {!isMobile && (
                        <div style={{ paddingLeft: 12, fontWeight: 600 }}>
                            {/* you can replace with breadcrumb / title */}
                        </div>
                    )}
                </Header>

                <Content
                    style={{
                        marginTop: isMobile ? 64 : 0, // push below fixed mobile header
                        padding: "24px",
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
