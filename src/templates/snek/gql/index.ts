//#region > Imports
//> Queries
import { SnekGqlQuery } from "./queries/index";
//> Mutations
import { SnekGqlMutation } from "./mutations/index";
//#endregion

//#region > Interfaces
/** @interface SnekGqlTemplate defines the structure for the gql template */
interface SnekGqlTemplate {
  queries: SnekGqlQuery;
  mutations: SnekGqlMutation;
}
//#endregion

//#region > Classes
/** @class A Template which initializes all SubTemplates */
class SnekGql {
  public queries = new SnekGqlQuery();
  public mutations = new SnekGqlMutation();
}
//#endregion

//#region > Exports
export type { SnekGqlTemplate };
export default SnekGql;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © Simon Prast
 */
