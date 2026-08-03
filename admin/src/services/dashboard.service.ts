import api from "./http";

export interface DashboardStats {

    totalOrganizations?: number;

    totalUsers: number;

    activeUsers: number;

    inactiveUsers: number;

    totalChatbots: number;

    totalKnowledgeBases: number;

    totalLeads: number;

    totalConversations: number;

}

export interface DashboardResponse {

    organization: any;

    stats: DashboardStats;

    recentOrganizations?: any[];

    recentUsers?: any[];

    recentChatbots?: any[];

    recentLeads?: any[];

    recentConversations?: any[];

}

class DashboardService {

    async getStats() {

        const response = await api.get("/dashboard");

        return response.data;

    }

}

export default new DashboardService();