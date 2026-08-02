import analyticsRepository from "../repositories/analytics.repository.js";

class AnalyticsService {

    // ==========================================
    // Overview
    // ==========================================

    async getOverview(user) {

        if (user.role === "SUPER_ADMIN") {

            return await analyticsRepository.getOverview();

        }

        return await analyticsRepository.getOverview(
            user.organizationId
        );

    }


    // ==========================================
    // Lead Analytics
    // ==========================================

    async getLeadAnalytics(user) {

        let statusAnalytics;
        let monthlyTrend;


        if (user.role === "SUPER_ADMIN") {

            statusAnalytics =
                await analyticsRepository.getLeadAnalytics();


            monthlyTrend =
                await analyticsRepository.getMonthlyLeadTrend();

        }
        else {

            statusAnalytics =
                await analyticsRepository.getLeadAnalytics(
                    user.organizationId
                );


            monthlyTrend =
                await analyticsRepository.getMonthlyLeadTrend(
                    user.organizationId
                );

        }


        return {

            ...statusAnalytics,

            monthlyTrend

        };

    }


    // ==========================================
    // Visitor Analytics
    // ==========================================

    async getVisitorAnalytics(user) {

        let visitorAnalytics;
        let monthlyTrend;


        if (user.role === "SUPER_ADMIN") {

            visitorAnalytics =
                await analyticsRepository.getVisitorAnalytics();


            monthlyTrend =
                await analyticsRepository.getMonthlyVisitorTrend();

        }
        else {

            visitorAnalytics =
                await analyticsRepository.getVisitorAnalytics(
                    user.organizationId
                );


            monthlyTrend =
                await analyticsRepository.getMonthlyVisitorTrend(
                    user.organizationId
                );

        }


        return {

            ...visitorAnalytics,

            monthlyTrend

        };

    }

    // ==========================================
// Conversation Analytics
// ==========================================

async getConversationAnalytics(user) {

    let conversationAnalytics;
    let monthlyTrend;


    if (user.role === "SUPER_ADMIN") {


        conversationAnalytics =
            await analyticsRepository.getConversationAnalytics();



        monthlyTrend =
            await analyticsRepository.getMonthlyConversationTrend();


    }
    else {


        conversationAnalytics =
            await analyticsRepository.getConversationAnalytics(
                user.organizationId
            );



        monthlyTrend =
            await analyticsRepository.getMonthlyConversationTrend(
                user.organizationId
            );


    }



    return {

        ...conversationAnalytics,

        monthlyTrend

    };

}

}




export default new AnalyticsService();