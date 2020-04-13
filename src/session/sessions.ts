import { Session, IAuth, User, UserData } from './index';
import { IMainTemplate } from '../templates/index';
import { SnekTemplate } from '../templates/snek/index';
import { cookieChecker, getCookie, setCookie, deleteCookie } from './cookie-utils';
import { ApolloEndpoint } from '../../src/endpoints/index';
import { SnekTasks } from '../templates/snek/gql/tasks/index';
import { DocumentNode } from 'graphql';

/**@description A Github subSession  */
export class GithubSession extends Session {
  /**
   * Creates an instance of a GithubSession.
   * 
   * @constructor
   * @param {string} sId A session name
   * @param {Endpoint} ep A endpoint
   * @param {IMainTemplate} template A template set 
   */
  constructor(sId: string, public ep: ApolloEndpoint, public template: IMainTemplate) {
    /**
     * TODO: Change template set to github
     */
    super(sId)
  }

  /**
   * Sned query:
   * 
   * @description Send a query to the endpoint.
   * @param {string} token A authentication token.
   * @param {DocumentNode} data A DocumentNode with a query.
   * @param {object} variables A abject with variables.
   */
  async send(token: string, data: DocumentNode, variables?: object) {
    let headers = {
      authorization: token
    };

    return this.ep.send("query", data, variables, headers)
  }
}

/**@description A Snek subSession  */
export class SnekSession extends Session {
  public refreshToken: string | undefined = "";
  public refreshTokenName: string = "refresh";

  /**
   * Define tasks
   */
  public tasks: SnekTasks;

  /**
   * Creates an instance of a SnekSession.
   * 
   * @constructor
   * @param {string} sId A session name
   * @param {Endpoint} ep A endpoint
   * @param {SnekTemplate} template A template set 
   */
  constructor(sId: string, public ep: ApolloEndpoint, public template: SnekTemplate) {
    super(sId)
    this.tokenName = sId + "-" + this.tokenName;
    this.refreshTokenName = sId + "-" + this.refreshTokenName;

    this.tasks = new SnekTasks(this);
  }

  /**
   * Sned query:
   * 
   * @description Send a query to the endpoint.
   * @param {string} token A authentication token.
   * @param {DocumentNode} data A DocumentNode with a query.
   * @param {object} variables A abject with variables.
   */
  async send(token: string, data: DocumentNode, variables?: object) {
    let headers = {
      authorization: token
    };

    return this.ep.send("query", data, variables, headers)
  }

  /**
   * Initialize tokens.
   *
   * @param {IAuth} auth A Auth object (token, refreshToken).
   */
  initTokens(auth: IAuth) {
    console.log(auth)
    this.token = auth.token;
    this.refreshToken = auth.refreshToken;

    setCookie(this.tokenName, this.token, 5 * 60);
    setCookie(this.refreshTokenName, this.refreshToken, 7 * 24 * 60 * 60);
  }

  /**
   * Was alive check.
   * 
   * @description Refresh token status check.
   * @param {boolean} alive A status whether the refresh token is alive or not 
   */
  wasAlive() {
    return cookieChecker(this.refreshTokenName);
  }

  /**
   * Is alive check.
   *
   * @description Token and refresh token status check.
   * @param {boolean} alive A status whether the token and refresh token is alive or not
   */
  isAlive() {
    if (cookieChecker(this.refreshTokenName) && super.isAlive()) {
      return true;
    }
    return false;
  }

  /**
   * Begin session.
   *
   * @param {string} user A User defined by username and password.
   * @return {UserData} A UserData object.
   */
  async begin(user?: User) {
    let response;

    if (!user && this.wasAlive()) {
      /**
       * Refresh tokens
       */
      //this.refresh(); !!!!!!!!!!!!!!!!!
    } else {
      if (!user) {
        /**
         * Anon login
         * Authenticate anonymous user
         */
        response = await this.tasks.auth.anon();
      } else {
        /**
         * Nonanon login
         * Authenticate real user
         */
        console.log("before ")
        response = await this.tasks.auth.nonanon(user);
      }
      /**
       * Set tokens
       */

      console.log(response, <IAuth>response.data.auth);
      if (response.errors) {
        throw new Error(JSON.stringify(response.errors))
      }

      this.initTokens(response.data.auth);
      console.log(response.data.auth.user, response.data)
      return <UserData>response.data.auth.user;
    }

    /**
     * Whoami
     * Get user data
     */
    console.log("start whoami")
    response = await this.tasks.user.whoami();
    console.log(response)
    return <UserData>response.data;

  }

  // JEDEN TASK IMPLEMENTIEREN????
  // /**
  //  * Register user
  //  * 
  //  * @param {string} user A User defined by username and password.
  //  * @return {boolean} status
  // */
  // async register(values: object) {
  //   let response = await this.tasks.user.registration(values);
  //   return response.registration;
  // }

  /**
   * Refresh cookie:
   * Refreshes the snek_jwt
   */
  async refresh() {
    if (!this.isAlive()) {
      /**
       * Refresh token with refreshToken
       */
      this.refreshToken = getCookie(this.refreshTokenName);
      let response = await this.tasks.auth.refresh();
      if (response.errors) {
        //console.error(response.errors);
        throw new Error(JSON.stringify(response.errors))
      }
      console.log(response)
      this.initTokens(response.data.refresh);
    } else if (!this.token) {
      if (cookieChecker(this.tokenName)) {
        this.token = getCookie(this.tokenName);
      }
    }
  }

  /**
   * End session:
   * End session by reset jwt and deleting cookie
   */
  async end() {
    /**
     * Revoke token
     */
    let response = await this.tasks.auth.revoke();
    console.log(response.data.revoke.revoked);
    /**
     * Reset token
     */
    this.token = "";
    this.refreshToken = "";
    /**
     * Delete cookie
     */
    deleteCookie(this.tokenName)
    deleteCookie("refresh-" + this.refreshToken)
  }
}
