//#region > Imports
//> Sessions
// Contains the SNEK session
import { SnekSession } from "../../session/sessions";
//> Types
// Contains the type declarations for Apollo results
import * as types from "./types";
//#endregion

//#region > Classes
/** @class A set of session aware tasks */
class TaskError {
  /**
   * Initializes session aware Tasks.
   *
   * @constructor
   * @author Nico Schett <contact@schett.net>
   * @param {SnekSession} session A session for the task
   */
  constructor(public session: SnekSession) {}

  /**
   * Handle specific errors which could occur on SNEK tasks.
   *
   * @param {Response} response A SNEK-client graphql response
   * @returns {boolean} "false" if a token error occurs.
   *                    "null" if other errors occurs.
   *                    "true" otherwise.
   */
  handleErrors(response: types.ApolloResult<any>): boolean | null {
    const errors = response.errors;

    if (errors && errors.length > 0) {
      if (errors[0].message === "Invalid refresh token") {
        /* Delete token and refresh token if refresh token is invalid */
        this.session.token = undefined;
        this.session.refreshToken = undefined;

        return false;
      } else if (errors[0].message === "Error decoding signature") {
        /* Delete token if token is invalid */
        this.session.token = undefined;

        return false;
      } else {
        return null;
      }
    }

    return true;
  }
}
//#endregion

//#region > Exports
export { TaskError };
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © Simon Prast
 */
