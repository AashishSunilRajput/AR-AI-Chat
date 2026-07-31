import axios from "axios";

import { API_BASE_URL } from "../config/api";

const http = axios.create({

    baseURL: API_BASE_URL,

    headers: {

        "Content-Type": "application/json"

    },

    timeout: 30000

});

http.interceptors.response.use(

    (response) => response,

    (error) => {

        console.error("API Error:", error);

        return Promise.reject(error);

    }

);

export default http;