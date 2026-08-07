import api from "./api";
import { WIDGET_KEY } from "../config/api";


class MessageService {


    // ==========================================
    // Get Conversation Messages
    // ==========================================

    async getMessages(conversationId) {


        const response = await api.get(

            `/widget/message/conversation/${conversationId}`

        );


        return response.data;


    }





    // ==========================================
    // Send Widget Message
    // ==========================================

    async sendMessage(data) {


        const response = await api.post(

            `/widget/message/${WIDGET_KEY}`,

            data

        );


        return response.data;


    }


}


export default new MessageService();