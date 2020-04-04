import { SnekSession } from '../../../../session/sessions';
import { ISnekGqlTemplate } from '../index';

interface IGitlabServerResponse {
  data: { page: GitlabServerData }
}

interface GitlabServerData {
  supportedGitlabs: []
}

/** @class A set of session aware Tasks */
export class SnekGqlGeneralTasks {
  public template: ISnekGqlTemplate;
  /**
   * Creates an instance of a SessionTasks.
   *
   * @constructor
   * @author: schettn
   * @param {string} session A session for the tasks
   */
  constructor(private session: SnekSession) {
    this.template = session.template.snekGql;
  }

  /**
   * Gitlab Server
   *
   * @return {Promise<IGitlabServerResponse>} A list of Gitlab server.
   */
  async gitlabServer(): Promise<IGitlabServerResponse> {
    /**
     * Refresh if session is not alive
     */
    await this.session.refresh();

    let query = this.template.queries.general.gitlabServer;
    let response = <IGitlabServerResponse>await this.session.ep.send("query", query, { token: this.session.token });

    return response;
  }

}