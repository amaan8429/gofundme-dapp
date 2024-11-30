"use client";
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var input_1 = require("@/components/ui/input");
var textarea_1 = require("@/components/ui/textarea");
var label_1 = require("@/components/ui/label");
var select_1 = require("@/components/ui/select");
var lucide_react_1 = require("lucide-react");
var CampaignFactory_json_1 = require("@/artifacts/contracts/CampaignFactory.sol/CampaignFactory.json");
var NEXT_PUBLIC_ADDRESS = "0xfCB489834BB5cd0ac71e3312B37aAa8dF63eDddB";
function CreateCampaignPage() {
    var _this = this;
    var router = navigation_1.useRouter();
    var _a = react_1.useState({
        campaignTitle: "",
        story: "",
        requiredAmount: "",
        category: "education"
    }), form = _a[0], setForm = _a[1];
    var _b = react_1.useState(false), loading = _b[0], setLoading = _b[1];
    var _c = react_1.useState(""), address = _c[0], setAddress = _c[1];
    var formHandler = function (e) {
        if (typeof e === "string") {
            // This is for the Select component
            setForm(function (prev) { return (__assign(__assign({}, prev), { category: e })); });
        }
        else {
            var _a = e.target, name_1 = _a.name, value_1 = _a.value;
            setForm(function (prev) {
                var _a;
                return (__assign(__assign({}, prev), (_a = {}, _a[name_1] = value_1, _a)));
            });
        }
    };
    var startCampaign = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var provider, signer, contract, campaignAmount, campaignData, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    if (form.campaignTitle === "") {
                        react_hot_toast_1.toast.error("Title field is empty");
                        return [2 /*return*/];
                    }
                    if (form.story === "") {
                        react_hot_toast_1.toast.error("Story field is empty");
                        return [2 /*return*/];
                    }
                    if (form.requiredAmount === "") {
                        react_hot_toast_1.toast.error("Required amount field is empty");
                        return [2 /*return*/];
                    }
                    setLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, 7, 8]);
                    provider = new ethers_1.ethers.BrowserProvider(window.ethereum);
                    return [4 /*yield*/, provider.getSigner()];
                case 2:
                    signer = _a.sent();
                    contract = new ethers_1.ethers.Contract(NEXT_PUBLIC_ADDRESS, CampaignFactory_json_1["default"].abi, signer);
                    console.log(contract);
                    return [4 /*yield*/, ethers_1.ethers.parseEther(form.requiredAmount)];
                case 3:
                    campaignAmount = _a.sent();
                    return [4 /*yield*/, contract.createCampaign(form.campaignTitle, campaignAmount, form.category, form.story)];
                case 4:
                    campaignData = _a.sent();
                    return [4 /*yield*/, campaignData.wait()];
                case 5:
                    _a.sent();
                    setAddress(campaignData.to);
                    react_hot_toast_1.toast.success("Campaign started successfully!");
                    router.push("/campaign/" + campaignData.to);
                    return [3 /*break*/, 8];
                case 6:
                    error_1 = _a.sent();
                    console.error(error_1);
                    react_hot_toast_1.toast.error("Failed to start campaign");
                    return [3 /*break*/, 8];
                case 7:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 8: return [2 /*return*/];
            }
        });
    }); };
    if (loading) {
        return (React.createElement("div", { className: "flex items-center justify-center min-h-screen" },
            React.createElement(lucide_react_1.Loader2, { className: "h-16 w-16 animate-spin" })));
    }
    if (address) {
        return (React.createElement("div", { className: "flex flex-col items-center justify-center min-h-screen space-y-4" },
            React.createElement("h1", { className: "text-2xl font-bold" }, "Campaign Started Successfully!"),
            React.createElement("p", { className: "text-muted-foreground" }, address),
            React.createElement(button_1.Button, { onClick: function () { return router.push("/campaign/" + address); } }, "Go To Campaign")));
    }
    return (React.createElement("div", { className: "container mx-auto py-8" },
        React.createElement("h1", { className: "text-3xl font-bold mb-8" }, "Create a New Campaign"),
        React.createElement("form", { onSubmit: startCampaign, className: "space-y-6 max-w-2xl mx-auto" },
            React.createElement("div", { className: "space-y-2" },
                React.createElement(label_1.Label, { htmlFor: "campaignTitle" }, "Campaign Title"),
                React.createElement(input_1.Input, { id: "campaignTitle", name: "campaignTitle", value: form.campaignTitle, onChange: formHandler, placeholder: "Enter campaign title" })),
            React.createElement("div", { className: "space-y-2" },
                React.createElement(label_1.Label, { htmlFor: "story" }, "Story"),
                React.createElement(textarea_1.Textarea, { id: "story", name: "story", value: form.story, onChange: formHandler, placeholder: "Describe your story", className: "min-h-[160px]" })),
            React.createElement("div", { className: "space-y-2" },
                React.createElement(label_1.Label, { htmlFor: "requiredAmount" }, "Required Amount"),
                React.createElement(input_1.Input, { id: "requiredAmount", name: "requiredAmount", type: "number", value: form.requiredAmount, onChange: formHandler, placeholder: "Enter required amount" })),
            React.createElement("div", { className: "space-y-2" },
                React.createElement(label_1.Label, { htmlFor: "category" }, "Category"),
                React.createElement(select_1.Select, { name: "category", value: form.category, onValueChange: formHandler },
                    React.createElement(select_1.SelectTrigger, null,
                        React.createElement(select_1.SelectValue, { placeholder: "Select a category" })),
                    React.createElement(select_1.SelectContent, null,
                        React.createElement(select_1.SelectItem, { value: "education" }, "Education"),
                        React.createElement(select_1.SelectItem, { value: "health" }, "Health"),
                        React.createElement(select_1.SelectItem, { value: "animal" }, "Animal")))),
            React.createElement(button_1.Button, { type: "submit", className: "w-full" }, "Start Campaign"))));
}
exports["default"] = CreateCampaignPage;
