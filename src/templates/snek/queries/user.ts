//#region > Imports
//#PACKAGE "graphql-tag"
// Contains a gql tag for wrapping queries
import gql from "graphql-tag";
//#endregion

//#region > Queries
/**
 * Whoami.
 *
 * @param {string} token A users JWT
 * @returns {string} A username
 * @description A query to fetch the username of the according token
 */
const whoami = gql`
  query whoami($token: String!) {
    whoami: me(token: $token) {
      username
    }
  }
`;
//#endregion

//#region > Exports
export { whoami };
//#endregion
