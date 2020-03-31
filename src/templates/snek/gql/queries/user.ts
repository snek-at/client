import gql from 'graphql-tag';

/** 
 * Whoami:
 * Query to fetch the username of the according token
 * 
 * @deprecated since 1.0 use jwtAuth instead
 * @param {string} token A users JWT
 * @return {string} Username
*/
const whoami = gql`
  query whoami($token: String!) {
    whoami: me(token: $token) {
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
 * @return {string} Profile page of a user
*/
const profile = gql`
  query profile($url: String!, $token: String!) {
    profile: page(url: $url, token: $token) {
      ... on ProfileProfilePage {
        username
        verified
        platformData
        sources
        bids
        tids
      }
    }
  }
`;

export { whoami, profile};
