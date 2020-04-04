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