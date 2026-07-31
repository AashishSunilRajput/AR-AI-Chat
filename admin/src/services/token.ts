const TOKEN_KEY = "arai_token";


export function setToken(token: string) {

    localStorage.setItem(
        TOKEN_KEY,
        token
    );

}


export function getToken() {

    if (
        typeof window === "undefined"
    ) {
        return null;
    }


    return localStorage.getItem(
        TOKEN_KEY
    );

}


export function removeToken() {

    localStorage.removeItem(
        TOKEN_KEY
    );

    localStorage.removeItem(
        "arai_user"
    );

    localStorage.removeItem(
        "arai_org"
    );

}


export function isLoggedIn() {

    return !!getToken();

}