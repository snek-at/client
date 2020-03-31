import { SnekGqlAuthTasks } from './auth';
import { SnekSession } from '../../../../session/sessions';
export declare class SnekTasks {
    auth: SnekGqlAuthTasks;
    constructor(session: SnekSession);
}
