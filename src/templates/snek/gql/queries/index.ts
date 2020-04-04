import * as _general from "./general";
import * as _jwtAuth from "../mutations/jwtAuth";
import * as _user from "./user";

/**
 * @description A Template with initializes all SubTemplates.
 */
export class SnekGqlQuery {
    public general = _general;
    public jwtAuth = _jwtAuth;
    public user = _user;
}
