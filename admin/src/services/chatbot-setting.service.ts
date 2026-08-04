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
      suggestedQuestions: string[];
    
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

    // ==========================================
    // Upload Avatar
    // ==========================================

    async uploadAvatar(
        chatbotId: number,
        file: File
    ) {

        const formData = new FormData();

        formData.append("avatar", file);

        const response = await api.post(
            `/chatbot-settings/${chatbotId}/avatar`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return response.data;

    }

    

}

export default new ChatbotSettingService();