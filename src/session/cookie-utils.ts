/** @description General utils for managing cookies in Typescript */

/**
 * Set cookie
 * @param {string} name Name of cookie
 * @param {string} value Value of cookie
 * @param {number} time Time in seconds
 */
export function setCookie(name: string, val: string, time: number) {
    const date = new Date();
    const value = val;

    // Set it expire in 30 seconds
    date.setTime(date.getTime() + (time * 1000));

    // Set it
    document.cookie = name + "=" + value + "; expires=" + date.toUTCString() + "; path=/";
}

/**
 * Get cookie
 * @param {string} name Name of cookie
 * @return {string} Value of cookie.
 */
export function getCookie(name: string) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");

    if (parts.length == 2) {
        return parts.pop()?.split(";").shift();
    }
}

/**
 * Delete cookie
 * @param {string} name Name of cookie
 */
export function deleteCookie(name: string) {
    const date = new Date();

    // Set it expire in -1 days
    date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));

    // Set it
    document.cookie = name + "=; expires=" + date.toUTCString() + "; path=/";
}

/**
 * Check if cookie is alive.
 *
 * @return {boolean} Is the cookie alive?.
 */
export function cookieChecker(name: string) {
    let cookie = getCookie(name);
    console.log(cookie)
    console.log("Cookiename: ", name)
    if (cookie) {
        console.log("cookie true")
        return true;
    }
    console.log("cookie false")
    return false;
}
