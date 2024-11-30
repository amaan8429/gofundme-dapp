"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.Wallet = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
var react_1 = require("react");
var ethers_1 = require("ethers");
var button_1 = require("@/components/ui/button");
var networks = {
    polygon: {
        chainId: "0x" + Number(80002).toString(16),
        chainName: "Polygon Amoy Testnet",
        nativeCurrency: {
            name: "MATIC",
            symbol: "MATIC",
            decimals: 18
        },
        rpcUrls: [""],
        blockExplorerUrls: ["https://amoy.polygonscan.com/"]
    }
};
function Wallet() {
    var _this = this;
    var _a = react_1["default"].useState(""), address = _a[0], setAddress = _a[1];
    var _b = react_1["default"].useState(null), error = _b[0], setError = _b[1];
    var connectWallet = function () { return __awaiter(_this, void 0, void 0, function () {
        var requestError_1, provider, network, switchError_1, signer, userAddress, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 12, , 13]);
                    // Detailed logging for debugging
                    console.log("Window ethereum object:", window.ethereum);
                    if (!window.ethereum) {
                        throw new Error("No Ethereum wallet detected. Please install MetaMask.");
                    }
                    // Check for specific MetaMask methods
                    if (typeof window.ethereum.request !== "function") {
                        throw new Error("Ethereum provider does not have a request method. Ensure MetaMask is properly installed and updated.");
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, window.ethereum.request({
                            method: "eth_requestAccounts"
                        })];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    requestError_1 = _a.sent();
                    console.error("Account request error:", requestError_1);
                    throw new Error("Failed to request accounts: " + (requestError_1 instanceof Error
                        ? requestError_1.message
                        : "Unknown error"));
                case 4:
                    provider = void 0;
                    try {
                        provider = new ethers_1.ethers.BrowserProvider(window.ethereum);
                    }
                    catch (providerError) {
                        console.error("Provider creation error:", providerError);
                        throw new Error("Failed to create provider: " + (providerError instanceof Error
                            ? providerError.message
                            : "Unknown error"));
                    }
                    return [4 /*yield*/, provider.getNetwork()];
                case 5:
                    network = _a.sent();
                    console.log("Current Network:", network);
                    if (!(Number(network.chainId) !== parseInt(networks.polygon.chainId, 16))) return [3 /*break*/, 9];
                    _a.label = 6;
                case 6:
                    _a.trys.push([6, 8, , 9]);
                    return [4 /*yield*/, window.ethereum.request({
                            method: "wallet_addEthereumChain",
                            params: [networks.polygon]
                        })];
                case 7:
                    _a.sent();
                    return [3 /*break*/, 9];
                case 8:
                    switchError_1 = _a.sent();
                    console.error("Network switch error:", switchError_1);
                    throw new Error("Failed to switch network: " + (switchError_1 instanceof Error
                        ? switchError_1.message
                        : "Unknown error"));
                case 9: return [4 /*yield*/, provider.getSigner()];
                case 10:
                    signer = _a.sent();
                    return [4 /*yield*/, signer.getAddress()];
                case 11:
                    userAddress = _a.sent();
                    setAddress(userAddress);
                    setError(null);
                    return [3 /*break*/, 13];
                case 12:
                    error_1 = _a.sent();
                    console.error("Full Wallet Connection Error:", error_1);
                    setError(error_1 instanceof Error
                        ? error_1.message
                        : "An unexpected error occurred while connecting wallet");
                    return [3 /*break*/, 13];
                case 13: return [2 /*return*/];
            }
        });
    }); };
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement(button_1.Button, { onClick: connectWallet }, address
            ? "Connected (" + address.slice(0, 6) + "..." + address.slice(-4) + ")"
            : "Connect Wallet"),
        error && react_1["default"].createElement("p", { style: { color: "red" } }, error)));
}
exports.Wallet = Wallet;
