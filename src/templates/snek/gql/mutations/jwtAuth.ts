//#region > Imports
//#PACKAGE "graphql-tag"
//## npm install ""graphql-tag"@2.10.3
// Contains a gql tag for wrapping queries
import gql from "graphql-tag";
//#endregion

//#region > Queries
/**
 * JWT Authentication.
 *
 * @param {string} username Username of a user
 * @param {string} password Password of a user
 * @returns {string} A users JWT
 * @description A mutation to authenticate a user with username and password
 */
const auth = gql`
  mutation auth($username: String!, $password: String!) {
    auth: tokenAuth(username: $username, password: $password) {
      token
      refreshToken
      user {
        username
        firstName
        lastName
        email
        dateJoined
        lastLogin
      }
    }
  }
`;

/**
 * JWT Refresh.
 *
 * @param {string} token A users JWT
 * @returns {string} Refresh conformation
 * @description A mutation to refresh a JWT
 */
const refresh = gql`
  mutation refresh($refreshToken: String!) {
    refresh: refreshToken(refreshToken: $refreshToken) {
      payload
      token
      refreshToken
    }
  }
`;

/**
 * JWT Verify.
 *
 * @param {string} token A users JWT
 * @returns {string} Verify conformation
 * @description A mutation to verify a JWT
 */
const verify = gql`
  mutation verify($token: String!) {
    verify: verifyToken(token: $token) {
      payload
    }
  }
`;

/**
 * JWT Revoke.
 *
 * @param {string} token A users JWT
 * @returns {string} Revoke conformation
 * @description Mutation to revoke a JWT
 */
const revoke = gql`
  mutation revoke($refreshToken: String!) {
    revoke: revokeToken(refreshToken: $refreshToken) {
      revoked
    }
  }
`;
//#endregion

//#region > Exports
export { auth, refresh, verify, revoke };
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © Simon Prast
 */
