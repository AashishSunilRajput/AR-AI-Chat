import axios from "axios";

class WhatsAppCloudService {

    async sendTextMessage({
        to,
        message
    }) {

        const phoneNumberId =
            process.env.WHATSAPP_PHONE_NUMBER_ID;

        const accessToken =
            process.env.WHATSAPP_ACCESS_TOKEN;

        const apiVersion =
            process.env.WHATSAPP_API_VERSION || "v25.0";

        if (!phoneNumberId) {
            throw new Error(
                "WHATSAPP_PHONE_NUMBER_ID is not configured"
            );
        }

        if (!accessToken) {
            throw new Error(
                "WHATSAPP_ACCESS_TOKEN is not configured"
            );
        }

        if (!to) {
            throw new Error(
                "WhatsApp recipient number is required"
            );
        }

        if (!message) {
            throw new Error(
                "WhatsApp message is required"
            );
        }

        const url =
            `https://graph.facebook.com/${apiVersion}/${phoneNumberId}/messages`;

        const response =
            await axios.post(
                url,
                {
                    messaging_product: "whatsapp",
                    recipient_type: "individual",
                    to,
                    type: "text",
                    text: {
                        preview_url: false,
                        body: message
                    }
                },
                {
                    headers: {
                        Authorization:
                            `Bearer ${accessToken}`,

                        "Content-Type":
                            "application/json"
                    }
                }
            );

        return response.data;
    }
}

export default new WhatsAppCloudService();