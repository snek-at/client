"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./queries/index");
var index_2 = require("./mutations/index");
var SnekGql = (function () {
    function SnekGql() {
        this.queries = new index_1.SnekGqlQuery();
        this.mutations = new index_2.SnekGqlMutation();
    }
    return SnekGql;
}());
exports.SnekGql = SnekGql;
