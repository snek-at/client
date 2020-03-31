"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cookie_utils_1 = require("./cookie-utils");
var Session = (function () {
    function Session(sId, ep, template) {
        this.sId = sId;
        this.ep = ep;
        this.template = template;
        this.sessions = {};
        this.token = "";
        this.tokenName = "token";
    }
    Session.prototype.addSubSession = function (childSId, type) {
        if (type === void 0) { type = Session; }
        var session;
        session = new type(this.sId + "_" + childSId, this.ep, this.template);
        this.sessions[childSId] = session;
    };
    Session.prototype.isAlive = function () {
        return cookie_utils_1.cookieChecker(this.tokenName);
    };
    return Session;
}());
exports.Session = Session;
