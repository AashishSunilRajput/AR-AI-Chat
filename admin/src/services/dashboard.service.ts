import api from "./http";

export interface DashboardStats {

    totalUsers: number;

    activeUsers: number;

    inactiveUsers: number;

    totalChatbots: number;

    totalKnowledgeBases: number;

    totalLeads: number;

    totalConversations: number;

}

class DashboardService {

    async getStats() {

        const response = await api.get(
            "/dashboard"
        );

        return response.data;

    }

}

export default new DashboardService();