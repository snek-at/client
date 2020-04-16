//#region > Functions
/** @description General utils for managing cookies in Typescript. */
//> Functions
/**
 * @function
 * @param {string} name Name of cookie.
 * @param {string} value Value of cookie.
 * @param {number} time Time in seconds.
 * @description Set cookie.
 */
function setCookie(name: string, val: string, time: number) {
  const date = new Date();
  const value = val;

  // Set cookie expiry date in n(time) seconds
  date.setTime(date.getTime() + time * 1000);
  // Create cookie
  document.cookie =
    name + "=" + value + "; expires=" + date.toUTCString() + "; path=/";
}

/**
 * @function
 * @param {string} name Name of cookie.
 * @returns {string} Value of cookie.
 * @description Get cookie.
 */
function getCookie(name: string) {
  const value = "; " + document.cookie;
  const parts = value.split("; " + name + "=");

  if (parts.length == 2) {
    return parts.pop()?.split(";").shift();
  }
}

/**
 * @function
 * @param {string} name Name of cookie
 * @description Delete cookie
 */
function deleteCookie(name: string) {
  const date = new Date();

  // Set cookie expiry date to -1 days
  date.setTime(date.getTime() + -1 * 24 * 60 * 60 * 1000);

  // Create cookie
  document.cookie = name + "=; expires=" + date.toUTCString() + "; path=/";
}

/**
 * @function
 * @returns {boolean} Is the cookie alive?.
 * @description Check if cookie is alive.
 */
function cookieChecker(name: string) {
  let cookie = getCookie(name);

  if (cookie) {
    return true;
  }
  return false;
}
//#endregion

//#region > Exports
export { setCookie, getCookie, deleteCookie, cookieChecker };
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © Simon Prast
 */
