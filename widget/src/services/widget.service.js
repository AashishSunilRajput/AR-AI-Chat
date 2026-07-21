import api from "./api";

import { WIDGET_KEY } from "../config/api";

class WidgetService {

    async getConfig() {

        const response =
            await api.get(

                `/widget/config/${WIDGET_KEY}`

            );

        return response.data;

    }

}

export default new WidgetService();