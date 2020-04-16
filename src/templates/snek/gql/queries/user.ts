//#region > Imports
//> Graphql
// Contains a a gql tag for wrapping queries
import gql from "graphql-tag";
//#endregion

//#region > Queries
/** 
 * Whoami:
 * Query to fetch the username of the according token
 * 
 * @deprecated since 1.0 use jwtAuth instead
 * @param {string} token A users JWT
 * @returns {string} Username
*/
const whoami = gql`
  query whoami($token: String!) {
    whoami: me(token: $token) {
      username
      firstName
      lastName
      email
      dateJoined
      lastLogin
    }
  }
`;

/** 
 * Get user profile:
 * Query to fetch profile data
 * 
 * @param {string} url PageUrl of a user profile
 * @param {string} token  A users JWT
 * @returns {string} Profile page of a user
*/
const profile = gql`
  query profile($url: String!, $token: String!) {
    profile: page(url: $url, token: $token) {
      ... on ProfileProfilePage {
        username
        firstName
        lastName
        email
        verified
        platformData
        sources
        bids
        tids
      }
    }
  }
`;
//#endregion

//#region > Exports
export { whoami, profile};
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © Simon Prast
 */
