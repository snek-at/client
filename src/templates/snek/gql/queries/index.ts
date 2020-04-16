//#region > Imports
//> Queries
import * as _general from "./general";
import * as _user from "./user";
//#endregion

//#region > Classes
/** @class A template which initializes all SubTemplates. */
class SnekGqlQuery {
  public general = _general;
  public user = _user;
}
//#endregion

//#region > Exports
export { SnekGqlQuery };
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © Simon Prast
 */
