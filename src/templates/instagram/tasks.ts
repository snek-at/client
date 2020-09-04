import Scraper from "../../endpoints/scraper";
//> Sessions
// Contains the SNEK session
import { InstagramSession } from "../../session/sessions";

import * as urls from "./urls";

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
      urls.TOKEN_REFRESH_URI
    );

    return res.access_token;
  }
}

export default InstagramTasks;
//#endregion
