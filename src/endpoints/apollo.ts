//#region > Imports
//#PACKAGE "@apollo/client"
import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  NormalizedCacheObject,
  HttpLink,
} from "@apollo/client";
//#PACKAGE "'apollo-upload-client"
// Contains the link for the apollo client
import { createUploadLink } from "apollo-upload-client";
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
  private link: ApolloLink;
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

    try {
      this.cache = new InMemoryCache();
    } catch {
      //#ERROR
      throw new Error("An error occurred while initializing the cache!");
    }

    try {
      const uploadLink = createUploadLink({ uri, headers: options.headers });

      this.link = ApolloLink.from([uploadLink]);
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
