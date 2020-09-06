//#region > Imports
//> Endpoints
// Contains the apollo endpoint
import Apollo from "./endpoints/apollo";
// Contains the scraper endpoint
import Scraper from "./endpoints/scraper";
//> Sessions
// Contains the SNEK and github session
import {
  SnekSession,
  GithubSession,
  InstagramSession,
} from "./session/sessions";
//> Interfaces
// Contains interfaces for scraper and apollo
import { ScraperEndpoint, ApolloEndpoint } from "./endpoints/index";
//#endregion

//#region > Interfaces
/**
 * @interface Endpoint Endpoint defines the structure of object which an
 *                     endpoint requires to.
 */
interface Endpoint {
  /**
   * Url: The URL of an endpoint. For performance reasons,
   *      https should always be selected as protocol if possible.
   */
  url: string;
  /**
   * Type: It is possible to specify the type. This is currently only used to
   *       differentiate multiple instances.
   */
  type: string;
  headers: object;
}

/** @interface IClient will define the client structure */
interface IClient {}
//#endregion

//#region > Classes
/**
 * @class The SNEK-client. Enjoy it. Will be implemented in the future
 * @todo Rework the url checker and add documentation
 */
class Client implements IClient {
  constructor(ep: Endpoint) {
    /*
     * When no protocol is defined, http will be appended. Therefore "https"
     * should always be included for performance.
     */
    ep.url = ((url: string) => {
      if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
        url = "http://" + url;
      }

      return url;
    })(ep.url);
  }
}

/** @class A client implementation for SNEK interaction */
class SnekClient extends Client {
  gql: ApolloEndpoint;
  session: SnekSession;

  /**
   * Initializes a SNEK client.
   *
   * @constructor
   * @author Nico Schett <contact@schett.net>
   * @param url The base URL the SnekClient should be working on.
   *            Default: "https://engine.snek.at/api/graphiql".
   * @param headers A object containing various request headers
   * @param type A type description to differ between multiple instances
   */
  constructor(
    url: string = "https://engine.snek.at/graphql",
    headers: object = {},
    type: string = "graphql"
  ) {
    super({ type, url, headers });

    this.gql = new Apollo(url, { headers });
    this.session = new SnekSession("snek", this.gql);
  }
}

/** @class A client implementation for github interaction */
class GithubClient extends Client {
  gql: ApolloEndpoint;
  session: GithubSession;

  /**
   * Initializes a Github client.
   *
   * @constructor
   * @author Nico Schett <contact@schett.net>
   * @param url The base URL the GithubClient should be working on.
   *            Default: "https://api.github.com/graphql".
   * @param headers A object containing various request headers
   * @param type A type description to differ between multiple instances
   */
  constructor(
    url: string = "https://api.github.com/graphql",
    headers: object = {},
    type: string = "graphql"
  ) {
    super({ type, url, headers });

    this.gql = new Apollo(url, { headers });
    this.session = new GithubSession("github", this.gql);
  }
}

/** @class A client implementation for instagram interaction */
class InstagramClient extends Client {
  ep: ScraperEndpoint;
  session: InstagramSession;

  /**
   * Initializes a Github client.
   *
   * @constructor
   * @author Nico Schett <contact@schett.net>
   * @param url The base URL the InstagramClient should be working on.
   *            Default: "https://graph.instagram.com"
   * @param headers A object containing various request headers
   * @param type A type description to differ between multiple instances
   */
  constructor(
    accessToken: string,
    url: string = "https://graph.instagram.com",
    headers: {} = {},
    type: string = "scraper"
  ) {
    super({ type, url, headers });

    this.ep = new Scraper(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    this.session = new InstagramSession("instagram", accessToken, this.ep);
  }
}

/**
 * @class A client implementation for web interaction like scraping or access
 *        to APIv4 endpoints.
 */
class WebClient extends Client {
  public scraper: ScraperEndpoint;

  /**
   * Initializes a Web client.
   *
   * @constructor
   * @author Nico Schett <contact@schett.net>
   * @param url The base URL the WebClient should be working on
   * @param headers A object containing various request headers
   * @param type A type description to differ between multiple instances
   */
  constructor(
    url: string,
    headers: object = {},
    type: string = "A webscraper client"
  ) {
    super({ type, url, headers });

    this.scraper = new Scraper(url, { headers });
  }
}
//#endregion

//#region > Exports
export { SnekClient, GithubClient, InstagramClient, WebClient };
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © Simon Prast
 */
