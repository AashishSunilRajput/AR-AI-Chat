import api from "./http";


export interface LoginRequest {

    email: string;

    password: string;

}


class AuthService {


    // ==========================
    // Login
    // ==========================

    async login(data: LoginRequest) {

        const response = await api.post(

            "/auth/login",

            data

        );

        return response.data;

    }



    // ==========================
    // Logout
    // ==========================

    logout() {


        localStorage.removeItem(
            "arai_token"
        );


        localStorage.removeItem(
            "arai_user"
        );


        localStorage.removeItem(
            "arai_org"
        );


        window.location.href = "/";

    }



    // ==========================
    // Save Login Data
    // ==========================

    saveSession(data:any) {


        localStorage.setItem(

            "arai_token",

            data.token

        );


        localStorage.setItem(

            "arai_user",

            JSON.stringify(data.user)

        );


        localStorage.setItem(

            "arai_org",

            JSON.stringify(data.organization)

        );


    }



    // ==========================
    // Token
    // ==========================

    getToken() {

        return localStorage.getItem(

            "arai_token"

        );

    }



    // ==========================
    // User
    // ==========================

   getUser() {

    // SSR Safety
    if (typeof window === "undefined") {
        return null;
    }

    try {

        const user = localStorage.getItem(
            "arai_user"
        );

        if (!user) {
            return null;
        }

        return JSON.parse(user);

    }
    catch (error) {

        console.error(
            "Error parsing user from localStorage",
            error
        );

        return null;

    }

}



    // ==========================
    // Organization
    // ==========================

    getOrganization() {


        const org = localStorage.getItem(

            "arai_org"

        );


        return org

            ? JSON.parse(org)

            : null;


    }



    // ==========================
    // Check Login
    // ==========================

    isAuthenticated() {


        return !!this.getToken();


    }


}


export default new AuthService();