/**
 * All types
 */

export { ApolloResult } from "../../endpoints/index";
export { User } from "../../session";

export type TaskTypes = "query" | "mutation";

/**
 * All graphql response types for authentication related requests.
 */
//#region > Interfaces
/**
 * @interface GraphQLAuthentication defines the structure of the authentication
 *                                  result data.
 */
export interface GraphQLAuthentication {
  auth: {
    token: string;
    refreshToken: string;
    user: {
      username: string;
    };
  };
}

/**
 * @interface GraphQLRefresh defines the structure of the refresh  result data
 */
export interface GraphQLRefresh {
  refresh: {
    payload: string;
    token: string;
    refreshToken: string;
  };
}

/**
 * @interface GraphQLRevoke defines the structure of the revoke result data
 */
export interface GraphQLRevoke {
  revoke: {
    revoked: string;
  };
}

/** @interface GraphQLWhoami defines the structure of a whoami data */
export interface GraphQLWhoami {
  whoami: { username: string };
}
//#endregion
