//#region > Imports
//> Interfaces
// Contains the interface for gql queries, mutations and subscriptions
import { DocumentNode } from "graphql";
//#endregion

//#region > Interfaces
/** @interface Endpoint defines the basic endpoint structure. */
interface IEndpoint {
  /**
   * Hedaers: A object which contains the headers as key value pair.
   */
  headers: {};
  /**
   * Desc: A endpoint description.
   */
  desc: string;
}
/** @interface Options defines the structure of the apollo options. */
interface IOptions {
  /**
   * Headers: Contains the headers for the requests.
   */
  headers: object;
}

/** @interface ApolloEndpoint defines the structure of the apollo endpoint. */
interface ApolloEndpoint extends IEndpoint {
  /**
   * Send: A method which provides send functionallity for all graphql types.
   *
   * @param {string} type The type of the action you want to perform. Query, Mutation,...
   * @param {DocumentNode} data The query structure.
   * @param {object} variables A object which contains variables for the query structure.
   * @param {object} headers Optional headers which get appended to the endpoint headers.
   * @returns {Promise<object>} Resolved apollo data object.
   */
  send: (
    type: string,
    data: DocumentNode,
    variables?: object,
    headers?: object
  ) => Promise<object>;
}

/** @interface ScraperEndpoint defines the structure of the scraper endpoint. */
interface ScraperEndpoint extends IEndpoint {
  /**
   * GetJson: A method which get gets json data from a specific url.
   *
   * @param url A web url.
   * @returns {Promise<T>} Json data in the given format <T>.
   */
  getJson<T>(url: string): Promise<T>;
  /**
   * GetDom: A method which get gets DOM data from a specific url.
   *
   * @param url A web url.
   * @returns {Promise<Document>} A DOM Document.
   */
  getDom(url: string): Promise<Document>;
}
//#endregion

//#region > Exports
export type { IOptions, ApolloEndpoint, ScraperEndpoint };
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © Simon Prast
 */
