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
var registration = graphql_tag_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  mutation registration($token: String!, $values: GenericScalar!) {\n    registration: registrationFormPage(token: $token, url: \"/registration\", values: $values) {\n      result\n      errors {\n        name\n        errors\n      }\n    }\n  }\n"], ["\n  mutation registration($token: String!, $values: GenericScalar!) {\n    registration: registrationFormPage(token: $token, url: \"/registration\", values: $values) {\n      result\n      errors {\n        name\n        errors\n      }\n    }\n  }\n"])));
exports.registration = registration;
var cache = graphql_tag_1.default(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  mutation cache ($token: String!, $platformData: String!) {\n    cache: cacheUser(token: $token, platformData: $platformData){\n      user{\n        platformData\n      }\n    }\n  }\n"], ["\n  mutation cache ($token: String!, $platformData: String!) {\n    cache: cacheUser(token: $token, platformData: $platformData){\n      user{\n        platformData\n      }\n    }\n  }\n"])));
exports.cache = cache;
var templateObject_1, templateObject_2;
