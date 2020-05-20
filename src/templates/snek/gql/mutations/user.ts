//#region > Imports
//#PACKAGE "graphql-tag"
//## nmp install ""graphql-tag"@2.10.3
// Contains a gql tag for wrapping queries
import gql from "graphql-tag";
//#endregion

//#region > Queries
/**
 * User registration.
 *
 * @param {string} token A users JWT
 * @param {string} values Registration parameters defined by registration page
 * @returns {string} Registration conformation
 * @description A mutation to register a user by providing values and a valid
 *              JWT. This could be a JWT of the anonymous user.
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
 * Cache user.
 *
 * @param {string} token A users JWT
 * @param {string} platformData A serialized JSON object of all generated user
 *                              data.
 * @returns {string} PlatformData of a user
 * @description A mutation to cache user information server side
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
