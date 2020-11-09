//#region > Imports
//> Parent Task
// Contains the SNEK parent task
import MainTask from "./index";
//> Types
// Contains the graphql response types
import {
  User,
  ApolloResult,
  GraphQLAuthentication,
  GraphQLRefresh,
  GraphQLRevoke,
} from "../types";
//> Config
import Config from "../../../config.json";
//#endregion

//#region > Classes
/** @class A set of session aware tasks */
class AuthTask {
  /**
   * Initializes session aware SnekGqlAuth Task.
   *
   * @constructor
   * @author Nico Schett <contact@schett.net>
   * @param {string} session A session for the tasks
   */
  constructor(private parent: MainTask) {}

  /**
   * Anonymous login.
   *
   * @returns {Promise<ApolloResult<GraphQLAuthentication>>} Authentication data
   * @description Authenticates the anonymous user to obtain a JWT
   */
  async anon(): Promise<ApolloResult<GraphQLAuthentication>> {
    const response = await this.parent.run<GraphQLAuthentication>(
      "mutation",
      this.parent.mutations.jwtAuth.auth,
      {
        username: Config.anonUser.username,
        password: Config.anonUser.password,
      }
    );

    return response;
  }

  /**
   * User login.
   *
   * @param {string} user A User defined by username and password
   * @returns {Promise<ApolloResult<GraphQLAuthentication>>} Authentication data
   * @description Authenticates a real user to obtain a JWT
   */
  async nonanon(user: User): Promise<ApolloResult<GraphQLAuthentication>> {
    const response = await this.parent.run<GraphQLAuthentication>(
      "mutation",
      this.parent.mutations.jwtAuth.auth,
      {
        username: user.username,
        password: user.password,
      }
    );

    return response;
  }

  /**
   * Refresh a token.
   *
   * @param {string} user A User defined by username and password
   * @returns {Promise<ApolloResult<GraphQLRefresh>>} Refresh data
   */
  async refresh(): Promise<ApolloResult<GraphQLRefresh>> {
    const response = await this.parent.run<GraphQLRefresh>(
      "mutation",
      this.parent.mutations.jwtAuth.refresh,
      {
        refreshToken: this.parent.session.refreshToken,
      }
    );

    return response;
  }

  /**
   * Revoke a token.
   *
   * @param {string} user A User defined by username and password
   * @returns {Promise<ApolloResult<GraphQLRevoke>>} Revoke acknowledgment
   */
  async revoke(): Promise<ApolloResult<GraphQLRevoke>> {
    const response = await this.parent.run<GraphQLRevoke>(
      "mutation",
      this.parent.mutations.jwtAuth.revoke,
      {
        refreshToken: this.parent.session.refreshToken,
      }
    );

    return response;
  }
}
//#endregion

//#region > Exports
export default AuthTask;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © Simon Prast
 */
