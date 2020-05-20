//#region > Imports
//> Sessions
// Contains the SNEK session
import { SnekSession } from "../../../../session/sessions";
//> Tasks
// Contains a class to handle task errors
import { TaskError } from "../errors";
//> Interfaces
// Contains a interface for a general response
import { Response } from "./index";
// Contains the user interface for authentication
import { SnekGqlTemplate } from "../index";
//#endregion

//#region > Interfaces
/**
 * @interface GitlabServerResponse defines the overall structure of a Gitlab
 *                                 server response from the SNEK-engine.
 */
interface GitlabServerResponse extends Response {
  data: { page: GitlabServerData };
}

/**
 * @interface GitlabServerData defines the structure of the specific data a
 *                             GitlabServerResponse contains.
 */
interface GitlabServerData {
  supportedGitlabs: [];
}

/**
 * @interface AllPageUrlResponse defines the overall structure of a AllPageUrl
 *                               response from the SNEK-engine.
 *
 */
interface AllPageUrlResponse extends Response {
  data: { pages: [] };
}
//#endregion

//#region > Classes
/** @class A set of session aware Tasks */
class SnekGqlGeneralTasks extends TaskError {
  public template: SnekGqlTemplate;

  /**
   * @constructor
   * @author Nico Schett <contact@schett.net>
   * @param {string} session A session for the tasks
   */
  constructor(session: SnekSession) {
    super(session);

    this.template = session.template.snekGql;
  }

  /**
   * Gitlab Server.
   *
   * @returns {Promise<GitlabServerResponse>} A list of Gitlab server
   * @description Get all Gitlab servers which are registered in the SNEK-engine
   */
  async gitlabServer(): Promise<GitlabServerResponse> {
    let query = this.template.queries.general.gitlabServer;
    let response = <GitlabServerResponse>await this.session.ep.send(
      "query",
      query,
      {
        token: await this.session.upToDateToken(),
      }
    );

    this.handleErrors(response);

    return response;
  }

  /**
   * All page url.
   *
   * @returns {Promise<AllPageUrlResponse>} A list of all page urls
   * @description Get a list of all pages
   */
  async allPageUrls(): Promise<AllPageUrlResponse> {
    let query = this.template.queries.general.allPageUrls;
    let response = <AllPageUrlResponse>await this.session.ep.send(
      "query",
      query,
      {
        token: await this.session.upToDateToken(),
      }
    );

    this.handleErrors(response);

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
