import Scraper from "../../endpoints/scraper";
//> Sessions
// Contains the SNEK session
import { InstagramSession } from "../../session/sessions";
//> Instagram Endpoint paths
import * as paths from "./paths";

//#region > Classes
/** @class A Template with initializes all tasks */
class InstagramTasks {
  /**
   * Initializes a InstagramSession.
   *
   * @constructor
   * @author Nico Schett <contact@schett.net>
   * @param {string} session A session to initialize all corresponding tasks
   */
  constructor(public session: InstagramSession) {}

  async getScraper() {
    const scraper = new Scraper("https://graph.instagram.com", {
      headers: { Authorization: `Bearer ${this.session.upToDateToken()}` },
    });

    return scraper;
  }

  async refreshToken() {
    const scraper = new Scraper("https://graph.instagram.com", {
      headers: { Authorization: `Bearer ${this.session.token}` },
    });

    const res = await scraper.getJson<{ access_token: string }>(
      paths.TOKEN_REFRESH_PATH
    );

    return res.access_token;
  }
}

export default InstagramTasks;
//#endregion
