"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./endpoints/index");
var index_2 = require("./templates/index");
var sessions_1 = require("./session/sessions");
var Client = (function () {
    function Client(ep) {
        this._headers = {};
        if (ep.type === "graphql") {
            this.headers = ep.headers;
            this.endpoint = new index_1.Apollo(ep.url, { headers: this._headers });
            this.template = new index_2.MainTemplate();
            this.session = new sessions_1.SnekSession("snek-jwt", this.endpoint, this.template);
        }
        else if (ep.type === "rest") {
        }
        else {
            throw new Error("No Endpoint Specified");
        }
    }
    Object.defineProperty(Client.prototype, "headers", {
        get: function () {
            return this._headers;
        },
        set: function (value) {
            this._headers = value;
            if (this.endpoint) {
                this.endpoint.headers = this.headers;
            }
        },
        enumerable: true,
        configurable: true
    });
    return Client;
}());
exports.Client = Client;
