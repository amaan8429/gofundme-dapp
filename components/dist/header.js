"use client";
"use strict";
exports.__esModule = true;
var link_1 = require("next/link");
var mode_toggle_1 = require("./mode-toggle");
var wallet_1 = require("./wallet");
var Header = function () {
    return (React.createElement("header", { className: "w-full h-[70px] flex justify-between items-center px-4 md:px-6 bg-background" },
        React.createElement(HeaderLogo, null),
        React.createElement(HeaderNav, null),
        React.createElement(HeaderRight, null)));
};
var HeaderLogo = function () {
    return (React.createElement(link_1["default"], { href: "/", className: "flex items-center space-x-2" },
        React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "h-6 w-6" },
            React.createElement("circle", { cx: "12", cy: "12", r: "10" }),
            React.createElement("line", { x1: "2", y1: "12", x2: "22", y2: "12" }),
            React.createElement("path", { d: "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" })),
        React.createElement("span", { className: "font-bold text-xl" }, "Logo")));
};
var HeaderNav = function () {
    return (React.createElement("nav", { className: "hidden md:flex space-x-4" },
        React.createElement(link_1["default"], { href: "/campaign", className: "text-sm font-medium hover:underline" }, "Campaign"),
        React.createElement(link_1["default"], { href: "/create-campaign", className: "text-sm font-medium hover:underline" }, "Create Campaign"),
        React.createElement(link_1["default"], { href: "/dashboard", className: "text-sm font-medium hover:underline" }, "Dashboard")));
};
var HeaderRight = function () {
    return (React.createElement("div", { className: "flex items-center space-x-4" },
        React.createElement(wallet_1.Wallet, null),
        React.createElement(mode_toggle_1.ModeToggle, null)));
};
exports["default"] = Header;
