import { Endpoint } from './endpoints/index';
import { Session } from './session/index';
import { IMainTemplate } from './templates/index';
interface IEndpoint {
    url: string;
    type: string;
    headers: object;
}
interface IClient {
    headers: object;
    template: IMainTemplate;
    endpoint: Endpoint;
}
export declare class Client implements IClient {
    endpoint: Endpoint;
    template: IMainTemplate;
    session: Session;
    private _headers;
    get headers(): object;
    set headers(value: object);
    constructor(ep: IEndpoint);
}
export {};
