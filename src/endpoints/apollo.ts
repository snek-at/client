//#region > Imports
//#PACKAGE "apollo-client"
//## nmp install "apollo-client"@2.6.8
// Contains the client for graphql handling
import { ApolloClient } from "apollo-client";
//#PACKAGE "apollo-link-http"
//## nmp install "apollo-link-http"@1.5.16
// Contains the link for the apollo client
import { HttpLink } from "apollo-link-http";
//#PACKAGE "apollo-cache-inmemory"
//## nmp install "apollo-cache-inmemory"@1.6.5
// Contains cache handling for apollo
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
  NormalizedCacheObject,
} from "apollo-cache-inmemory";
//#PACKAGE "graphql"
//## nmp install "graphql"@14.6.0
// Contains the interface for gql queries, mutations and subscriptions
import { DocumentNode } from "graphql";

// Contains the interface for the Apollo endpoint and the Apollo options
import { ApolloEndpoint, Options } from "./index";
//#endregion

//#region > Classes
/** @class Apollo client for graphql handling */
class Apollo implements ApolloEndpoint {
  //> Fields
  private link: HttpLink;
  private cache: InMemoryCache;
  private client: ApolloClient<NormalizedCacheObject>;

  public headers: object;
  public desc: string = "A endpoint used for APIv4 requests";

  /**
   * @constructor
   * @author Nico Schett <contact@schett.net>
   * @param uri A uri of a graphql endpoint
   * @param options Configuration options
   */
  constructor(uri: string, options: Options) {
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
      throw new Error("An error occurred while initializing the cache!");
    }

    try {
      this.link = new HttpLink({
        uri,
        headers: options.headers,
      });
    } catch {
      throw new Error("An error occurred while initializing the API link!");
    }

    try {
      this.client = new ApolloClient({
        cache: this.cache,
        link: this.link,
      });
    } catch {
      throw new Error("An error occurred while initializing the headers!");
    }
  }

  //> Methods
  /**
   * Send: Provides requests for various graphql types.
   *
   * @param {string} type The type of the action you want to perform.
   *                      Query, Mutation,...
   * @param {DocumentNode} data The query structure
   * @param {object} variables A object which contains variables for the query
   *                           structure.
   * @param {object} headers Optional headers which get appended to the endpoint
   *                         headers.
   * @returns {Promise<object>} Resolved apollo data object
   */
  async send(
    type: string,
    data: DocumentNode,
    variables?: object,
    headers?: object
  ): Promise<object> {
    switch (type) {
      case "query":
        return this.client.query({
          query: data,
          errorPolicy: "all",
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
          errorPolicy: "all",
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
