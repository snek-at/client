//#region > Imports
//#PACKAGE "graphql"
// Contains the interface for gql queries, mutations and subscriptions
import { DocumentNode } from "graphql";

//> Mutations
import * as mutationsAuth from "../mutations/auth";
//> Queries
import * as queriesUser from "../queries/user";
//> Types
// Contains the graphql response types
import { ApolloResult, TaskTypes } from "../types";
// Contains error handling for tasks
import { TaskError } from "../errors";
import AuthTask from "./auth";
import UserTask from "./user";

class MainTask extends TaskError {
  public mutations: { jwtAuth: typeof mutationsAuth } = {
    jwtAuth: require("../mutations/auth"),
  };
  public queries: { user: typeof queriesUser } = {
    user: require("../queries/user"),
  };
  public set = {
    auth: new AuthTask(this),
    user: new UserTask(this),
  };

  async run<T>(
    type: TaskTypes,
    query: DocumentNode,
    variables: { [key: string]: any }
  ): Promise<ApolloResult<T>> {
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

    return response;
  }
}

//#region > Exports
export default MainTask;
//#endregion
