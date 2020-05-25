//#region > Imports
//> Parent Task
// Contains the SNEK parent task
import SnekTasks from "./index";
//> Interfaces
// Contains the user interface for authentication
import { User } from "../../../../session";
//> Types
// Contains the type declaration for apollo results
import { ApolloResult } from "./index";
//#endregion

//#region > Interfaces
/**
 * @interface AuthData defines the structure of the authentication result data
 */
interface AuthData {
  auth: {
    token: string;
    refreshToken: string;
    user: {
      username: string;
    };
  };
}

/**
 * @interface RefreshData defines the structure of the refresh result data
 */
interface RefreshData {
  refresh: {
    payload: string;
    token: string;
    refreshToken: string;
  };
}

/**
 * @interface RevokeData defines the structure of the revoke result data
 */
interface RevokeData {
  revoke: {
    revoked: string;
  };
}
//#endregion

//#region > Classes
/** @class A set of session aware Tasks */
class SnekGqlAuthTasks {
  /**
   * @constructor
   * @author Nico Schett <contact@schett.net>
   * @param {string} session A session for the tasks
   */
  constructor(private parent: SnekTasks) {}

  /**
   * Anonymous login.
   *
   * @returns {Promise<ApolloResult<AuthData>>} A JWT token.
   * @description Authenticates the anonymous user to obtain a JWT
   */
  async anon(): Promise<ApolloResult<AuthData>> {
    const response = await this.parent.run<AuthData>(
      "mutation",
      this.parent.template.mutations.jwtAuth.auth,
      {
        username: "cisco",
        password: "ciscocisco",
      }
    );

    return response;
  }

  /**
   * User login.
   *
   * @param {string} user A User defined by username and password
   * @description Authenticates a real user to obtain a JWT
   * @returns {Promise<ApolloResult<AuthData>>} A JWT token
   */
  async nonanon(user: User): Promise<ApolloResult<AuthData>> {
    const response = await this.parent.run<AuthData>(
      "mutation",
      this.parent.template.mutations.jwtAuth.auth,
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
   * @returns {Promise<ApolloResult<RefreshData>>} A JWT token
   */
  async refresh(): Promise<ApolloResult<RefreshData>> {
    const response = await this.parent.run<RefreshData>(
      "mutation",
      this.parent.template.mutations.jwtAuth.refresh,
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
   * @returns {Promise<ApolloResult<RevokeData>>} Revoke acknowledgment
   */
  async revoke(): Promise<ApolloResult<RevokeData>> {
    const response = await this.parent.run<RevokeData>(
      "mutation",
      this.parent.template.mutations.jwtAuth.revoke,
      {
        refreshToken: this.parent.session.refreshToken,
      }
    );

    return response;
  }
}
//#endregion

//#region > Exports
export default SnekGqlAuthTasks;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © Simon Prast
 */
