//#region > Imports
//> Sessions
// Contains the SNEK session
import { SnekSession } from "../../../../session/sessions";
//> Tasks
// Contains a class to handle task errors
import { TaskError } from "../errors";
//> Interfaces
// Contains a interface for a general response
import { IResponse } from "./index";
// Contains the SNEK template
import { ISnekGqlTemplate } from "../index";
//#endregion

//#region > Interfaces
/**
 *  @interface RegistrationResponse defines the overall structure of a
 *                                  registration response from the SNEK-engine.
 */
interface IRegistrationResponse extends IResponse {
  data: RegistrationData;
}

/**
 * @interface RegistrationData defines the structure of the specific data a
 *                             registration response contains.
 */
interface RegistrationData {
  result: string;
  errors: [];
}

/**
 *  @interface CacheResponse defines the overall structure of a cache response
 *                           from the SNEK-engine.
 */
interface ICacheResponse extends IResponse {
  data: CacheData;
}

/**
 * @interface CacheData defines the structure of the specific data a
 *                      cache response contains.
 */
interface CacheData {
  user: {
    id: number;
  };
}

/**
 *  @interface ProfileResponse defines the overall structure of a profile
 *                             response from the SNEK-engine.
 */
interface IProfileResponse extends IResponse {
  data: ProfileData;
}

/**
 * @interface ProfileData defines the structure of the specific data a
 *                        profile response contains.
 */
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

/**
 *  @interface WhoamiResponse defines the overall structure of a whoami
 *                            response from the SNEK-engine.
 */
interface IWhoamiResponse extends IResponse {
  data: WhoamiData;
}

/**
 * @interface WhoamiData defines the structure of the specific data a
 *                       whoami response contains.
 */
interface WhoamiData {
  whoami: { username: string };
}
//#endregion

//#region > Classes
/** @class A set of session aware Tasks */
class SnekGqlUserTasks extends TaskError {
  public template: ISnekGqlTemplate;

  /**
   * @constructor
   * @author Nico Schett <contact@schett.net>
   * @param {string} session A session for the tasks
   */
  constructor(session: SnekSession) {
    super(session);

    this.template = session.template.snekGql;
  }

  /**
   * Register a user.
   *
   * @param {object} values Registration parameters like username, email,...
   * @returns {Promise<RegistrationResponse>} A JWT token
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
   * Cache a user.
   *
   * @param {string} platformData A serialized JSON object to be cached
   * @returns {Promise<CacheResponse>} A JWT token
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
   * @param {string} url A url of a page
   * @returns {Promise<ProfileResponse>} The page profile of a user
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
   * Whoami check.
   *
   * @returns {Promise<WhoamiResponse>} User data
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
