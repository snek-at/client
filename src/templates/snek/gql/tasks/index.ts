//#region > Imports
//> Sessions
// Contains the SNEK session
import { SnekSession } from "../../../../session/sessions";
//> Tasks
// Contains the SnekGqlAuth task
import SnekGqlAuthTasks from "./auth";
// Contains the SnekGqlGeneral task
import SnekGqlGeneralTasks from "./general";
// Contains the SnekGqlUser task
import SnekGqlUserTasks from "./user";
//#endregion

//#region > Interfaces
/**
 * @interface Response defines the basic response structure which fits all
 *                     graphql requests.
 */
interface IResponse {
  errors: [
    {
      message: string;
    }
  ];
}
//#endregion

//#region > Classes
/** @class A Template with initializes all tasks */
class SnekTasks {
  public general!: SnekGqlGeneralTasks;
  public auth!: SnekGqlAuthTasks;
  public user!: SnekGqlUserTasks;

  /**
   * @constructor
   * @author Nico Schett <contact@schett.net>
   * @param {string} session A session to initialize all corresponding tasks
   */
  constructor(session: SnekSession) {
    this.general = new SnekGqlGeneralTasks(session);
    this.auth = new SnekGqlAuthTasks(session);
    this.user = new SnekGqlUserTasks(session);
  }
}
//#endregion

//#region > Exports
export type { IResponse };
export default SnekTasks;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © Simon Prast
 */
