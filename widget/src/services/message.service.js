import api from "./api";
import { WIDGET_KEY } from "../config/api";

class MessageService {

    async getMessages(conversationId) {

        const response = await api.get(

            `/messages/conversation/${conversationId}`

        );

        return response.data;

    }

    async sendMessage(data) {

        const response = await api.post(

            `/widget/message/${WIDGET_KEY}`,

            data

        );

        return response.data;

    }

}

export default new MessageService();