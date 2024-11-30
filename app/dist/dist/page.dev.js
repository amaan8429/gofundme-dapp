"use strict";

exports.__esModule = true;

var react_1 = require("react");

var button_1 = require("@/components/ui/button");

var lucide_react_1 = require("lucide-react");

var HomePage = function HomePage() {
  return react_1["default"].createElement("div", {
    className: "min-h-screen bg-gradient-to-br from-blue-50 to-white"
  }, react_1["default"].createElement("div", {
    className: "container mx-auto px-4 py-16"
  }, react_1["default"].createElement("div", {
    className: "max-w-4xl mx-auto text-center"
  }, react_1["default"].createElement("h1", {
    className: "text-5xl font-bold text-gray-800 mb-6 leading-tight"
  }, "Empower Change, One Contribution at a Time"), react_1["default"].createElement("p", {
    className: "text-xl text-gray-600 mb-10 max-w-2xl mx-auto"
  }, "Welcome to our Decentralized Fundraising Platform. Discover meaningful campaigns and make a difference directly through blockchain technology."), react_1["default"].createElement("div", {
    className: "flex justify-center space-x-4 mb-16"
  }, react_1["default"].createElement(button_1.Button, {
    variant: "default",
    size: "lg",
    className: "flex items-center space-x-2"
  }, react_1["default"].createElement(lucide_react_1.Heart, {
    className: "w-5 h-5"
  }), react_1["default"].createElement("span", null, "Explore Campaigns")), react_1["default"].createElement(button_1.Button, {
    variant: "outline",
    size: "lg",
    className: "flex items-center space-x-2"
  }, react_1["default"].createElement(lucide_react_1.DollarSign, {
    className: "w-5 h-5"
  }), react_1["default"].createElement("span", null, "Start a Campaign"))), react_1["default"].createElement("div", {
    className: "grid md:grid-cols-3 gap-8"
  }, react_1["default"].createElement("div", {
    className: "bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all"
  }, react_1["default"].createElement(lucide_react_1.Globe, {
    className: "w-12 h-12 text-blue-500 mx-auto mb-4"
  }), react_1["default"].createElement("h3", {
    className: "text-xl font-semibold mb-3 text-gray-800"
  }, "Global Reach"), react_1["default"].createElement("p", {
    className: "text-gray-600"
  }, "Connect with causes worldwide, breaking geographical barriers.")), react_1["default"].createElement("div", {
    className: "bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all"
  }, react_1["default"].createElement(lucide_react_1.DollarSign, {
    className: "w-12 h-12 text-green-500 mx-auto mb-4"
  }), react_1["default"].createElement("h3", {
    className: "text-xl font-semibold mb-3 text-gray-800"
  }, "Transparent Funding"), react_1["default"].createElement("p", {
    className: "text-gray-600"
  }, "Every transaction is recorded on the blockchain, ensuring complete transparency.")), react_1["default"].createElement("div", {
    className: "bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all"
  }, react_1["default"].createElement(lucide_react_1.Heart, {
    className: "w-12 h-12 text-red-500 mx-auto mb-4"
  }), react_1["default"].createElement("h3", {
    className: "text-xl font-semibold mb-3 text-gray-800"
  }, "Community Impact"), react_1["default"].createElement("p", {
    className: "text-gray-600"
  }, "Directly support causes that matter most to you and your community."))))));
};

exports["default"] = HomePage;