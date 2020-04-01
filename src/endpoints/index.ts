import { Apollo } from './apollo';
import { DocumentNode } from 'graphql';

export interface IOptions {
    headers: object
}

export interface Endpoint {
    headers: {};
    desc: string;
    send:
    ((type: string, data: DocumentNode, variables?: object, headers?: object) => Promise<object>)
}

export { Apollo }