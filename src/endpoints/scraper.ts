//#region > Imports
//> Interfaces
// Contains the interface for the Apollo endpoint and the Apollo options
import { ScraperEndpoint, IOptions } from "./index";
//#endregion

/**@class A endpoint to fetch website page data. */
class Scraper implements ScraperEndpoint {
  //> Fields
  headers: object;
  desc: string = "A endpoint to fetch website page data.";

  /**
   * @constructor
   * @author Nico Schett <contact@schett.net>
   * @param root Root url of endpoint. Specify it like https://foo.bar. Correct slash setting is IMPORTANT!
   * @param options Specify options object to define e.g headers.
   * @description Creates a instance of Scraper.
   */
  constructor(private root: string, options: IOptions) {
    this.headers = options.headers;
  }

  //> Methods
  /**
   * @param path Path to the endpoint. Specify it like "/foo/bar". Correct slash setting is IMPORTANT!
   * @returns {T} JSON object passed to given structure <T>.
   * @description Get JSON object<T> from specified path.
   */
  async getJson<T>(path: string): Promise<T> {
    return fetch(this.root + path, {
      headers: {
        "x-requested-with": "XMLHttpRequest",
        accept: "application/json, text/plain, */*",
        ...this.headers,
      },
    }).then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return response.json().then((data) => data as T);
    });
  }

  /**
   * @param path Path to the endpoint. Specify it like "/foo/bar". Correct slash setting is IMPORTANT!
   * @returns {object} DOM object.
   * @description Get DOM object from specified path.
   */
  async getDom(path: string): Promise<Document> {
    return fetch(this.root + path, {
      headers: {
        ...this.headers,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        return response.text();
      })
      .then((text) => {
        return new DOMParser().parseFromString(text, "text/html");
      });
  }
}

//#region > Exports
export default Scraper;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © Simon Prast
 */
