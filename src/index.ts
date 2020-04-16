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
// Contains the snek and github session
import { SnekSession, GithubSession } from "./session/sessions";
//> Interfaces
// Contains interfaces for scraper and apollo
import { ScraperEndpoint, ApolloEndpoint } from "./endpoints/index";
// Contains the interface for the main template
import { IMainTemplate } from "./templates/index";
//#endregion

//#region > Interfaces
/** @interface Endpoint defines the structure of object a endpoint requieres to initialize. */
interface IEndpoint {
  url: string;
  type: string;
  headers: object;
}
/** @interface Client will define the client structure. */
interface IClient {}
//#endregion

//#region > Classes
/**@class The snek-client. Enjoy it. Will be implemented in the future. */
class Client implements IClient {
  constructor(ep: IEndpoint) {}
}

/**@class A client implementation for snek interaction */
class SnekClient extends Client {
  endpoint: ApolloEndpoint;
  template: IMainTemplate;
  session: SnekSession;

  constructor(
    type: string = "graphql",
    url: string = "https://engine.snek.at/api/graphiql",
    headers: object = {}
  ) {
    super({ type, url, headers });

    this.template = new MainTemplate();
    this.endpoint = new Apollo(url, { headers });
    this.session = new SnekSession("snek", this.endpoint, this.template.snek);
  }
}

/** @class A client implementation for github interaction. */
class GithubClient extends Client {
  endpoint: ApolloEndpoint;
  template: IMainTemplate;
  session: GithubSession;

  constructor(
    url: string = "https://api.github.com/graphql",
    type: string = "graphql",
    headers: object = {}
  ) {
    super({ type, url, headers });

    this.template = new MainTemplate();
    this.endpoint = new Apollo(url, { headers });
    this.session = new GithubSession("github", this.endpoint, this.template);
  }
}

/** @class A client implementation for gitlab interaction. */
class GitlabClient extends Client {
  public endpointScraper: ScraperEndpoint;
  constructor(
    url: string = "https://gitlab.com",
    type: string = "scraper",
    headers: object = {}
  ) {
    super({ type, url, headers });

    this.endpointScraper = new Scraper(url, { headers });
  }
}
//#endregion

//#region > Exports
export { SnekClient, GithubClient, GitlabClient };
//#endregion
