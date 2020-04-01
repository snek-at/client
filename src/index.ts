import { Endpoint, Apollo } from './endpoints/index';
import { Session } from './session/index';
import { IMainTemplate, MainTemplate } from './templates/index';
import { SnekSession, GithubSession } from './session/sessions';


interface IEndpoint {
  url: string;
  type: string
  headers: object;
}

interface IClient {
  headers: object;
  template: IMainTemplate;
  endpoint: Endpoint;
}

/**@class The snek-client. Enjoy it. */
export class Client implements IClient {
  public endpoint!: Endpoint;
  public template!: IMainTemplate;
  public session!: Session;
  private _headers: object = {};

  get headers(): object {
    return this._headers;
  }

  set headers(value: object) {
    this._headers = value;
    if (this.endpoint) {
      this.endpoint.headers = this.headers;
    }
  }

  /**
   * Creates an instance of Client.
   *
   * @constructor
   * @author: schettn
   * @param {IEndpoint} ep The desired endpoint.
   */
  constructor(ep: IEndpoint) {
    /**
     * Check endpoint type
     */
    if (ep.type === "graphql") {
      this.headers = ep.headers;
      this.endpoint = new Apollo(ep.url, { headers: this._headers });

      this.template = new MainTemplate();
      if(ep.url == "https://engine.snek.at/api/graphiql"){
        this.session = new SnekSession("snek-jwt", this.endpoint, this.template)
      } else if( ep.url = "https://api.github.com/graphql"){
        this.session = new GithubSession("github", this.endpoint, this.template)
      }
      

    } else if (ep.type === "rest") {
      // init rest
    } else {
      throw new Error("No Endpoint Specified")
    }
  }
}