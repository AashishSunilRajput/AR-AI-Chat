import api from "./api";

export interface Conversation {
    id: number;
    visitorId: number;
    chatbotId: number;
    status: "ACTIVE" | "CLOSED";
    startedAt: string;
    endedAt?: string | null;
    createdAt: string;
    updatedAt: string;

    visitor?: {
        id: number;
        name?: string | null;
        email?: string | null;
        phone?: string | null;
    };

    chatbot?: {
        id: number;
        name: string;
    };

    _count?: {
        messages: number;
    };

    messages?: {
        id: number;
        role: "USER" | "ASSISTANT";
        message: string;
        createdAt: string;
    }[];
}

export interface ConversationStats {
    total: number;
    active: number;
    closed: number;
    today: number;
}

class ConversationService {

    // ======================================
    // Get All Conversations
    // ======================================

    async getConversations() {
        const response = await api.get("/conversations");
        return response.data;
    }

    // ======================================
    // Get Conversation Stats
    // ======================================

    async getStats() {
        const response = await api.get("/conversations/stats");
        return response.data;
    }

    // ======================================
    // Get Conversation Details
    // ======================================

    async getConversation(id: number) {
        const response = await api.get(`/conversations/${id}`);
        return response.data;
    }

    // ======================================
    // Close Conversation
    // ======================================

    async closeConversation(id: number) {
        const response = await api.patch(
            `/conversations/${id}/close`
        );

        return response.data;
    }

    // ======================================
    // Delete Conversation (Future)
    // ======================================

    async deleteConversation(id: number) {
        const response = await api.delete(
            `/conversations/${id}`
        );

        return response.data;
    }
}

export default new ConversationService();