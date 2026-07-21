import api from "./api";

class MessageService {

    async getMessages(conversationId) {

        const response =
            await api.get(

                `/messages/${conversationId}`

            );

        return response.data;

    }

    async sendMessage(data) {

        const response =
            await api.post(

                "/messages/send",

                data

            );

        return response.data;

    }

}

export default new MessageService();