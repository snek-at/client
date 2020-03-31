import * as _jwtAuth from "../mutations/jwtAuth";
import * as _user from "./user";

export class SnekGqlMutation {
    public jwtAuth = _jwtAuth;
    public user = _user;
}
