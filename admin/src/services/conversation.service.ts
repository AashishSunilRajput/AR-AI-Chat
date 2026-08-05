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

export interface ConversationFilters {

    search?: string;

    status?: string;

    page?: number;

    limit?: number;

}

export interface Pagination {

    total: number;

    page: number;

    limit: number;

    totalPages: number;

}

export interface ConversationListResponse {

    data: Conversation[];

    pagination: Pagination;

}

class ConversationService {

  // ======================================
// Get All Conversations
// ======================================

async getConversations(

    filters?: ConversationFilters

): Promise<ConversationListResponse> {

    const response = await api.get(

        "/conversations",

        {

            params: filters

        }

    );

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

    // ======================================
// Export Conversations
// ======================================

async exportConversations(

    format: "csv" | "xlsx" | "pdf",

    filters?: ConversationFilters

) {

    const response = await api.get(

        "/export/conversations",

        {

            params: {

                format,

                ...filters

            },

            responseType: "blob"

        }

    );

    const blob = new Blob([response.data]);

    const url =
        window.URL.createObjectURL(blob);

    const link =
        document.createElement("a");

    link.href = url;

    link.download =
        `conversations.${format}`;

    document.body.appendChild(link);

    link.click();

    link.remove();

    window.URL.revokeObjectURL(url);

}
}

export default new ConversationService();