import * as _jwtAuth from "../mutations/jwtAuth";
import * as _user from "./user";

/**
 * @description A Template with initializes all mutations.
 */
export class SnekGqlMutation {
    public jwtAuth = _jwtAuth;
    public user = _user;
}
