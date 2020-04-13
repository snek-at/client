import { SnekSession } from '../../../../session/sessions';
import { IResponse } from './index';
import { ISnekGqlTemplate } from '../index';

interface IRegistrationResponse extends IResponse {
  data: RegistrationData
}

interface RegistrationData {
  result: string,
  errors: [];
}

interface ICacheResponse extends IResponse {
  data: CacheData
}

interface CacheData {
  user: {
    platformData: string;
  }
}

interface IProfileResponse extends IResponse {
  data: ProfileData
}

interface ProfileData {
  username: string;
  verified: string;
  platformData: string;
  sources: string;
  bids: string;
  tids: string;
}


interface IWhoamiResponse extends IResponse {
  data: WhoamiData
}

interface WhoamiData {
  username: string
}

/** @class A set of session aware Tasks */
export class SnekGqlUserTasks {
  public template : ISnekGqlTemplate;
  /**
   * Creates an instance of a SessionTasks.
   *
   * @constructor
   * @author Nico Schett <contact@schett.net>
   * @param {string} session A session for the tasks
   */
  constructor(private session: SnekSession) { 
    this.template = session.template.snekGql;
  }

  /**
   * Register a user
   *
   * @returns {Promise<IRegistrationResponse>} A JWT token.
   */
  async registration(values: object): Promise<IRegistrationResponse> {
    /**
     * Refresh if session is not alive
     */
    await this.session.refresh();

    let query = this.template.mutations.user.registration;
    console.log(query)
    let response = <IRegistrationResponse>await this.session.ep.send("mutation", query, { token: this.session.token, values });
    return response;
  }

  /**
   * Cache a user
   *
   * @returns {Promise<ICacheResponse>} A JWT token.
   */
  async cache(platformData: string): Promise<ICacheResponse> {
    /**
     * Refresh if session is not alive
     */
    await this.session.refresh();

    let query = this.template.mutations.user.cache;
    let response = <ICacheResponse>await this.session.ep.send("mutation", query, { token: this.session.token, platformData });
    return response;
  }

  /**
   * Get profile.
   *
   * @param {string} url A url of a page.
   * @returns {Promise<IProfileResponse>} The page profile of a user.
   */
  async profile(url: string): Promise<IProfileResponse> {
    /**
     * Refresh if session is not alive
     */
    await this.session.refresh();

    let query = this.template.queries.user.profile;
    let response = <IProfileResponse>await this.session.ep.send("query", query, { url, token: this.session.token });

    return response;
  }

  /**
   * Whoami check
   * 
   * @returns {Promise<IWhoamiResponse>} User data.
   */
  async whoami(): Promise<IWhoamiResponse> {
    /**
    * Refresh if session is not alive
    */
    await this.session.refresh();

    let query = this.template.queries.user.whoami;
    let response = <IWhoamiResponse>await this.session.ep.send("query", query, { token: this.session.token });

    return response;
  }

}