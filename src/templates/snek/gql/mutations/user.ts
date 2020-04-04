import gql from 'graphql-tag';

/** 
 * Register user:
 * Mutation to register a user
 * 
 * @param {string} token A users JWT
 * @param {string} values Registration parameters defined by registration page
 * @return {string} Registration conformation
*/
const registration = gql`
  mutation registration($token: String!, $values: GenericScalar!) {
    registration: registrationRegistrationFormPage(token: $token, url: "/registration", values: $values) {
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
 * @return {string} PlatformData of a user
*/
const cache = gql`
  mutation cache ($token: String!, $platformData: String!) {
    cache: cacheUser(token: $token, platformData: $platformData){
      user{
        platformData
      }
    }
  }
`;

export { registration, cache };