//#region > Imports
//> Parent Task
// Contains the SNEK parent task
import MainTask from "./index";
//> Types
// Contains the graphql response types
import { ApolloResult, GraphQLWhoami } from "../types";
//#endregion

//#region > Classes
/** @class A set of session aware tasks */
//#region > Classes
/** @class A set of session aware Tasks */
class UserTasks {
  /**
   * Creates an instance of a SessionTasks.
   *
   * @constructor
   * @author Nico Schett <contact@schett.net>
   * @param {string} session A session for the tasks
   */
  constructor(private parent: MainTask) {}

  /**
   * Whoami check
   *
   * @returns {Promise<ApolloResult<GraphQLWhoami>>} User data.
   */
  async whoami(): Promise<ApolloResult<GraphQLWhoami>> {
    const response = await this.parent.run<GraphQLWhoami>(
      "query",
      this.parent.queries.user.whoami,
      {
        token: await this.parent.session.upToDateToken(),
      }
    );

    return response;
  }
}
//#endregion

//#region > Exports
export default UserTasks;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © Simon Prast
 */
