"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_tag_1 = __importDefault(require("graphql-tag"));
var whoami = graphql_tag_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  query whoami($token: String!) {\n    whoami: me(token: $token) {\n      firstName\n      lastName\n      email\n      dateJoined\n      lastLogin\n    }\n  }\n"], ["\n  query whoami($token: String!) {\n    whoami: me(token: $token) {\n      firstName\n      lastName\n      email\n      dateJoined\n      lastLogin\n    }\n  }\n"])));
exports.whoami = whoami;
var profile = graphql_tag_1.default(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  query profile($url: String!, $token: String!) {\n    profile: page(url: $url, token: $token) {\n      ... on ProfileProfilePage {\n        username\n        verified\n        platformData\n        sources\n        bids\n        tids\n      }\n    }\n  }\n"], ["\n  query profile($url: String!, $token: String!) {\n    profile: page(url: $url, token: $token) {\n      ... on ProfileProfilePage {\n        username\n        verified\n        platformData\n        sources\n        bids\n        tids\n      }\n    }\n  }\n"])));
exports.profile = profile;
var templateObject_1, templateObject_2;
