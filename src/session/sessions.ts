//#region > Imports
//> Interfaces
//#INSTALL "graphql"
// Contains the interface for gql queries, mutations and subscriptions
import { DocumentNode } from "graphql";
//> Cookie Utils
//#INSTALL "js-cookie"
//A simple, lightweight JavaScript API for handling browser cookies
import Cookies from "js-cookie";

//> Session
// Contains the base session
import Session from "./index";
//> Templates
// Contains the main template for the sessions
import { IMainTemplate } from "../templates/index";
// Contains the snek template
import SnekTemplate from "../templates/snek/index";
//> Tasks
// Contains snek tasks
import SnekTasks from "../templates/snek/gql/tasks/index";
//> Interfaces
// Contains the interface for the apollo endpoint
import { ApolloEndpoint } from "../../src/endpoints/index";
// Contains basic session interfaces
import { IAuth, User, UserData } from "./index";
//#endregion

//#region > Classes
/** @class A Github SubSession. */
class GithubSession extends Session {
  /**
   * Creates an instance of a GithubSession.
   *
   * @constructor
   * @param {string} sId A session name.
   * @param {Endpoint} ep A endpoint.
   * @param {IMainTemplate} template A template set.
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
   * Send query:
   *
   * @description Send a query to the endpoint.
   * @param {string} token A authentication token.
   * @param {DocumentNode} data A DocumentNode with a query.
   * @param {object} variables A abject with variables.
   */
  async send(token: string, data: DocumentNode, variables?: object) {
    let headers = {
      authorization: token,
    };

    return this.ep.send("query", data, variables, headers);
  }
}

/** @class A Snek SubSession. */
class SnekSession extends Session {
  refreshToken: string | undefined = "";
  refreshTokenName: string = "refresh";

  /* Define tasks */
  public tasks: SnekTasks;

  /**
   * Creates an instance of a SnekSession.
   *
   * @constructor
   * @param {string} sId A session name.
   * @param {Endpoint} ep A endpoint.
   * @param {SnekTemplate} template A template set.
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
   * Send query:
   *
   * @description Send a query to the endpoint.
   * @param {string} token A authentication token.
   * @param {DocumentNode} data A DocumentNode with a query.
   * @param {object} variables A object with variables.
   */
  async send(token: string, data: DocumentNode, variables?: object) {
    let headers = {
      authorization: token,
    };

    return this.ep.send("query", data, variables, headers);
  }

  /**
   * Initialize tokens.
   *
   * @param {IAuth} auth A Auth object (token, refreshToken).
   */
  initTokens(auth: IAuth) {
    this.token = auth.token;
    this.refreshToken = auth.refreshToken;

    /* Delete the token and refreshToken cookie */
    Cookies.remove(this.tokenName);
    Cookies.remove(this.refreshTokenName);

    let now = new Date();

    /* Set the token and refreshToken cookie with expire times */
    Cookies.set(this.tokenName, this.token, {
      /* Expire time is 4 minutes */
      expires: 4 / 1440,
    });

    Cookies.set(this.refreshTokenName, this.refreshToken, {
      expires: 6,
    });
  }

  /**
   * Was alive check.
   *
   * @description Refresh token status check.
   * @param {boolean} alive A status whether the refresh token is alive or not.
   */
  wasAlive() {
    return cookieChecker(this.refreshTokenName);
    return Cookies.get(this.refreshTokenName) ? true : false;
  }

  /**
   * Is alive check.
   *
   * @description Token and refresh token status check.
   * @param {boolean} alive A status whether the token and refresh token are alive or not.
   */
  isAlive() {
    if (cookieChecker(this.refreshTokenName) && super.isAlive()) {
    if (this.wasAlive() && super.isAlive()) {
      return true;
    }

    return false;
  }

  /**
   * Begin session.
   *
   * @param {string} user A User defined by username and password.
   * @returns {UserData} A UserData object.
   */
  async begin(user?: User) {
    let response;

    if (!user && this.wasAlive()) {
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
      if (response.errors) {
        throw new Error(JSON.stringify(response.errors));
      }

      /* Set tokens */
      this.initTokens(response.data.auth);

      return <UserData>response.data.auth.user;
    }

    /* Get user data */
    response = await this.tasks.user.whoami();

    return <UserData>response.data;
  }

  /** @description Refreshes the cookies */
  async refresh() {
    if (!this.isAlive()) {
      if (this.wasAlive()) {
        /* Refresh token with refreshToken */
        this.refreshToken = Cookies.get(this.refreshTokenName);

        let response = await this.tasks.auth.refresh();

        if (response.errors) {
          throw new Error(JSON.stringify(response.errors));
        }

        this.initTokens(response.data.refresh);
      } else {
        /* Begin new session */
        await this.end();
        await this.begin();
      }
    } else {
      const token = Cookies.get(this.tokenName);
      const refreshToken = Cookies.get(this.refreshTokenName);

      if (token && refreshToken) {
        this.initTokens({ token, refreshToken });
      }
    }
  }

  /** @description End session by resetting jwt and deleting cookies. */
  async end() {
    /* Revoke token if it is set */
    if (this.refreshToken !== "") {
      let response = await this.tasks.auth.revoke();

      //#DEBUG TSID1
      console.log("TID-1(REVOKE)", response.data.revoke.revoked);
    }

    /* Reset token */
    this.token = "";
    this.refreshToken = "";

    /* Delete cookie */
    Cookies.remove(this.tokenName);
    Cookies.remove(this.refreshTokenName);
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
