import axios from "axios";

import { API_BASE_URL } from "@/config/api";

const api = axios.create({

    baseURL: API_BASE_URL,

    headers: {

        "Content-Type": "application/json",

    },

});


// ===================================
// Request Interceptor
// ===================================

api.interceptors.request.use(

    (config) => {

        if (typeof window !== "undefined") {

            const token = localStorage.getItem("arai_token");

            if (token) {

                config.headers.Authorization = `Bearer ${token}`;

            }

        }

        return config;

    },

    (error) => Promise.reject(error)

);


// ===================================
// Response Interceptor
// ===================================

api.interceptors.response.use(

(response)=>response,

(error)=>{

    console.log(
        "API ERROR",
        error.response?.status,
        error.response?.data
    );


    return Promise.reject(error);

}

);

export default api;