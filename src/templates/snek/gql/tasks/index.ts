import { SnekGqlAuthTasks } from './auth';
import { SnekSession } from '../../../../session/sessions';

export class SnekTasks{
    public auth!: SnekGqlAuthTasks
    constructor(session: SnekSession){
        this.auth = new SnekGqlAuthTasks(session);
    }
}
