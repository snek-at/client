//#region > Imports
//> Parent Task
// Contains the SNEK parent task
import SnekTasks from "./index";
//> Types
// Contains the type declaration for apollo results
import { ApolloResult } from "./index";
//#endregion

//#region > Interfaces
/**
 * @interface GitlabServerData defines the structure of the Gitlab server result
 *                             data
 */
interface GitlabServerData {
  page: {
    supportedGitlabs: [];
  };
}

/**
 * @interface AllPageUrlData defines the structure of the all page url result
 *                           data.
 */
interface AllPageUrlData {
  pages: [];
}
//#endregion

//#region > Classes
/** @class A set of session aware Tasks */
class SnekGqlGeneralTasks {
  /**
   * @constructor
   * @author Nico Schett <contact@schett.net>
   * @param {string} parent The parent task
   * @param {string} template A template set containing mutation and queries
   */
  constructor(private parent: SnekTasks) {}

  /**
   * Gitlab Server.
   *
   * @returns {Promise<ApolloResult<GitlabServerData>>} A list of Gitlab server
   * @description Get all Gitlab servers which are registered in the SNEK-engine
   */
  async gitlabServer(): Promise<ApolloResult<GitlabServerData>> {
    const response = await this.parent.run<GitlabServerData>(
      "query",
      this.parent.template.queries.general.gitlabServer,
      {
        token: await this.parent.session.upToDateToken(),
      }
    );

    return response;
  }

  /**
   * All page url.
   *
   * @returns {Promise<ApolloResult<AllPageUrlData>>} A list of all page urls
   * @description Get a list of all pages
   */
  async allPageUrls(): Promise<ApolloResult<AllPageUrlData>> {
    const response = await this.parent.run<AllPageUrlData>(
      "query",
      this.parent.template.queries.general.allPageUrls,
      {
        token: await this.parent.session.upToDateToken(),
      }
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
