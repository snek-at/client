"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var cookie_utils_1 = require("./cookie-utils");
var index_2 = require("../templates/snek/gql/tasks/index");
var SnekSession = (function (_super) {
    __extends(SnekSession, _super);
    function SnekSession(sId, ep, template) {
        var _this = _super.call(this, sId, ep, template) || this;
        _this.refreshToken = "";
        _this.refreshTokenName = "refresh";
        _this.tokenName = sId + "-" + _this.tokenName;
        _this.refreshTokenName = sId + "-" + _this.refreshTokenName;
        _this.sessionTemplate = template.snek;
        _this.tasks = new index_2.SnekTasks(_this);
        return _this;
    }
    SnekSession.prototype.initTokens = function (auth) {
        console.log(auth);
        this.token = auth.token;
        this.refreshToken = auth.refreshToken;
        cookie_utils_1.setCookie(this.tokenName, this.token, 5 * 60);
        cookie_utils_1.setCookie(this.refreshTokenName, this.refreshToken, 7 * 24 * 60 * 60);
    };
    SnekSession.prototype.wasAlive = function () {
        return cookie_utils_1.cookieChecker(this.refreshTokenName);
    };
    SnekSession.prototype.begin = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(!user && this.wasAlive())) return [3, 1];
                        return [3, 6];
                    case 1:
                        if (!!user) return [3, 3];
                        return [4, this.tasks.auth.anon()];
                    case 2:
                        response = _a.sent();
                        return [3, 5];
                    case 3:
                        console.log("before ");
                        return [4, this.tasks.auth.nonanon(user)];
                    case 4:
                        response = _a.sent();
                        _a.label = 5;
                    case 5:
                        console.log(response, response.data.auth);
                        this.initTokens(response.data.auth);
                        return [2, response.data.auth.user];
                    case 6: return [4, this.tasks.auth.whoami()];
                    case 7:
                        response = _a.sent();
                        return [4, response.data.whoami];
                    case 8: return [2, _a.sent()];
                }
            });
        });
    };
    SnekSession.prototype.refresh = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.isAlive()) return [3, 2];
                        this.refreshToken = cookie_utils_1.getCookie(this.refreshTokenName);
                        return [4, this.tasks.auth.refresh()];
                    case 1:
                        response = _a.sent();
                        this.initTokens(response.data.refresh);
                        _a.label = 2;
                    case 2: return [2];
                }
            });
        });
    };
    SnekSession.prototype.end = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.tasks.auth.revoke()];
                    case 1:
                        response = _a.sent();
                        console.log(response.data.revoke.revoked);
                        this.token = "";
                        this.refreshToken = "";
                        cookie_utils_1.deleteCookie(this.tokenName);
                        cookie_utils_1.deleteCookie("refresh-" + this.refreshToken);
                        return [2];
                }
            });
        });
    };
    return SnekSession;
}(index_1.Session));
exports.SnekSession = SnekSession;
