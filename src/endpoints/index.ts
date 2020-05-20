//#region > Imports
//> Interfaces
//# PACKAGE "graphql"
//## nmp install "graphql"@14.6.0
// Contains the interface for gql queries, mutations and subscriptions
import { DocumentNode } from "graphql";
//#endregion

//#region > Interfaces
/** @interface Endpoint defines the basic endpoint structure */
interface Endpoint {
  /**
   * Hedaers: A object which contains the headers as key value pair.
   */
  headers: {};
  /**
   * Desc: A endpoint description.
   */
  desc: string;
}

/** @interface Options defines the structure of the apollo options */
interface Options {
  /**
   * Headers: Contains the headers for the requests.
   */
  headers: object;
}

/** @interface ApolloEndpoint defines the structure of the apollo endpoint */
interface ApolloEndpoint extends Endpoint {
  /**
   * Send: Provides requests for various graphql types.
   *
   * @param {string} type The type of the action you want to perform.
   *                      Query, Mutation,...
   * @param {DocumentNode} data The query structure
   * @param {object} variables A object which contains variables for
   *                           the query structure.
   * @param {object} headers Optional headers which get appended to
   *                         the endpoint headers.
   * @returns {Promise<object>} Resolved apollo data object
   */
  send: (
    type: string,
    data: DocumentNode,
    variables?: object,
    headers?: object
  ) => Promise<object>;
}

/** @interface ScraperEndpoint defines the structure of the scraper endpoint */
interface ScraperEndpoint extends Endpoint {
  /**
   * GetJson: A method which gets json data from a specific url.
   *
   * @param url A web url
   * @returns {Promise<T>} Json data in the given format <T>
   */
  getJson<T>(url: string): Promise<T>;
  /**
   * GetDom: A method which gets DOM data from a specific url.
   *
   * @param url A web url
   * @returns {Promise<Document>} A DOM Document
   */
  getDom(url: string): Promise<Document>;
  /**
   * Post: A method to post data to a specific url.
   *
   * @param {string} url A web url
   * @param data Data which is filled into the body of a post request
   * @returns {Promise<Document>} A DOM Document
   */
  post<T>(
    url: string,
    data:
      | string
      | Blob
      | ArrayBufferView
      | ArrayBuffer
      | FormData
      | URLSearchParams
      | ReadableStream<Uint8Array>
      | null
      | undefined
  ): Promise<T>;
}
//#endregion

//#region > Exports
export type { Options, ApolloEndpoint, ScraperEndpoint };
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © Simon Prast
 */
