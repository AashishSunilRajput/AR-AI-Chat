import api from "./api";

// ==========================================
// Types
// ==========================================

export interface OrganizationSettings {

    id: number;

    organizationId: number;

    timezone: string;

    language: string;

    companyAddress: string | null;

    companyCity: string | null;

    companyState: string | null;

    companyCountry: string | null;

}

export interface ChatbotSettings {

    id: number;

    chatbotId: number;

    aiProvider: "OPENAI" | "GEMINI" | "CLAUDE";

    model: string;

    temperature: number;

    maxTokens: number;

    systemPrompt: string | null;

    welcomeMessage: string | null;

    primaryColor: string;

    avatar: string | null;

    theme: "LIGHT" | "DARK" | "AUTO";

    position: "BOTTOM_RIGHT" | "BOTTOM_LEFT";

    isPublic: boolean;

}

export interface Chatbot {

    id: number;

    name: string;

    slug: string;

    isActive: boolean;

    settings: ChatbotSettings;

}

export interface SettingsData {

    id: number;

    name: string;

    slug: string;

    email: string;

    phone: string | null;

    website: string | null;

    logo: string | null;

    settings: OrganizationSettings;

    chatbots: Chatbot[];

}

// ==========================================
// Service
// ==========================================

class SettingService {

    // ==========================================
    // Get Settings
    // ==========================================

    async getSettings() {

        const response =
            await api.get("/settings");

        return response.data;

    }

    // ==========================================
    // Update Organization Settings
    // ==========================================

    async updateOrganizationSettings(

        data: Partial<OrganizationSettings>

    ) {

        const response =
            await api.put(

                "/settings",

                data

            );

        return response.data;

    }

    // ==========================================
    // Update Chatbot Settings
    // ==========================================

    async updateChatbotSettings(

        chatbotId: number,

        data: Partial<ChatbotSettings>

    ) {

        const response =
            await api.put(

                `/settings/chatbot/${chatbotId}`,

                data

            );

        return response.data;

    }

}

export default new SettingService();