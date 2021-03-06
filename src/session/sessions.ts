//#region > Imports
//#PACKAGE "graphql"
//## npm install "graphql"@14.6.0
// Contains the interface for gql queries, mutations and subscriptions
import { DocumentNode } from "graphql";
//#PACKAGE "js-cookie"
//## npm install "js-cookie"@2.2.1
// A simple, lightweight JavaScript API for handling browser cookies
import Cookies from "js-cookie";

//> Session
// Contains the base session
import Session from "./index";
//> Templates
// Contains the main template for the sessions
import { IMainTemplate } from "../templates/index";
// Contains the SNEK template
import SnekTemplate from "../templates/snek/index";
//> Tasks
// Contains SNEK tasks
import SnekTasks from "../templates/snek/gql/tasks/index";
//> Interfaces
// Contains the interface for the apollo endpoint
import { ApolloEndpoint } from "../endpoints/index";
// Contains basic session interfaces
import { User } from "./index";
//#endregion

//#region > Classes
/** @class A Github SubSession */
class GithubSession extends Session {
  /**
   * Initializes a Github session.
   *
   * @constructor
   * @author Nico Schett <contact@schett.net>
   * @param {string} sId A session name
   * @param {Endpoint} ep A endpoint
   * @param {IMainTemplate} template A template set
   */
  constructor(
    sId: string,
    public ep: ApolloEndpoint,
    public template: IMainTemplate
  ) {
    /** @todo Change template set to dedicated github template set */
    super(sId);
  }

  /**
   * Send a query to the endpoint.
   *
   * @param {string} token A authentication token
   * @param {DocumentNode} data A DocumentNode with a query
   * @param {object} variables A object with variables
   */
  async send(token: string, data: DocumentNode, variables?: object) {
    let headers = {
      authorization: token,
    };

    return this.ep.sendQuery(data, variables, headers);
  }
}

/** @class CookieSession extends token session handling with cookies */
class CookieSession extends Session {
  refreshTokenName: string = "refresh";

  /**
   * Initializes a cookie session.
   *
   * @constructor
   * @author Nico Schett <contact@schett.net>
   * @param {string} sId A session name
   */
  constructor(sId: string) {
    super(sId);
  }

  //> Getter
  /**
   * Get current token.
   *
   * @returns {string | undefined} A users JWT if set
   */
  get token(): string | undefined {
    return super.token;
  }

  /**
   * Get refresh token from cookies.
   *
   * @returns {string | undefined} A users JWT if set
   */
  get refreshToken(): string | undefined {
    const token = Cookies.get(this.refreshTokenName);

    return token ? token : undefined;
  }

  //> Setter
  /**
   * Write token to cookies.
   *
   * @param {string | undefined} value A users JWT
   * @description Saves the current token to cookies. If the value is undefined,
   *              the cookie will be removed. The expire time is set to four
   *              minutes.
   */
  set token(value: string | undefined) {
    if (value) {
      Cookies.set(this.tokenName, value ? value : "", {
        /* Expire time is set to 4 minutes */
        expires: 4 / 1440,
      });
    } else {
      Cookies.remove(this.tokenName);
    }
  }

  /**
   * Write refresh token to cookies.
   *
   * @param {string | undefined} value A users JWT refresh token
   * @description Saves the current refresh token to cookies. If the value
   *              is undefined, the cookie will be removed. The expire time is
   *              set to six days.
   */
  set refreshToken(value: string | undefined) {
    if (value) {
      Cookies.set(this.refreshTokenName, value, {
        /* Expire time is set to 6 days */
        expires: 6,
      });
    } else {
      Cookies.remove(this.refreshTokenName);
    }
  }
}

/** @class A SNEK SubSession */
class SnekSession extends CookieSession {
  /* Define tasks */
  public tasks: SnekTasks;

  /**
   * Initializes a SNEK session.
   *
   * @constructor
   * @author Nico Schett <contact@schett.net>
   * @param {string} sId A session name
   * @param {Endpoint} ep A endpoint
   * @param {SnekTemplate} template A template set
   */
  constructor(
    sId: string,
    public ep: ApolloEndpoint,
    public template: SnekTemplate
  ) {
    super(sId);

    this.tokenName = sId + "-" + this.tokenName;
    this.refreshTokenName = sId + "-" + this.refreshTokenName;
    this.tasks = new SnekTasks(this);
  }

  //> Methods
  /**
   * Get a valid session token. If there is none the session will be refreshed.
   *
   * @returns {Promise<string | undefined>} The session token if set
   */
  async upToDateToken(): Promise<string | undefined> {
    let token = super.token;

    /* Refresh token if there is none */
    if (!token) {
      await this.refresh();

      token = super.token;
    }

    return token;
  }

  /**
   * Send a query to the endpoint.
   *
   * @param {string} token A authentication token
   * @param {DocumentNode} data A DocumentNode with a query
   * @param {object} variables A object with variables
   */
  async send(token: string, data: DocumentNode, variables?: object) {
    let headers = {
      authorization: token,
    };

    return this.ep.sendQuery(data, variables, headers);
  }

  /**
   * Begin session.
   *
   * @param {string} user A User defined by username and password
   * @returns {Promise<any>} A UserData object
   */
  async begin(user?: User): Promise<any> {
    let response;

    if (!user && this.refreshToken) {
      /* Refresh token and retrieve a new refreshToken if necessary */
      this.refresh();
    } else {
      if (!user) {
        /* Authenticate anonymous user */
        response = await this.tasks.auth.anon();
      } else {
        /* Authenticate real user */
        response = await this.tasks.auth.nonanon(user);
      }

      /* Set tokens */
      this.token = response.data?.auth.token;
      this.refreshToken = response.data?.auth.refreshToken;

      return response.data?.auth.user;
    }

    /* Get user data */
    response = await this.tasks.user.whoami();

    return response.data?.whoami;
  }

  /**
   * Refreshes a session based on its history.
   *
   * @description If there is no token the refresh token is used to get a new one.
   *              If none of both is provided begin a new session as an anonymous user.
   */
  async refresh() {
    if (!this.token) {
      if (this.refreshToken) {
        let response = await this.tasks.auth.refresh();

        this.token = response.data?.refresh.token;
        this.refreshToken = response.data?.refresh.refreshToken;
      } else {
        /* No token and refresh token present, start anonymous login */
        await this.begin();
      }
    }
  }

  /**
   * Ends a session.
   *
   * @description The token and refresh token get revoked and deleted
   */
  async end() {
    /* Revoke token if it is set */
    if (this.refreshToken !== "") {
      let response = await this.tasks.auth.revoke();

      //#DEBUG TSID1
      //console.log("TID-1(REVOKE)", response.data?.revoke.revoked);
    }

    /* Reset token */
    this.token = undefined;
    this.refreshToken = undefined;
  }

  /**
   * Perform a custom task.
   *
   * @param type
   * @param data
   * @param variables
   * @description Perform a session aware custom task. Token and refreshToken
   *              are set by default!
   *              When no type is specified, query is set as default.
   */
  async customTask<T>(type: string, data: DocumentNode, variables: object) {
    return this.tasks.run<T>(type, data, {
      ...variables,
      token: this.token,
      refreshToken: this.refreshToken,
    });
  }
}
//#endregion

//#region > Exports
export { GithubSession, SnekSession };
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © Simon Prast
 */
