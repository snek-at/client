//#region > Imports
//> Endpoints
// Contains the apollo endpoint
import Apollo from "./endpoints/apollo";
// Contains the scraper endpoint
import Scraper from "./endpoints/scraper";
//> Templates
// Contains the main template
import { MainTemplate } from "./templates/index";
//> Sessions
// Contains the SNEK and github session
import { SnekSession, GithubSession } from "./session/sessions";
//> Interfaces
// Contains interfaces for scraper and apollo
import { ScraperEndpoint, ApolloEndpoint } from "./endpoints/index";
// Contains the interface for the main template
import { IMainTemplate } from "./templates/index";
//#endregion

//#region > Interfaces
/**
 * @interface Endpoint defines the structure of object a endpoint requirers to
 *                     initialize.
 */
interface IEndpoint {
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
  constructor(ep: IEndpoint) {
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
  endpoint: ApolloEndpoint;
  template: IMainTemplate;
  session: SnekSession;

  /**
   * @constructor
   * @author Nico Schett <contact@schett.net>
   * @param url The base URL the SnekClient should be working on.
   *            Default: "https://engine.snek.at/api/graphiql".
   * @param headers A object containing various request headers
   * @param type A type description to differ between multiple instances
   */
  constructor(
    url: string = "https://engine.snek.at/api/graphiql",
    headers: object = {},
    type: string = "graphql"
  ) {
    super({ type, url, headers });

    this.template = new MainTemplate();
    this.endpoint = new Apollo(url, { headers });
    this.session = new SnekSession("snek", this.endpoint, this.template.snek);
  }
}

/** @class A client implementation for github interaction */
class GithubClient extends Client {
  endpoint: ApolloEndpoint;
  template: IMainTemplate;
  session: GithubSession;

  /**
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

    this.template = new MainTemplate();
    this.endpoint = new Apollo(url, { headers });
    this.session = new GithubSession("github", this.endpoint, this.template);
  }
}

/**
 * @class A client implementation for web interaction like scraping or access
 *        to APIv4 endpoints.
 */
class WebClient extends Client {
  public scraper: ScraperEndpoint;

  /**
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
export { SnekClient, GithubClient, WebClient };
//#endregion
