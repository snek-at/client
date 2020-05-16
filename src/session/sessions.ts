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

  //> Getter
  get token() {
    let token = super.token;

    /* Refresh token if there is none */
    if (!token) {
      token = super.token;
    }

    return token;
  }

  get refreshToken() {
    const token = Cookies.get(this.refreshTokenName);

    return token ? token : undefined;
  }

  //> Setter
  set token(value: string | undefined) {
    if (value) {
      Cookies.set(this.tokenName, value ? value : "", {
        expires: 4 / 1440,
      });
    } else {
      Cookies.remove(this.tokenName);
    }
  }

  set refreshToken(value: string | undefined) {
    if (value) {
      Cookies.set(this.refreshTokenName, value, {
        expires: 6,
      });
    } else {
      Cookies.remove(this.refreshTokenName);
    }
  }

  //> Methods
  async upToDateToken() {
    let token = super.token;

    /* Refresh token if there is none */
    if (!token) {
      await this.refresh();

      token = super.token;
    }

    return token;
  }

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
   * Begin session.
   *
   * @param {string} user A User defined by username and password.
   * @returns {UserData} A UserData object.
   */
  async begin(user?: User) {
    let response;
    console.log("BEGIN")
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
      if (response.errors) {
        throw new Error(JSON.stringify(response.errors));
      }

      /* Set tokens */
      this.token = response.data.auth.token;
      this.refreshToken = response.data.auth.refreshToken;

      return <UserData>response.data.auth.user;
    }

    /* Get user data */
    response = await this.tasks.user.whoami();

    return <UserData>response.data;
  }

  /** @description Refreshes the cookies */
  async refresh() {
    // C1: refresh and token empty
    // c2: refresh empty:
    // c3: token empty
    if (!this.token) {
      if (this.refreshToken) {
        let response = await this.tasks.auth.refresh();

        if (response.errors) {
          throw new Error(JSON.stringify(response.errors));
        }

        this.token = response.data.refresh.token;
        this.refreshToken = response.data.refresh.refreshToken;
      } else {
        /* No token and refresh token: Anon login */
        await this.begin();
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
    this.token = undefined;
    this.refreshToken = undefined;
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
