import { Session, IAuth, User, UserData } from './index';
import { IMainTemplate } from '../templates/index';
import { SnekTemplate } from '../templates/snek/index';
import { Endpoint } from '../../src/endpoints/index';
import { SnekTasks } from '../templates/snek/gql/tasks/index';
export declare class SnekSession extends Session {
    refreshToken: string | undefined;
    refreshTokenName: string;
    sessionTemplate: SnekTemplate;
    tasks: SnekTasks;
    constructor(sId: string, ep: Endpoint, template: IMainTemplate);
    initTokens(auth: IAuth): void;
    wasAlive(): boolean;
    begin(user?: User): Promise<UserData>;
    refresh(): Promise<void>;
    end(): Promise<void>;
}
