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
var queryGitlabServer = graphql_tag_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  query gitLabServers($token: String!) {\n    page(url: \"/registration\", token: $token) {\n      ... on RegistrationRegistrationFormPage {\n        supportedGitlabs {\n          ... on RegistrationGitlab_Server {\n            organisation\n            domain\n            field\n          }\n        }\n      }\n    }\n  }\n"], ["\n  query gitLabServers($token: String!) {\n    page(url: \"/registration\", token: $token) {\n      ... on RegistrationRegistrationFormPage {\n        supportedGitlabs {\n          ... on RegistrationGitlab_Server {\n            organisation\n            domain\n            field\n          }\n        }\n      }\n    }\n  }\n"])));
exports.queryGitlabServer = queryGitlabServer;
var templateObject_1;
