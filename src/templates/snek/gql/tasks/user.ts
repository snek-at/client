//#region > Imports
//> Sessions
// Contains the snek session
import { SnekSession } from "../../../../session/sessions";
//> Tasks
// Contains the error task
import { ErrorTask } from "./error";
//> Interfaces
// Contains a interface for a general response
import { IResponse } from "./index";
// Contains the snek template
import { ISnekGqlTemplate } from "../index";
//#endregion

//#region > Interfaces
/** @interface RegistrationResponse defines the structure of a registration response. */
interface IRegistrationResponse extends IResponse {
  data: RegistrationData;
}

/** @interface RegistrationResponse defines the structure of a registration data. */
interface RegistrationData {
  result: string;
  errors: [];
}

/** @interface CacheResponse defines the structure of a cache response. */
interface ICacheResponse extends IResponse {
  data: CacheData;
}

/** @interface CacheData defines the structure of a data response. */
interface CacheData {
  user: {
    id: number;
  };
}

/** @interface ProfileResponse defines the structure of a profile response. */
interface IProfileResponse extends IResponse {
  data: ProfileData;
}

/** @interface ProfileData defines the structure of a profile data. */
interface ProfileData {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  verified: string;
  platformData: string;
  sources: string;
  bids: string;
  tids: string;
}

/** @interface WhoamiResponse defines the structure of a whoami response. */
interface IWhoamiResponse extends IResponse {
  data: WhoamiData;
}

/** @interface WhoamiData defines the structure of a whoami data. */
interface WhoamiData {
  whoami: { username: string };
}
//#endregion

//#region > Classes
/** @class A set of session aware Tasks */
class SnekGqlUserTasks extends ErrorTask {
  public template: ISnekGqlTemplate;

  /**
   * Creates an instance of a SessionTasks.
   *
   * @constructor
   * @author Nico Schett <contact@schett.net>
   * @param {string} session A session for the tasks.
   */
  constructor(session: SnekSession) {
    super(session);

    this.template = session.template.snekGql;
  }

  /**
   * Register a user
   *
   * @returns {Promise<IRegistrationResponse>} A JWT token.
   */
  async registration(values: object): Promise<IRegistrationResponse> {
    let query = this.template.mutations.user.registration;
    let response = <IRegistrationResponse>await this.session.ep.send(
      "mutation",
      query,
      {
        token: await this.session.upToDateToken(),
        values,
      }
    );

    this.handleErrors(response);

    return response;
  }

  /**
   * Cache a user
   *
   * @returns {Promise<ICacheResponse>} A JWT token.
   */
  async cache(platformData: string): Promise<ICacheResponse> {
    let query = this.template.mutations.user.cache;
    let response = <ICacheResponse>await this.session.ep.send(
      "mutation",
      query,
      {
        token: await this.session.upToDateToken(),
        platformData,
      }
    );

    this.handleErrors(response);

    return response;
  }

  /**
   * Get profile.
   *
   * @param {string} url A url of a page.
   * @returns {Promise<IProfileResponse>} The page profile of a user.
   */
  async profile(url: string): Promise<IProfileResponse> {
    let query = this.template.queries.user.profile;
    let response = <IProfileResponse>await this.session.ep.send(
      "query",
      query,
      {
        url,
        token: await this.session.upToDateToken(),
      }
    );

    this.handleErrors(response);

    return response;
  }

  /**
   * Whoami check
   *
   * @returns {Promise<IWhoamiResponse>} User data.
   */
  async whoami(): Promise<IWhoamiResponse> {
    let query = this.template.queries.user.whoami;
    let response = <IWhoamiResponse>await this.session.ep.send("query", query, {
      token: await this.session.upToDateToken(),
    });

    this.handleErrors(response);

    return response;
  }
}
//#endregion

//#region > Exports
export default SnekGqlUserTasks;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © Simon Prast
 */
