//#region > Imports
//#PACKAGE "apollo-client"
//## npm install "apollo-client"@2.6.8
// Contains the client for graphql handling
import { ApolloClient } from "apollo-client";
//#PACKAGE "apollo-link-http"
//## npm install "apollo-link-http"@1.5.16
// Contains the link for the apollo client
import { HttpLink } from "apollo-link-http";
//#PACKAGE "apollo-cache-inmemory"
//## npm install "apollo-cache-inmemory"@1.6.5
// Contains cache handling for apollo
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
  NormalizedCacheObject,
} from "apollo-cache-inmemory";
//#PACKAGE "graphql"
//## npm install "graphql"@14.6.0
// Contains the interface for gql queries, mutations and subscriptions
import { DocumentNode } from "graphql";

//> Interfaces
// Contains the interface for the Apollo endpoint and the Apollo options
import { ApolloEndpoint, Options } from "./index";
//> Types
// Contains the type declarations for Apollo results
import { ApolloResult } from "./index";
//#endregion

//#region > Classes
/** @class Apollo client for graphql handling */
class Apollo implements ApolloEndpoint {
  //> Fields
  private link: HttpLink;
  private cache: InMemoryCache;
  private client: ApolloClient<NormalizedCacheObject>;

  headers: object;
  desc: string = "A endpoint used for APIv4 requests";

  /**
   * Initializes a Apollo client.
   *
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
      //#ERROR
      throw new Error("An error occurred while initializing the cache!");
    }

    try {
      this.link = new HttpLink({
        uri,
        headers: options.headers,
      });
    } catch {
      //#ERROR
      throw new Error("An error occurred while initializing the API link!");
    }

    try {
      this.client = new ApolloClient({
        cache: this.cache,
        link: this.link,
      });
    } catch {
      //#ERROR
      throw new Error("An error occurred while initializing the headers!");
    }
  }

  /**
   * Send: Provides requests for graphql queries.
   *
   * @param {DocumentNode} data The query structure
   * @param {object} variables A object which contains variables for
   *                           the query structure.
   * @param {object} headers Optional headers which get appended to
   *                         the endpoint headers.
   * @returns {Promise<ApolloResult<T>>} Resolved apollo data object
   */
  async sendQuery<T>(
    data: DocumentNode,
    variables?: object,
    headers?: object
  ): Promise<ApolloResult<T>> {
    return this.client.query<T>({
      query: data,
      errorPolicy: "all",
      fetchPolicy: "network-only",
      variables,
      context: {
        headers: { ...this.headers, ...headers },
      },
    });
  }

  /**
   * Send: Provides requests for graphql mutations.
   *
   * @param {DocumentNode} data The query structure
   * @param {object} variables A object which contains variables for
   *                           the query structure.
   * @param {object} headers Optional headers which get appended to
   *                         the endpoint headers.
   * @returns {Promise<ApolloResult<T>>} Resolved apollo data object
   */
  async sendMutation<T>(
    data: DocumentNode,
    variables?: object,
    headers?: object
  ): Promise<ApolloResult<T>> {
    return this.client.mutate<T>({
      mutation: data,
      errorPolicy: "all",
      variables,
      context: {
        headers: { ...this.headers, ...headers },
      },
    });
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
