//#region > Imports
//> Graphql
// Contains a a gql tag for wrapping queries
import gql from "graphql-tag";
//#endregion

//#region > Queries
/**
 * List of GitLab server:
 * Query to fetch all available GitLab server
 *
 * @param {string} JWT A users JWT
 * @returns {string} A serialized JSON object with a list of GitLab server
 */
const gitlabServer = gql`
  query gitLabServers($token: String!) {
    page(url: "/registration", token: $token) {
      ... on RegistrationRegistrationFormPage {
        supportedGitlabs {
          ... on RegistrationGitlab_Server {
            organisation
            domain
            field
          }
        }
      }
    }
  }
`;

/**
 * List of page urls:
 * Query to fetch all pages urls
 *
 * @param {string} JWT A users JWT
 * @returns {string} A serialized JSON object with a list of all page urls
 */
const allPageUrls = gql`
  query pages($token: String!) {
    pages(token: $token) {
      urlPath
    }
  }
`;
//#endregion

//#region > Exports
export { gitlabServer, allPageUrls };
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © Simon Prast
 */
