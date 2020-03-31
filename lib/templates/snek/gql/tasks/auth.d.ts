import { User } from '../../../../session';
import { SnekSession } from '../../../../session/sessions';
interface IAuthResponse {
    data: {
        auth: {
            token: string;
            refreshToken: string;
            user: {
                username: string;
            };
        };
    };
}
interface IRefreshResponse {
    data: {
        refresh: {
            payload: string;
            token: string;
            refreshToken: string;
        };
    };
}
interface IRevokeResponse {
    data: {
        revoke: {
            revoked: string;
        };
    };
}
interface IWhoami {
    data: {
        whoami: {
            username: string;
        };
    };
}
export declare class SnekGqlAuthTasks {
    private session;
    constructor(session: SnekSession);
    anon(): Promise<IAuthResponse>;
    nonanon(user: User): Promise<IAuthResponse>;
    refresh(): Promise<IRefreshResponse>;
    revoke(): Promise<IRevokeResponse>;
    whoami(): Promise<IWhoami>;
}
export {};
