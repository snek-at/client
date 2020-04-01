import gql from 'graphql-tag';

/**
 * List of GitLab server:
 * Query to fetch all available GitLab server
 * 
 * @param {string} JWT A users JWT
 * @return {string} A serialized JSON object with a list of GitLab server
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

export { gitlabServer }