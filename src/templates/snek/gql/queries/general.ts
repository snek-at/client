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
    page(slug: "registration", token: $token) {
      ... on RegistrationFormPage {
        supportedGitlabs {
          ... on Gitlab_Server {
            id
            organisation
            domain
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

/**
 * List of user page urls.
 *
 * @param {string} JWT A users JWT
 * @returns {string} A serialized JSON object with a list of all page urls
 * @description A query to fetch all user page urls
 */
const allUserPageUrls = gql`
  query userPages($token: String!) {
    page(slug: "user", token: $token) {
      children {
        url
      }
    }
  }
`;
//#endregion

//#region > Exports
export { gitlabServer, allPageUrls, allUserPageUrls };
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © Simon Prast
 */
