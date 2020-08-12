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

/**
 * Get user profile.
 *
 * @param {string} slug Slug: <user_<username>>
 * @param {string} token A users JWT
 * @returns {string} A profile page of a user
 * @description A query to fetch profile data
 */
const profile = gql`
  query profile($username: String!, $token: String!) {
    profile: user(username: $username, token: $token) {
      username
      firstName
      lastName
      email
      verified: isActive
      personpage {
        title
        tids
        bids
      }
      platformData: cache
      sources
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
