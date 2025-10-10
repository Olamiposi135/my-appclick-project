import React from "react";
import { FcSms } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";
import { FaFacebookMessenger } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="bg-indigo-900 dark:bg-gray-950 text-white dark:text-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-xl font-semibold mb-4">
                            {" "}
                            OLA Blogging Platform
                        </h3>
                        <p className="text-gray-300 dark:text-gray-400 text-sm leading-relaxed mb-4">
                            This is a Good blog platform to share your
                            experiences and feedbacks about government grants
                            and schemes. Join our community to stay informed and
                            empowered.
                        </p>
                        <div className="flex items-center space-x-4">
                            <a
                                href="#"
                                className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-indigo-400 transition-colors"
                            >
                                <FaFacebookMessenger className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-indigo-400 hover:-translate-y-1 duration-300 ease-in-out transition-all w-6 h-6" />
                            </a>
                            <a
                                href="#"
                                className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-indigo-400 transition-colors"
                            >
                                <FaFacebook className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-indigo-400 hover:-translate-y-1 duration-300 ease-in-out transition-all w-6 h-6" />
                            </a>
                            <a
                                href="#"
                                className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-indigo-400 transition-colors"
                            >
                                <FcSms className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-indigo-400 hover:-translate-y-1 duration-300 ease-in-out transition-all w-6 h-6" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-md font-semibold mb-4">
                            Quick Links
                        </h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link
                                    to="/grants/list"
                                    className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-indigo-400 transition-colors"
                                >
                                    Grant Search
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to={"/track-application"}
                                    className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-indigo-400 transition-colors"
                                >
                                    Application Status
                                </Link>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-indigo-400 transition-colors"
                                >
                                    Individual Resources
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-indigo-400 transition-colors"
                                >
                                    FAQ
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-md font-semibold mb-4">Support</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link
                                    to={"/contact"}
                                    className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-indigo-400 transition-colors"
                                >
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to={"/contact"}
                                    className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-indigo-400 transition-colors"
                                >
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-indigo-400 transition-colors"
                                >
                                    Live Chat
                                </a>
                            </li>
                            <li>
                                <Link
                                    to={"/learn-more"}
                                    className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-indigo-400 transition-colors"
                                >
                                    Application Guide
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-indigo-800 dark:border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-300 dark:text-gray-400 text-sm">
                        © {currentYear} Government Grant for Individual
                        Solutions. All rights reserved.
                    </p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a
                            href="#"
                            className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-indigo-400 text-sm transition-colors"
                        >
                            Privacy Policy
                        </a>
                        <a
                            href="#"
                            className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-indigo-400 text-sm transition-colors"
                        >
                            Terms of Service
                        </a>
                        <a
                            href="#"
                            className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-indigo-400 text-sm transition-colors"
                        >
                            Accessibility
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
