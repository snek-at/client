import { Endpoint } from '../endpoints';
import { IMainTemplate } from '../templates/index';
export interface UserData {
    firstName?: string;
    lastName?: string;
    ownedPages?: string;
    email?: string;
    dateJoined?: string;
    lastLogin?: string;
}
export interface IAuth {
    token: string;
    refreshToken: string;
}
export interface User {
    username: string;
    password: string;
}
export interface ISession {
    sessions: {
        [id: string]: ISession;
    };
    token: string | undefined;
    tokenName: string;
}
export declare class Session implements ISession {
    private sId;
    ep: Endpoint;
    template: IMainTemplate;
    sessions: {
        [id: string]: ISession;
    };
    token: string | undefined;
    tokenName: string;
    constructor(sId: string, ep: Endpoint, template: IMainTemplate);
    addSubSession(childSId: string, type?: any): void;
    isAlive(): boolean;
}
