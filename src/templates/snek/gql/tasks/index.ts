//#region > Imports
//#PACKAGE "graphql"
//## npm install "graphql"@14.6.0
// Contains the interface for gql queries, mutations and subscriptions
import { DocumentNode } from "graphql";

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
// Contains error handling for tasks
import { TaskError } from "../errors";
//> Interfaces
// Contains the snek template
import { SnekGqlTemplate } from "../index";
//> Types
// Contains the type declaration for apollo results
import { ApolloResult } from "../index";
//#endregion

//#region > Classes
/** @class A Template with initializes all tasks */
class SnekTasks extends TaskError {
  public template!: SnekGqlTemplate;
  public general!: SnekGqlGeneralTasks;
  public auth!: SnekGqlAuthTasks;
  public user!: SnekGqlUserTasks;

  /**
   * @constructor
   * @author Nico Schett <contact@schett.net>
   * @param {string} session A session to initialize all corresponding tasks
   */
  constructor(session: SnekSession) {
    super(session);

    this.template = session.template.snekGql;

    /* init tasks */
    this.general = new SnekGqlGeneralTasks(this);
    this.auth = new SnekGqlAuthTasks(this);
    this.user = new SnekGqlUserTasks(this);
  }

  async run<T>(type: string, query: DocumentNode, variables: object) {
    let response: ApolloResult<T>;

    if (type === "query") {
      response = await this.session.ep.sendQuery<T>(query, variables);
    } else if (type === "mutation") {
      response = await this.session.ep.sendMutation<T>(query, variables);
    } else {
      console.warn(
        "No query type specified! Please re-check." +
          "Selecting type 'query' as default"
      );
      response = await this.session.ep.sendQuery<T>(query, variables);
    }

    this.handleErrors(response);

    return response;
  }
}
//#endregion

//#region > Exports
export type { ApolloResult };
export default SnekTasks;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © Simon Prast
 */
