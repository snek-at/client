import { SnekSession } from '../../../../session/sessions';

interface IRegistration {
  registration: {
    result: string,
    errors: [];
  }
}

/** @class A set of session aware Tasks */
export class SnekGqlGeneralTasks {
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
  async registration(values: object) {
    /**
     * Refresh if session is not alive
     */
    this.session.refresh();

    let query = this.session.template.snek.snekGql.mutations.user.registration;
    let response = <IRegistration>await this.session.ep.send("query", query, { token: this.session.token, values });
    return response;
  }

}