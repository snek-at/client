"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _general = __importStar(require("./general"));
var _jwtAuth = __importStar(require("../mutations/jwtAuth"));
var _user = __importStar(require("./user"));
var SnekGqlQuery = (function () {
    function SnekGqlQuery() {
        this.general = _general;
        this.jwtAuth = _jwtAuth;
        this.user = _user;
    }
    return SnekGqlQuery;
}());
exports.SnekGqlQuery = SnekGqlQuery;
