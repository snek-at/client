import { SnekSession } from '../../../../session/sessions';

interface ICache {
  cache: {
    user: {
      platformData: string;
    }
  }
}

/** @class A set of session aware Tasks */
export class SnekGqlUserTasks {
  /**
   * Creates an instance of a SessionTasks.
   *
   * @constructor
   * @author: schettn
   * @param {string} session A session for the tasks
   */
  constructor(private session: SnekSession) { }

  /**
   * Register a user
   *
   * @return {Promise<IAuthResponse>} A JWT token.
   */
  async cache(platformData: string) {
    /**
     * Refresh if session is not alive
     */
    this.session.refresh();

    let query = this.session.template.snek.snekGql.mutations.user.registration;
    let response = <ICache>await this.session.ep.send("query", query, { token: this.session.token, platformData });
    return response;
  }

}