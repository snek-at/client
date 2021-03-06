//#region > Imports
//#PACKAGE "graphql-tag"
//## npm install "graphql-tag"@2.10.3
// Contains a gql tag for wrapping queries
import gql from "graphql-tag";
//#endregion

//#region > Queries
/**
 * List of GitLab server.
 *
 * @param {string} JWT A users JWT
 * @returns {string} A serialized JSON object with a list of GitLab server
 * @description A query to fetch all available GitLab server
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
 * List of page urls.
 *
 * @param {string} JWT A users JWT
 * @returns {string} A serialized JSON object with a list of all page urls
 * @description A query to fetch all pages urls
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
