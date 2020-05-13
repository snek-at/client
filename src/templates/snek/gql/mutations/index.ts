//#region > Imports
//> Mutations
// Contains the jwtAuth mutations
import * as _jwtAuth from "./jwtAuth";
// Contains the user mutations
import * as _user from "./user";
//#endregion

//#region > Classes
/** @class A Template which initializes all mutations. */
class SnekGqlMutation {
  public jwtAuth = _jwtAuth;
  public user = _user;
}
//#endregion

//#region > Exports
export { SnekGqlMutation };
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © Simon Prast
 */
