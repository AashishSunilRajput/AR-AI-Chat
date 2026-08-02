import api from "./http";

// ==========================================
// Types
// ==========================================

export interface OverviewAnalytics {
    totalVisitors: number;
    totalConversations: number;
    totalLeads: number;
    activeConversations: number;
    convertedLeads: number;
    conversionRate: number;
    averageMessages: number;
}

export interface MonthlyTrend {
    month: string;
    count: number;
}

export interface LeadAnalytics {
    new: number;
    contacted: number;
    qualified: number;
    converted: number;
    lost: number;
    monthlyTrend: MonthlyTrend[];
}

export interface VisitorAnalytics {
    totalVisitors: number;
    visitorsWithLeads: number;
    visitorsWithoutLeads: number;
    returningVisitors: number;
    monthlyTrend: MonthlyTrend[];
}

export interface ConversationAnalytics {
    totalConversations: number;
    activeConversations: number;
    closedConversations: number;
    totalMessages: number;
    userMessages: number;
    aiMessages: number;
    averageMessages: number;
    monthlyTrend: MonthlyTrend[];
}

// ==========================================
// Service
// ==========================================

class AnalyticsService {

    // ==========================================
    // Overview
    // ==========================================

    async getOverview() {

        const response = await api.get("/analytics/overview");

        return response.data as {
            success: boolean;
            data: OverviewAnalytics;
        };

    }

    // ==========================================
    // Lead Analytics
    // ==========================================

    async getLeadAnalytics() {

        const response = await api.get("/analytics/leads");

        return response.data as {
            success: boolean;
            data: LeadAnalytics;
        };

    }

    // ==========================================
    // Visitor Analytics
    // ==========================================

    async getVisitorAnalytics() {

        const response = await api.get("/analytics/visitors");

        return response.data as {
            success: boolean;
            data: VisitorAnalytics;
        };

    }

    // ==========================================
    // Conversation Analytics
    // ==========================================

    async getConversationAnalytics() {

        const response = await api.get("/analytics/conversations");

        return response.data as {
            success: boolean;
            data: ConversationAnalytics;
        };

    }

}

export default new AnalyticsService();