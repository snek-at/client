import { DocumentNode } from "graphql";
import { Endpoint, IOptions } from './index';
export declare class Apollo implements Endpoint {
    private link;
    private cache;
    private client;
    headers: object;
    desc: string;
    constructor(uri: string, options: IOptions);
    send(type: string, data: DocumentNode, variables?: object): Promise<Error | import("apollo-client").ApolloQueryResult<any> | import("apollo-link").FetchResult<any, Record<string, any>, Record<string, any>>>;
}
