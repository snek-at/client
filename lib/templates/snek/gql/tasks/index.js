"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var auth_1 = require("./auth");
var SnekTasks = (function () {
    function SnekTasks(session) {
        this.auth = new auth_1.SnekGqlAuthTasks(session);
    }
    return SnekTasks;
}());
exports.SnekTasks = SnekTasks;
