import { User } from '../../../../session';
import { SnekSession } from '../../../../session/sessions';

interface IAuthResponse {
  data: {
    auth: {
      token: string;
      refreshToken: string;
      user: {
        username: string
      }
    }
  }
}

interface IRefreshResponse {
  data: {
    refresh: {
      payload: string;
      token: string;
      refreshToken: string;
    }
  }
}

interface IRevokeResponse {
  data: {
    revoke: {
      revoked: string;
    }
  }
}

interface IWhoami {
  data: {
    whoami: {
      username: string
    }
  }
}

/** @class A set of session aware Tasks */
export class SnekGqlAuthTasks {
  /**
   * Creates an instance of a SessionTasks.
   *
   * @constructor
   * @author: schettn
   * @param {string} session A session for the tasks
   */
  constructor(private session: SnekSession) { }

  /**
   * Anonymous login.
   *
   * @return {Promise<IAuthResponse>} A JWT token.
   */
  async anon(): Promise<IAuthResponse> {
    let query = this.session.sessionTemplate.snekGql.mutations.jwtAuth.auth;
    let response = <IAuthResponse>await this.session.ep.send("mutation", query, { username: "cisco", password: "ciscocisco" });
    return response;
  }

  /**
   * User login.
   *
   * @param {string} user A User defined by username and password
   * @return {Promise<IAuthResponse>} A JWT token,
   */
  async nonanon(user: User): Promise<IAuthResponse> {
    let query = this.session.sessionTemplate.snekGql.mutations.jwtAuth.auth;
    let response = <IAuthResponse>await this.session.ep.send("mutation", query, {
      username: user.username,
      password: user.password
    });

    return response;
  }

  /**
   * Refresh token.
   *
   * @param {string} user A User defined by username and password
   * @return {Promise<IAuthResponse>} A JWT token,
   */
  async refresh(): Promise<IRefreshResponse> {
    let query = this.session.sessionTemplate.snekGql.mutations.jwtAuth.refresh;
    let response = <IRefreshResponse>await this.session.ep.send("mutation", query, {
      refreshToken: this.session.refreshToken
    });


    return response;
  }

  /**
   * Refresh token.
   *
   * @param {string} user A User defined by username and password
   * @return {Promise<IRevokeResponse>} A JWT token,
   */
  async revoke(): Promise<IRevokeResponse> {
    let query = this.session.sessionTemplate.snekGql.mutations.jwtAuth.revoke;
    let response = <IRevokeResponse>await this.session.ep.send("mutation", query, {
      refreshToken: this.session.refreshToken
    });

    return response;
  }

  /**
   * Register a user
   */
}
