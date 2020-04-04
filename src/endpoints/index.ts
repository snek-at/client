import { Apollo } from './apollo';
import { DocumentNode } from 'graphql';

export interface IOptions {
    headers: object
}

export interface ApolloEndpoint {
    headers: {};
    desc: string;
    send:
    ((type: string, data: DocumentNode, variables?: object, headers?: object) => Promise<object>)
}

export interface ScraperEndpoint {
    headers: {};
    desc: string;
    getJson<T>(url: string): Promise<T>;
    getDom(url: string): Promise<Document>;
}

export { Apollo }