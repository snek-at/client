//#region > Imports
//> Sessions
// Contains the SNEK session
import { SnekSession } from "../../../session/sessions";
//> Interfaces
// Contains a interface for a general response
import { IResponse } from "./tasks/index";
//#endregion

//#region > Classes
/** @class A set of session aware Tasks */
class TaskError {
  /**
   * @constructor
   * @author Nico Schett <contact@schett.net>
   * @param {SnekSession} session A session for the task
   */
  constructor(public session: SnekSession) {}

  /**
   * Handle specific errors which could occur on SNEK tasks.
   *
   * @param {Response} response A SNEK-client graphql response
   * @returns {boolean} "false" if an error occurs. Otherwise "true"
   */
  handleErrors(response: IResponse): boolean {
    if (response.errors?.length > 0) {
      //#LEGACY
      //#ERROR
      console.error("An error occurred" + JSON.stringify(response));

      if (response.errors[0].message === "Invalid refresh token") {
        /* Delete token and refresh token if refresh token is invalid */
        this.session.token = undefined;
        this.session.refreshToken = undefined;

        return false;
      } else if (response.errors[0].message === "Error decoding signature") {
        /* Delete token if token is invalid */
        this.session.token = undefined;

        return false;
      } else {
        return false;
      }
    }

    return true;
  }
}
//#endregion

//#region > Exports
export { TaskError };
//#endregion
