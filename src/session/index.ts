//#region > Imports
//#PACKAGE "js-cookie"
//## npm install "js-cookie"@2.2.1
// A simple, lightweight JavaScript API for handling browser cookies
import Cookies from "js-cookie";
//#endregion

//#region > Interfaces
/** @interface User defines the structure of a basic user object */
interface User {
  username: string;
  password: string;
}

/** @interface ISession defines the session structure */
interface ISession {
  sessions: { [id: string]: ISession };
  tokenName: string;
}
//#endregion

//#region > Classes
/** @class A general Session with token functionality */
class Session implements ISession {
  sessions: { [id: string]: ISession } = {};
  tokenName: string = "token";

  /**
   * Initializes a base Session.
   *
   * @constructor
   * @author Nico Schett <contact@schett.net>
   * @param {string} sId Session identifier
   */
  constructor(private sId: string) {}

  //> Getter
  /**
   * Get token from cookies.
   *
   * @returns {string | undefined} A users JWT if set
   */
  get token(): string | undefined {
    const token = Cookies.get(this.tokenName);

    return token ? token : undefined;
  }

  //> Setter
  /**
   * Write token to cookies.
   *
   * @param {string | undefined} value A users JWT
   * @description Saves the current token to cookies. If the value is undefined,
   *              the cookie will be removed.
   */
  set token(value: string | undefined) {
    if (value) {
      Cookies.set(this.tokenName, value);
    } else {
      Cookies.remove(this.tokenName);
    }
  }

  //> Methods
  /**
   * Add a subSession to a session.
   *
   * @param childSId The session name of the child
   * @param {any} type Specify the session (Session | string)
   * @param permanent True if not set
   */
  addSubSession<S, E, T>(childSId: string, Cls: any, endpoint: E, template: T) {
    let session: S = new Cls(this.sId + "_" + childSId, endpoint, template);

    return session;
  }
}
//#endregion

//#region > Exports
export type { User, ISession };
export default Session;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © Simon Prast
 */
