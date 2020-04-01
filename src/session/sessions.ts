import { Session, IAuth, User, UserData } from './index';
import { IMainTemplate } from '../templates/index';
import { SnekTemplate } from '../templates/snek/index';
import { SnekGqlAuthTasks } from '../templates/snek/gql/tasks/auth';
import { cookieChecker, getCookie, setCookie, deleteCookie } from './cookie-utils';
import { Endpoint } from '../../src/endpoints/index';
import { SnekTasks } from '../templates/snek/gql/tasks/index';
import { DocumentNode } from 'graphql';

export class GithubSession extends Session {
  constructor(sId: string, ep: Endpoint, template: IMainTemplate) {
    super(sId, ep, template)
  }
}

export class SnekSession extends Session {
  public refreshToken: string | undefined = "";
  public refreshTokenName: string = "refresh";
  public sessionTemplate: SnekTemplate;
  /**
   * Define tasks
   */
  public tasks!: SnekTasks;

  constructor(sId: string, ep: Endpoint, template: IMainTemplate) {
    super(sId, ep, template)

    this.tokenName = sId + "-" + this.tokenName;
    this.refreshTokenName = sId + "-" + this.refreshTokenName;

    this.sessionTemplate = <SnekTemplate>template.snek;
    this.tasks = new SnekTasks(this);
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
      console.log(response, response.data.auth);
      this.initTokens(<IAuth>response.data.auth);
      return <UserData>response.data.auth.user;
    }

    /**
     * Whoami
     * Get user data
     */
    response = await this.tasks.auth.whoami();
    return <UserData>await response.data.whoami;

  }

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
      this.initTokens(response.data.refresh);
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