//#region > Imports
//> Graphql
// Contains a a gql tag for wrapping queries
import gql from "graphql-tag";
//#endregion

//#region > Queries
/**
 * Register user:
 * Mutation to register a user
 *
 * @param {string} token A users JWT
 * @param {string} values Registration parameters defined by registration page
 * @returns {string} Registration conformation
 */
const registration = gql`
  mutation registration($token: String!, $values: GenericScalar!) {
    registration: registrationRegistrationFormPage(
      token: $token
      url: "/registration"
      values: $values
    ) {
      result
      errors {
        name
        errors
      }
    }
  }
`;

/**
 * Cache user:
 * Mutation to cache user information server side
 *
 * @param {string} token A users JWT
 * @param {string} platformData A serialized JSON object of all generated user data
 * @returns {string} PlatformData of a user
 */
const cache = gql`
  mutation cache($token: String!, $platformData: String!) {
    cache: cacheUser(token: $token, platformData: $platformData) {
      user {
        id
      }
    }
  }
`;
//#endregion

//#region > Exports
export { registration, cache };
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © Simon Prast
 */
