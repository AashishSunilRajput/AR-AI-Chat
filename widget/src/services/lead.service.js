import axios from "axios";

import {

    API_BASE_URL,

    WIDGET_KEY

} from "../config/api";

export async function createLead(payload) {

    const response = await axios.post(

        `${API_BASE_URL}/widget/lead/${WIDGET_KEY}`,

        payload,

        {

            headers: {

                "Content-Type": "application/json"

            }

        }

    );

    return response.data;

}