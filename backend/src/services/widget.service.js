import widgetRepository from "../repositories/widget.repository.js";

class WidgetService {

    // ==========================================
    // Get Widget Config
    // ==========================================

    async getConfig(chatbot) {

        return {

            chatbotId: chatbot.id,

            chatbotName: chatbot.name,

            widgetKey: chatbot.widgetKey,

            settings: {

                welcomeMessage:
                    chatbot.settings?.welcomeMessage ||
                    "Hi 👋 How can I help you today?",

                theme:
                    chatbot.settings?.theme ||
                    "LIGHT",

                primaryColor:
                    chatbot.settings?.primaryColor ||
                    "#2563EB",

                position:
                    chatbot.settings?.position ||
                    "BOTTOM_RIGHT",

                avatar:
                    chatbot.settings?.avatar ||
                    null,

                model:
                    chatbot.settings?.model ||
                    "gpt-5-mini",

                temperature:
                    chatbot.settings?.temperature ?? 0.7,

                maxTokens:
                    chatbot.settings?.maxTokens ?? 1000

            }

        };

    }

}

export default new WidgetService();