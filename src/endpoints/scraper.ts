import { ScraperEndpoint, IOptions } from './index';

/**@class A endpoint to fetch website page data. */
export class Scraper implements ScraperEndpoint {
  public headers: object;
  public desc: string = "A endpoint to fetch website page data.";

  /**
   * @constructor
   * @author: schettn
   * @param root Root url of endpoint. Specify it like https://foo.bar. Correct slash setting is IMPORTANT!
   * @param options Specify options object to define e.g headers.
   * @description Creates a instance of Scraper.
   */
  constructor(private root: string, options: IOptions) {
    this.headers = options.headers;
  }

  /**
   * @param path Path to the endpoint. Specify it like "/foo/bar". Correct slash setting is IMPORTANT!
   * @return {T} JSON object passed to given structure <T>.
   * @description Get JSON object<T> from specified path.
   */
  async getJson<T>(path: string): Promise<T> {
    return fetch(this.root + path)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        return response.json().then(data => data as T);
      })
  }
  
  /**
   * @param path Path to the endpoint. Specify it like "/foo/bar". Correct slash setting is IMPORTANT!
   * @return {object} DOM object.
   * @description Get DOM object from specified path.
   */
  async getDom(path: string): Promise<Document> {
    return fetch(this.root + path)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.text();
    }).then(text => {
      return new DOMParser().parseFromString(text, "text/xml");
    })
  }
}
