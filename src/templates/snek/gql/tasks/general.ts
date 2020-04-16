//#region > Imports
//> Sessions
// Contains the snek session
import { SnekSession } from "../../../../session/sessions";
//> Interfaces
// Contains a interface for a general response
import { IResponse } from "./index";
// Contains the user interface for authentication
import { ISnekGqlTemplate } from "../index";
//#endregion

//#region > Interfaces
/** @interface GitlabServerResponse defines the structure of the gitlab server response. */
interface IGitlabServerResponse extends IResponse {
  data: { page: GitlabServerData };
}

/** @interface GitlabServerData defines the structure of the gitlab server data. */
interface GitlabServerData {
  supportedGitlabs: [];
}

/** @interface AllPageUrlResponse defines the structure of the all page url response. */
interface IAllPageUrlResponse extends IResponse {
  data: { pages: [] };
}
//#endregion

//#region > Classes
/** @class A set of session aware Tasks */
class SnekGqlGeneralTasks {
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
   * Gitlab Server
   *
   * @returns {Promise<IGitlabServerResponse>} A list of Gitlab server.
   */
  async gitlabServer(): Promise<IGitlabServerResponse> {
    /**
     * Refresh if session is not alive
     */
    await this.session.refresh();

    let query = this.template.queries.general.gitlabServer;
    let response = <IGitlabServerResponse>(
      await this.session.ep.send("query", query, { token: this.session.token })
    );

    return response;
  }

  /**
   * All page url
   *
   * @returns {Promise<IAllPageUrlResponse>} A list of all page urls.
   */
  async allPageUrls(): Promise<IAllPageUrlResponse> {
    /**
     * Refresh if session is not alive
     */
    await this.session.refresh();

    let query = this.template.queries.general.allPageUrls;
    let response = <IAllPageUrlResponse>(
      await this.session.ep.send("query", query, { token: this.session.token })
    );

    return response;
  }
}
//#endregion

//#region > Exports
export default SnekGqlGeneralTasks;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © Simon Prast
 */
