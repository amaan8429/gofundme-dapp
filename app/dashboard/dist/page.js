"use client";
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
var react_1 = require("react");
var navigation_1 = require("next/navigation");
var ethers_1 = require("ethers");
var react_hot_toast_1 = require("react-hot-toast");
var button_1 = require("@/components/ui/button");
var card_1 = require("@/components/ui/card");
var progress_1 = require("@/components/ui/progress");
var lucide_react_1 = require("lucide-react");
var CampaignFactory_json_1 = require("@/artifacts/contracts/CampaignFactory.sol/CampaignFactory.json");
var Campaign_json_1 = require("@/artifacts/contracts/CampaignFactory.sol/Campaign.json");
function DashboardPage() {
    var _this = this;
    var router = navigation_1.useRouter();
    var _a = react_1.useState([]), campaigns = _a[0], setCampaigns = _a[1];
    var _b = react_1.useState(true), loading = _b[0], setLoading = _b[1];
    react_1.useEffect(function () {
        fetchCampaigns();
    }, []);
    var fetchCampaigns = function () { return __awaiter(_this, void 0, void 0, function () {
        var provider_1, factoryContract, campaignAddresses, campaignDetails, error_1;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, 4, 5]);
                    provider_1 = new ethers_1.ethers.BrowserProvider(window.ethereum);
                    factoryContract = new ethers_1.ethers.Contract(process.env.NEXT_PUBLIC_ADDRESS, CampaignFactory_json_1["default"].abi, provider_1);
                    return [4 /*yield*/, factoryContract.getDeployedCampaigns()];
                case 1:
                    campaignAddresses = _a.sent();
                    return [4 /*yield*/, Promise.all(campaignAddresses.map(function (address) { return __awaiter(_this, void 0, void 0, function () {
                            var campaign, details, target, amountCollected;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        campaign = new ethers_1.ethers.Contract(address, Campaign_json_1["default"].abi, provider_1);
                                        return [4 /*yield*/, campaign.getCampaign()];
                                    case 1:
                                        details = _a.sent();
                                        target = details[3] ? Number(details[3]) : 0;
                                        amountCollected = details[5] ? Number(details[5]) : 0;
                                        return [2 /*return*/, {
                                                address: address,
                                                title: details[1] || "No Title",
                                                description: details[2] || "No Description",
                                                target: target,
                                                deadline: details[4] || 0,
                                                amountCollected: amountCollected,
                                                category: details[6] || "Uncategorized"
                                            }];
                                }
                            });
                        }); }))];
                case 2:
                    campaignDetails = _a.sent();
                    setCampaigns(campaignDetails);
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    console.error("Failed to fetch campaigns:", error_1);
                    react_hot_toast_1.toast.error("Failed to load campaigns");
                    return [3 /*break*/, 5];
                case 4:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    if (loading) {
        return (React.createElement("div", { className: "flex items-center justify-center min-h-screen" },
            React.createElement(lucide_react_1.Loader2, { className: "h-16 w-16 animate-spin" })));
    }
    return (React.createElement("div", { className: "container mx-auto py-8" },
        React.createElement("h1", { className: "text-3xl font-bold mb-8" }, "All Campaigns"),
        React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" }, campaigns.map(function (campaign) { return (React.createElement(card_1.Card, { key: campaign.address, className: "flex flex-col" },
            React.createElement(card_1.CardHeader, null,
                React.createElement(card_1.CardTitle, null, campaign.title),
                React.createElement(card_1.CardDescription, null,
                    "Category: ",
                    campaign.category)),
            React.createElement(card_1.CardContent, { className: "flex-grow" },
                React.createElement("p", { className: "text-sm text-muted-foreground mb-4" },
                    campaign.description.slice(0, 100),
                    "..."),
                React.createElement("div", null,
                    React.createElement(progress_1.Progress, { value: campaign.target !== 0
                            ? (Number(campaign.amountCollected) * 100) /
                                Number(campaign.target)
                            : 0 // Avoid division by zero if target is 0
                        , className: "w-full" }),
                    React.createElement("p", { className: "text-sm text-muted-foreground mt-2" },
                        ethers_1.ethers.formatEther(campaign.amountCollected),
                        " ETH raised of",
                        " ",
                        ethers_1.ethers.formatEther(campaign.target),
                        " ETH"))),
            React.createElement(card_1.CardFooter, null,
                React.createElement(button_1.Button, { className: "w-full", onClick: function () { return router.push("/campaign/" + campaign.address); } }, "View Campaign")))); })),
        campaigns.length === 0 && (React.createElement("p", { className: "text-center text-muted-foreground" }, "No campaigns found."))));
}
exports["default"] = DashboardPage;
