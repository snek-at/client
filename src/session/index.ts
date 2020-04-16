//#region > Imports
//> Cookie Utils
// Contains a tool which can check if a cookie is still alive
import { cookieChecker } from "./cookie-utils";
//#endregion

//#region > Interfaces
/** @interface UserData defines the structure of profile objects. */
interface UserData {
  username?: string;
  firstName?: string;
  lastName?: string;
  ownedPages?: string;
  email?: string;
  dateJoined?: string;
  lastLogin?: string;
}

/** @interface UserData defines the structure of an authentication object. */
interface IAuth {
  token: string;
  refreshToken: string;
}

/** @interface User defines the structure of a basic user object. */
interface User {
  username: string;
  password: string;
}

/** @interface Session defines the session structure. */
interface ISession {
  sessions: { [id: string]: ISession };
  token: string | undefined;
  tokenName: string;
}
//#endregion

//#region > Classes
/** @class A general Session with token functionality. */
class Session implements ISession {
  sessions: { [id: string]: ISession } = {};
  token: string | undefined = "";
  tokenName: string = "token";

  /**
   * Creates an instance of a Session.
   *
   * @constructor
   * @author Nico Schett <contact@schett.net>
   * @param {string} sId Session identifier.
   */
  constructor(private sId: string) {}

  //> Methods
  /**
   * Add a subSession.
   *
   * @param childSId The session name of the child.
   * @param {any} type Specify the session (Session | string)
   * @param permanent True if not set.
   * @description Add a subSession to a session.
   */
  addSubSession<S, E, T>(childSId: string, Cls: any, endpoint: E, template: T) {
    let session: S = new Cls(this.sId + "_" + childSId, endpoint, template);

    return session;
  }

  /**
   * Is alive check.
   *
   * @description A status whether the token is alive or not.
   * @param {boolean} alive A status.
   */
  isAlive() {
    return cookieChecker(this.tokenName);
  }
}
//#endregion

//#region > Exports
export type { UserData, IAuth, User, ISession };
export default Session;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © Simon Prast
 */
