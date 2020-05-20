//#region > Imports
//> Interfaces
// Contains the interface for the Apollo endpoint and options
import { ScraperEndpoint, IOptions } from "./index";
//#endregion

//#region > Classes
/** @class A endpoint to fetch page DOM. */
class Scraper implements ScraperEndpoint {
  //> Fields
  headers: object = {
    accept: "application/json, text/plain, */*",
  };
  desc: string = "A endpoint to fetch page DOM";
  proxy: string = "https://cors.snek.at/";

  /**
   * @constructor
   * @author Nico Schett <contact@schett.net>
   * @param root Root url of endpoint. Specify it like https://foo.bar. The correct placement of the slashes is
   *             essential!
   * @param options Specify options object to define e.g headers.
   * @description Creates a instance of Scraper.
   */
  constructor(private root: string, options: IOptions) {
    this.headers = { ...this.headers, ...options.headers };
  }

  //> Getter
  /**
   * @returns {string} A URL
   * @description Provides a URL which is composed of proxy and root url
   */
  get url(): string {
    return this.proxy + this.root;
  }

  //> Methods
  /**
   * @param path Path to the endpoint. Specify it like "/foo/bar". The correct placement of the slashes is essential!
   * @returns {T} JSON object passed to given structure <T>.
   * @description Get JSON object<T> from specified path.
   */
  async getJson<T>(path: string): Promise<T> {
    return fetch(this.url + path, {
      headers: {
        ...this.headers,
        "x-requested-with": "XMLHttpRequest",
      },
    }).then(async (response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return response.json().then((data) => data as T);
    });
  }

  /**
   * @param path Path to the endpoint. Specify it like "/foo/bar". The correct placement of the slashes is essential!
   * @returns {object} DOM object.
   * @description Get DOM object from specified path.
   */
  async getDom(path: string): Promise<Document> {
    return fetch(this.url + path, {
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

  /**
   * @param {string} path Path to the endpoint. Specify it like "/foo/bar".
   *                      The correct placement of the slashes is essential!
   * @param data Data which is filled into the body of a post request
   * @returns {Promise<Document>} A DOM Document
   * @description Post data to a endpoint and get the respective result
   */
  async post<T>(
    path: string,
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
  ): Promise<T> {
    return fetch(this.url + path, {
      method: "POST",
      body: data,
      headers: {
        ...this.headers,
      },
    }).then(async (response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return response.json().then((data) => data as T);
    });
  }
}
//#endregion

//#region > Exports
export default Scraper;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © Simon Prast
 */
