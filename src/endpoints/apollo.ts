//#region > Imports
//> Apollo Client
// Contains the client for graphql handeling
import { ApolloClient } from "apollo-client";
//> Apollo Link
// Contains the link for the apollo client
import { HttpLink } from "apollo-link-http";
//> Apollo Cache
// Contains cache handeling for apollo
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
  NormalizedCacheObject,
} from "apollo-cache-inmemory";
//> Interfaces
// Contains the interface for gql queries, mutations and subscriptions
import { DocumentNode } from "graphql";
// Contains the interface for the Apollo endpoint and the Apollo options
import { ApolloEndpoint, IOptions } from "./index";
//#endregion

//#region > Classes
/** @class Apollo client for graphql handeling. */
class Apollo implements ApolloEndpoint {
  //> Fields
  private link: HttpLink;
  private cache: InMemoryCache;
  private client: ApolloClient<NormalizedCacheObject>;

  headers: object;
  desc: string = "Apollo Endpoint";

  /**
   * Creates a Apollo instance.
   *
   * @constructor
   * @author Nico Schett <contact@schett.net>
   * @param uri A uri of a graphql endpoint.
   * @param options Configuration options.
   */
  constructor(uri: string, options: IOptions) {
    this.headers = options.headers;
    const fragmentMatcher = new IntrospectionFragmentMatcher({
      introspectionQueryResultData: {
        __schema: {
          types: [],
        },
      },
    });

    try {
      this.cache = new InMemoryCache({ fragmentMatcher });
    } catch {
      throw new Error("An error occurred when initializing cache!");
    }

    try {
      this.link = new HttpLink({
        uri,
        headers: options.headers,
      });
    } catch {
      throw new Error("An error occurred when initializing the API link!");
    }

    try {
      this.client = new ApolloClient({
        cache: this.cache,
        link: this.link,
      });
    } catch {
      throw new Error("An error occurred when initializing headers!");
    }
  }

  //> Methods
  async send(
    type: string,
    data: DocumentNode,
    variables?: object,
    headers?: object
  ) {
    switch (type) {
      case "query":
        return this.client.query({
          query: data,
          errorPolicy: "ignore",
          variables,
          context: {
            headers: { ...this.headers, ...headers },
          },
        });

      case "subscription":
        break;

      case "mutation":
        return this.client.mutate({
          mutation: data,
          errorPolicy: "ignore",
          variables,
          context: {
            headers: this.headers,
          },
        });
    }

    return new Error("No valid query type specified!");
  }
}
//#endregion

//#region > Exports
export default Apollo;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © Simon Prast
 */
