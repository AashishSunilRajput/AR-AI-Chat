import api from "./http";

export interface Chatbot {

    id: number;

    organizationId: number;

    name: string;

    slug: string;

    description: string | null;

    widgetKey: string;

    allowedDomains: string | null;

    isActive: boolean;

    organization?: {

        id: number;

        name: string;

    };

    createdAt: string;

    updatedAt: string;

}

class ChatbotService {

    // ==========================================
    // Get All Chatbots
    // ==========================================

    async getChatbots() {

        const response =
            await api.get(
                "/chatbots"
            );

        return response.data;

    }

    // ==========================================
    // Get Chatbot By Id
    // ==========================================

    async getById(
        id: number
    ) {

        const response =
            await api.get(
                `/chatbots/${id}`
            );

        return response.data;

    }

    // ==========================================
    // Create Chatbot
    // ==========================================

    async create(
        data: any
    ) {

        const response =
            await api.post(
                "/chatbots",
                data
            );

        return response.data;

    }

    // ==========================================
    // Update Chatbot
    // ==========================================

    async update(
        id: number,
        data: any
    ) {

        const response =
            await api.put(
                `/chatbots/${id}`,
                data
            );

        return response.data;

    }

    // ==========================================
    // Update Status
    // ==========================================

    async updateStatus(
        id: number,
        isActive: boolean
    ) {

        const response =
            await api.patch(
                `/chatbots/${id}/status`,
                {
                    isActive
                }
            );

        return response.data;

    }

    // ==========================================
    // Delete Chatbot
    // ==========================================

    async delete(
        id: number
    ) {

        const response =
            await api.delete(
                `/chatbots/${id}`
            );

        return response.data;

    }

}

export default new ChatbotService();