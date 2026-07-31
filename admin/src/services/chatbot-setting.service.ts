import api from "./http";

export interface ChatbotSetting {

    id: number;

    chatbotId: number;

    aiProvider: "OPENAI";

    model: string;

    temperature: number;

    maxTokens: number;

    systemPrompt: string | null;

    welcomeMessage: string;

    primaryColor: string;

    avatar: string | null;

    theme: "LIGHT" | "DARK";

    position: "BOTTOM_RIGHT" | "BOTTOM_LEFT";

    allowedDomains: string | null;

    isPublic: boolean;

    createdAt: string;

    updatedAt: string;

}

class ChatbotSettingService {

    // ==========================================
    // Get Settings
    // ==========================================

    async getSettings(chatbotId: number) {

        const response = await api.get(
            `/chatbot-settings/${chatbotId}`
        );

        return response.data;

    }

    // ==========================================
    // Update Settings
    // ==========================================

    async updateSettings(

        chatbotId: number,

        data: Partial<ChatbotSetting>

    ) {

        const response = await api.put(

            `/chatbot-settings/${chatbotId}`,

            data

        );

        return response.data;

    }

}

export default new ChatbotSettingService();