import { SnekGqlAuthTasks } from './auth';
import { SnekSession } from '../../../../session/sessions';
import { SnekGqlGeneralTasks } from './general';
import { SnekGqlUserTasks } from './user';


export interface IResponse {
  errors: []
}

/**
 * @description A Template with initializes all tasks.
 */
export class SnekTasks {
  public general!: SnekGqlGeneralTasks
  public auth!: SnekGqlAuthTasks
  public user!: SnekGqlUserTasks

  constructor(session: SnekSession) {
    this.general = new SnekGqlGeneralTasks(session);
    this.auth = new SnekGqlAuthTasks(session);
    this.user = new SnekGqlUserTasks(session);
  }
}
