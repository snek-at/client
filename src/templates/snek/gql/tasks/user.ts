//#region > Imports
//> Parent Task
// Contains the SNEK parent task
import SnekTasks from "./index";
//> Types
// Contains the type declarations for Apollo results
import { ApolloResult } from "./index";
//#endregion

//#region > Interfaces
/**
 * @interface RegistrationData defines the structure of the registration result
 *                             data.
 */
interface RegistrationData {
  result: string;
}

/**
 * @interface CacheData defines the structure of the cache result
 *                      data.
 */
interface CacheData {
  user: {
    id: number;
  };
}

/**
 * @interface ProfileData defines the structure of the profile result
 *                        data.
 */
interface ProfileData {
  profile: {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    verified: string;
    platformData: string;
    sources: string;
    bids: string;
    tids: string;
  };
}

/**
 * @interface WhoamiData defines the structure of the whoami result
 *                        data.
 */
interface WhoamiData {
  whoami: {
    username: string;
  };
}
//#endregion

//#region > Classes
/** @class A set of session aware tasks */
class SnekGqlUserTasks {
  /**
   * @constructor
   * @author Nico Schett <contact@schett.net>
   * @param {string} parent The parent task
   */
  constructor(private parent: SnekTasks) {}

  /**
   * Register a user.
   *
   * @param {object} values Registration parameters like username, email,...
   * @returns {Promise<ApolloResult<RegistrationData>>} Registration data
   */
  async registration(values: object): Promise<ApolloResult<RegistrationData>> {
    const response = await this.parent.run<RegistrationData>(
      "mutation",
      this.parent.template.mutations.user.registration,
      {
        token: await this.parent.session.upToDateToken(),
        values,
      }
    );

    return response;
  }

  /**
   * Cache a user.
   *
   * @param {string} platformData A serialized JSON object to be cached
   * @returns {Promise<ApolloResult<CacheData>>} Cache data
   */
  async cache(platformData: string): Promise<ApolloResult<CacheData>> {
    const response = await this.parent.run<CacheData>(
      "mutation",
      this.parent.template.mutations.user.cache,
      {
        token: await this.parent.session.upToDateToken(),
        platformData,
      }
    );

    return response;
  }

  /**
   * Get profile.
   *
   * @param {string} url A url of a page
   * @returns {Promise<ApolloResult<ProfileData>>} The profile page of a user
   */
  async profile(url: string): Promise<ApolloResult<ProfileData>> {
    const response = await this.parent.run<ProfileData>(
      "query",
      this.parent.template.queries.user.profile,
      {
        url,
        token: await this.parent.session.upToDateToken(),
      }
    );

    return response;
  }

  /**
   * Whoami check.
   *
   * @returns {Promise<ApolloResult<WhoamiData>>} User data
   */
  async whoami(): Promise<ApolloResult<WhoamiData>> {
    const response = await this.parent.run<WhoamiData>(
      "query",
      this.parent.template.queries.user.whoami,
      {
        token: await this.parent.session.upToDateToken(),
      }
    );

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
