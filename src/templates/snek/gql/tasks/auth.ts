//#region > Imports
//> Sessions
// Contains the SNEK session
import { SnekSession } from "../../../../session/sessions";
//> Tasks
// Contains a class to handle task errors
import { TaskError } from "../errors";
//> Interfaces
// Contains the user interface for authentication
import { User } from "../../../../session";
// Contains a interface for a general response
import { Response } from "./index";
// Contains the SNEK template
import { SnekGqlTemplate } from "../index";
//#endregion

//#region > Interfaces
/**
 * @interface AuthResponse defines the overall structure of a authentication
 *                         response from the SNEK-engine.
 */
interface AuthResponse extends Response {
  data: { auth: AuthData };
}

/**
 * @interface AuthData defines the structure of the specific data a
 *                      authentication response contains.
 */
interface AuthData {
  token: string;
  refreshToken: string;
  user: {
    username: string;
  };
}

/**
 *  @interface RefreshResponse defines the overall structure of a token refresh
 *                             response from the SNEK-engine.
 */
interface RefreshResponse extends Response {
  data: { refresh: RefreshData };
}

/**
 *  @interface RefreshData defines the structure of the specific data a refresh
 *                         response contains.
 */
interface RefreshData {
  payload: string;
  token: string;
  refreshToken: string;
}

/** @interface RevokeResponse defines the overall structure of a token revoke
 *                            response from the SNEK-engine.
 */
interface RevokeResponse extends Response {
  data: { revoke: RevokeData };
}

/**
 * @interface RevokeData defines the structure of the specific data a revoke
 *                       response contains.
 */
interface RevokeData {
  revoked: string;
}
//#endregion

//#region > Classes
/** @class A set of session aware Tasks */
class SnekGqlAuthTasks extends TaskError {
  public template: SnekGqlTemplate;

  /**
   * @constructor
   * @author Nico Schett <contact@schett.net>
   * @param {string} session A session for the tasks
   */
  constructor(session: SnekSession) {
    super(session);

    this.template = session.template.snekGql;
  }

  /**
   * Anonymous login.
   *
   * @returns {Promise<AuthResponse>} A JWT token
   * @description Authenticates the anonymous user to obtain a JWT
   */
  async anon(): Promise<AuthResponse> {
    let query = this.template.mutations.jwtAuth.auth;
    let response = <AuthResponse>await this.session.ep.send("mutation", query, {
      username: "cisco",
      password: "ciscocisco",
    });

    return response;
  }

  /**
   * User login.
   *
   * @param {string} user A User defined by username and password
   * @returns {Promise<AuthData>} A JWT token
   * @description Authenticates a real user to obtain a JWT
   */
  async nonanon(user: User): Promise<AuthResponse> {
    let query = this.template.mutations.jwtAuth.auth;
    let response = <AuthResponse>await this.session.ep.send("mutation", query, {
      username: user.username,
      password: user.password,
    });

    this.handleErrors(response);

    return response;
  }

  /**
   * Refresh a token.
   *
   * @param {string} user A User defined by username and password
   * @returns {Promise<RefreshResponse>} A JWT token
   */
  async refresh(): Promise<RefreshResponse> {
    let query = this.template.mutations.jwtAuth.refresh;
    let response = <RefreshResponse>await this.session.ep.send(
      "mutation",
      query,
      {
        refreshToken: this.session.refreshToken,
      }
    );

    this.handleErrors(response);

    return response;
  }

  /**
   * Revoke a token.
   *
   * @param {string} user A User defined by username and password
   * @returns {Promise<RevokeResponse>} Revoke acknowledgment
   */
  async revoke(): Promise<RevokeResponse> {
    let query = this.template.mutations.jwtAuth.revoke;
    let response = <RevokeResponse>await this.session.ep.send(
      "mutation",
      query,
      {
        refreshToken: this.session.refreshToken,
      }
    );

    this.handleErrors(response);

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
