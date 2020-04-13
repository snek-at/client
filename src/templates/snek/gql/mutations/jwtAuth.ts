import gql from 'graphql-tag';

/**
 * JWT Authentication:
 * Mutation to authenticate a user with username and password
 * 
 * @param {string} username Username of a user
 * @param {string} password Password of a user
 * @returns {string} JWT
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
 * JWT Refresh:
 * Mutation to refresh a JWT
 * 
 * @param {string} token A users JWT
 * @returns {string} Refresh conformation
 */
const refresh = gql`
  mutation refresh($refreshToken: String!) {
    refresh: refreshToken(refreshToken: $refreshToken) {
      payload
      token
      refreshToken
    }
  }
`
/**
 * JWT Verify:
 * Mutation to verify a JWT
 * 
 * @param {string} token A users JWT
 * @returns {string} Verify conformation
 */
const verify = gql`
  mutation verify($token: String!) {
    verify: verifyToken(token: $token) {
      payload
    }
  }
`;

/**
 * JWT Revoke:
 * Mutation to verify a JWT
 * 
 * @param {string} token A users JWT
 * @returns {string} Revoke conformation
 */
const revoke = gql`
  mutation revoke($refreshToken: String!) {
    revoke: revokeToken(refreshToken: $refreshToken) {
      revoked
    }
  }
`;


export { auth, refresh, verify, revoke };
