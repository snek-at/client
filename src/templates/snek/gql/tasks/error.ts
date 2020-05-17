import { SnekSession } from "../../../../session/sessions";
import { IResponse } from "./index";
export class ErrorTask {
  constructor(public session: SnekSession) {}

  /**
   *
   * @param {IResponse} response A snek graphql response
   * @returns {boolean} "false" if an error occurs. Otherwise "true"
   */
  handleErrors(response: IResponse): boolean {
    if (response.errors?.length > 0) {
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
