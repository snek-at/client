import { Endpoint } from '../endpoints';
import { cookieChecker, getCookie, setCookie, deleteCookie } from './cookie-utils';
import { IMainTemplate } from '../templates/index';
import { GithubSession } from './sessions';
import { DocumentNode } from 'graphql';

export interface UserData {
  firstName?: string;
  lastName?: string;
  ownedPages?: string;
  email?: string;
  dateJoined?: string;
  lastLogin?: string;
}

export interface IAuth {
  token: string;
  refreshToken: string;
}

export interface User {
  username: string;
  password: string;
}

export interface ISession {
  sessions: { [id: string]: ISession; };
  token: string | undefined;
  tokenName: string;
  send(token: string, data: DocumentNode, variables?: object): Promise<object>;
}

/**@description A Session */
export class Session implements ISession {
  public sessions: { [id: string]: ISession; } = {};
  public token: string | undefined = "";
  public tokenName: string = "token";

  /**
   * Creates an instance of a Session.
   *
   * @constructor
   * @author: schettn
   * @param {string} ep A endpoint
   * @param {string} template A template set
   */
  constructor(private sId: string, public ep: Endpoint) { }

  /**
   * Add a  subSession.
   * 
   * @description Add a subSession to a session.
   * @param childSId The session name of the child.
   * @param {any} type Specify the session (Session | string)
   * @param permanent True if not set.
   */
  addSubSession(childSId: string, Type: any = Session, template: any) {
    let session: ISession;
    if (Type === "githubsession") {
      session = new GithubSession(this.sId + "_" + childSId, this.ep, template);
    } else {
      session = new Type(this.sId + "_" + childSId, this.ep, template);
    }
    this.sessions[childSId] = session;
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
  * Is alive check.
  * 
  * @description A status whether the token is alive or not.
  * @param {boolean} alive A status.
  */
  isAlive() {
    return cookieChecker(this.tokenName);
  }
}