import { Apollo, ScraperEndpoint, ApolloEndpoint } from './endpoints/index';
import { IMainTemplate, MainTemplate } from './templates/index';
import { SnekSession, GithubSession } from './session/sessions';
import { Scraper } from './endpoints/scraper';

interface IEndpoint {
  url: string;
  type: string
  headers: object;
}

interface IClient {
  // headers: object;
}

/**@class The snek-client. Enjoy it. */
export class Client implements IClient {
  // public endpoint: Endpoint;

  // private _headers: object = {};
  // get headers(): object {
  //   return this._headers;
  // }

  // set headers(value: object) {
  //   this._headers = value;
  //   if (this.endpoint) {
  //     this.endpoint.headers = this.headers;
  //   }
  // }

  // /**
  //  * Creates an instance of Client.
  //  *
  //  * @constructor
  //  * @author Nico Schett <contact@schett.net>
  //  * @param {IEndpoint} ep The desired endpoint.
  //  */
  // constructor(ep: IEndpoint) {
  //   this.headers = ep.headers;
  // }
  constructor(ep: IEndpoint) { }
}

/**@class A client implementation for snek interaction */
export class SnekClient extends Client {
  public endpoint: ApolloEndpoint;
  public template: IMainTemplate;
  public session: SnekSession;

  constructor(
    type: string = "graphql",
    url: string = "https://engine.snek.at/api/graphiql",
    headers: object = {}) {
    super({ type, url, headers })
    this.template = new MainTemplate();
    this.endpoint = new Apollo(url, { headers });
    this.session = new SnekSession("snek", this.endpoint, this.template.snek);
  }
}

/**
 * @class A client implementation for github interaction
 * @description
 */
export class GithubClient extends Client {
  public endpoint: ApolloEndpoint;
  public template: IMainTemplate;
  public session: GithubSession;

  constructor(
    url: string = "https://api.github.com/graphql",
    type: string = "graphql",
    headers: object = {}) {
    console.log(url, type, headers)
    super({ type, url, headers })
    this.template = new MainTemplate();
    this.endpoint = new Apollo(url, { headers });
    this.session = new GithubSession("github", this.endpoint, this.template);
    /**
     * Code snippet:
     * Add sub session
     */
    // let s = this.session.addSubSession<GithubSession, ApolloEndpoint, MainTemplate>("github", GithubSession, this.endpoint, this.template)
  }
}

/**
 * @class A client implementation for gitlab interaction
 */
export class GitlabClient extends Client {
  public endpointScraper: ScraperEndpoint;
  constructor(
    url: string = "https://gitlab.com",
    type: string = "scraper",
    headers: object = {}) {
    super({ type, url, headers });
    this.endpointScraper = new Scraper(url, { headers });
    //this.endpointRest = new Rest(url, { headers });
  }
}
