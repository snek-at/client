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
var auth = graphql_tag_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  mutation auth($username: String!, $password: String!) {\n    auth: tokenAuth(username: $username, password: $password) {\n      token\n      refreshToken\n      user {\n        firstName\n        lastName\n        email\n        dateJoined\n        lastLogin\n      }\n    }\n  }\n"], ["\n  mutation auth($username: String!, $password: String!) {\n    auth: tokenAuth(username: $username, password: $password) {\n      token\n      refreshToken\n      user {\n        firstName\n        lastName\n        email\n        dateJoined\n        lastLogin\n      }\n    }\n  }\n"])));
exports.auth = auth;
var refresh = graphql_tag_1.default(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  mutation refresh($refreshToken: String!) {\n    refresh: refreshToken(refreshToken: $refreshToken) {\n      payload\n      token\n      refreshToken\n    }\n  }\n"], ["\n  mutation refresh($refreshToken: String!) {\n    refresh: refreshToken(refreshToken: $refreshToken) {\n      payload\n      token\n      refreshToken\n    }\n  }\n"])));
exports.refresh = refresh;
var verify = graphql_tag_1.default(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  mutation verify($token: String!) {\n    verify: verifyToken(token: $token) {\n      payload\n    }\n  }\n"], ["\n  mutation verify($token: String!) {\n    verify: verifyToken(token: $token) {\n      payload\n    }\n  }\n"])));
exports.verify = verify;
var revoke = graphql_tag_1.default(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  mutation revoke($refreshToken: String!) {\n    revoke: revokeToken(refreshToken: $refreshToken) {\n      revoked\n    }\n  }\n"], ["\n  mutation revoke($refreshToken: String!) {\n    revoke: revokeToken(refreshToken: $refreshToken) {\n      revoked\n    }\n  }\n"])));
exports.revoke = revoke;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
