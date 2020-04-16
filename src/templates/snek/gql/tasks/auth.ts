//#region > Imports
//> Sessions
// Contains the snek session
import { SnekSession } from "../../../../session/sessions";
//> Interfaces
// Contains the user interface for authentication
import { User } from "../../../../session";
// Contains a interface for a general response
import { IResponse } from "./index";
// Contains the snek template
import { ISnekGqlTemplate } from "../index";
//#endregion

//#region > Interfaces
/** @interface AuthResponse defines the structure of a auth response. */
interface IAuthResponse extends IResponse {
  data: { auth: AuthData };
  errors: [];
}

/** @interface AuthData defines the structure of the auth data. */
interface AuthData {
  token: string;
  refreshToken: string;
  user: {
    username: string;
  };
}

/** @interface RefreshResponse defines the structure of the refresh data. */
interface IRefreshResponse extends IResponse {
  data: { refresh: RefreshData };
}

/** @interface RefreshData defines the structure of the refresh data. */
interface RefreshData {
  payload: string;
  token: string;
  refreshToken: string;
}

/** @interface RevokeResponse defines the structure of the refresh data. */
interface IRevokeResponse extends IResponse {
  data: { revoke: RevokeData };
}

/** @interface RevokeData defines the structure of the revoke data. */
interface RevokeData {
  revoked: string;
}
//#endregion

//#region > Classes
/** @class A set of session aware Tasks. */
class SnekGqlAuthTasks {
  public template: ISnekGqlTemplate;
  /**
   * Creates an instance of a SessionTasks.
   *
   * @constructor
   * @author Nico Schett <contact@schett.net>
   * @param {string} session A session for the tasks
   */
  constructor(private session: SnekSession) {
    this.template = session.template.snekGql;
  }

  /**
   * Anonymous login.
   *
   * @returns {Promise<IAuthResponse>} A JWT token.
   */
  async anon(): Promise<IAuthResponse> {
    let query = this.template.mutations.jwtAuth.auth;
    let response = <IAuthResponse>await this.session.ep.send(
      "mutation",
      query,
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
   * @returns {Promise<AuthData>} A JWT token.
   */
  async nonanon(user: User): Promise<IAuthResponse> {
    let query = this.template.mutations.jwtAuth.auth;
    let response = <IAuthResponse>await this.session.ep.send(
      "mutation",
      query,
      {
        username: user.username,
        password: user.password,
      }
    );

    return response;
  }

  /**
   * Refresh token.
   *
   * @param {string} user A User defined by username and password
   * @returns {Promise<IRefreshResponse>} A JWT token,
   */
  async refresh(): Promise<IRefreshResponse> {
    let query = this.template.mutations.jwtAuth.refresh;
    let response = <IRefreshResponse>await this.session.ep.send(
      "mutation",
      query,
      {
        refreshToken: this.session.refreshToken,
      }
    );

    return response;
  }

  /**
   * Refresh token.
   *
   * @param {string} user A User defined by username and password
   * @returns {Promise<IRevokeResponse>} Revoke acknowledgment.
   */
  async revoke(): Promise<IRevokeResponse> {
    let query = this.template.mutations.jwtAuth.revoke;
    let response = <IRevokeResponse>await this.session.ep.send(
      "mutation",
      query,
      {
        refreshToken: this.session.refreshToken,
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
