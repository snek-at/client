//#region > Imports
//#PACKAGE "graphql-tag"
//## npm install "graphql-tag"@2.10.3
// Contains a gql tag for wrapping queries
import gql from "graphql-tag";
//#endregion

//#region > Queries
/**
 * Whoami.
 *
 * @deprecated since 1.0 use jwtAuth instead
 * @param {string} token A users JWT
 * @returns {string} A username
 * @description A query to fetch the username of the according token
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
 * Get user profile.
 *
 * @param {string} url PageUrl of a user profile
 * @param {string} token A users JWT
 * @returns {string} A profile page of a user
 * @description A query to fetch profile data
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
export { whoami, profile };
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © Simon Prast
 */
