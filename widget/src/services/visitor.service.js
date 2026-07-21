import api from "./api";

import { WIDGET_KEY } from "../config/api";

class VisitorService {

    async startSession() {

        const response =
            await api.post(

                `/visitors/start/${WIDGET_KEY}`

            );

        return response.data;

    }

}

export default new VisitorService();