import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
  NormalizedCacheObject
} from "apollo-cache-inmemory";
import { DocumentNode } from "graphql";
import { Endpoint, IOptions } from './index';

export class Apollo implements Endpoint {
  private link: HttpLink;
  private cache: InMemoryCache;
  private client: ApolloClient<NormalizedCacheObject>;

  public headers: object;
  public desc: string = "Apollo Endpoint";

  constructor(uri: string, options: IOptions) {
    this.headers = options.headers;

    const fragmentMatcher = new IntrospectionFragmentMatcher({
      introspectionQueryResultData: {
        __schema: {
          types: []
        }
      }
    });

    try {
      this.cache = new InMemoryCache({ fragmentMatcher });
    } catch {
      throw new Error("An error occurred when initializing cache!");
    }


    try {
      this.link = new HttpLink({
        uri,
        headers: options.headers
      });
    } catch {
      throw new Error("An error occurred when initializing the API link!");
    }

    try {
      this.client = new ApolloClient({
        cache: this.cache,
        link: this.link
      });
    } catch {
      throw new Error("An error occurred when initializing headers!");
    }
  }

  public async send(type: string, data: DocumentNode, variables?: object) {
    switch (type) {
      case "query":
        return this.client.query({
          query: data,
          errorPolicy: "ignore",
          variables,
          context: {
            headers: this.headers
          }
        });

      case "subscription":
        break;

      case "mutation":
        return this.client.mutate({
          mutation: data,
          errorPolicy: "ignore",
          variables,
          context: {
            headers: this.headers
          }
        });
    }
    return new Error("No valid query type specified!");
  }
}

