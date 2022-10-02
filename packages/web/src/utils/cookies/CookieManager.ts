import cookie from 'js-cookie'
import nextCookie from 'next-cookies'

export class CookieManager {
    public static getCookie(context: any, name: string) {
        return nextCookie(context)[name]
    }

    public static setCookie(name: string, value: string) {
        cookie.set(name, value)
    }

    public static removeCookie(name: string) {
        cookie.remove(name)
    }

    public static removeCookies(names: string[]) {
        names.forEach((name) => {
            this.removeCookie(name)
        })
    }
}
