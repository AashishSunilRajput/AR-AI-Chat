import prisma from "../config/prisma.js";

class DashboardRepository {

    // ===========================================
    // Organization Details
    // ===========================================

    async getOrganization(organizationId) {

        return await prisma.organization.findUnique({

            where: {
                id: organizationId
            },

            select: {
                id: true,
                name: true,
                slug: true,
                email: true,
                plan: true,
                status: true,
                createdAt: true
            }

        });

    }

    // ===========================================
    // Organization Users
    // ===========================================

    async totalUsers(organizationId) {

        return await prisma.user.count({

            where: {
                organizationId
            }

        });

    }

    async activeUsers(organizationId) {

        return await prisma.user.count({

            where: {
                organizationId,
                isActive: true
            }

        });

    }

    // ===========================================
    // Global Users
    // ===========================================

    async totalUsersGlobal() {

        return await prisma.user.count();

    }

    async activeUsersGlobal() {

        return await prisma.user.count({

            where: {
                isActive: true
            }

        });

    }

    // ===========================================
    // Organizations
    // ===========================================

    async totalOrganizations() {

        return await prisma.organization.count();

    }

    // ===========================================
    // Chatbots
    // ===========================================

    async totalChatbots() {

        return await prisma.chatbot.count();

    }

    async totalChatbotsByOrganization(organizationId) {

        return await prisma.chatbot.count({

            where: {
                organizationId
            }

        });

    }

    // ===========================================
    // Knowledge Bases
    // ===========================================

    async totalKnowledgeBases() {

        return await prisma.knowledgeBase.count();

    }

    async totalKnowledgeBasesByOrganization(organizationId) {

        return await prisma.knowledgeBase.count({

            where: {
                organizationId
            }

        });

    }

    // ===========================================
    // Leads
    // ===========================================

    async totalLeads() {

        return await prisma.lead.count();

    }

    async totalLeadsByOrganization(organizationId) {

        return await prisma.lead.count({

            where: {
                organizationId
            }

        });

    }

    // ===========================================
    // Conversations
    // ===========================================

    async totalConversations() {

        return await prisma.conversation.count();

    }

    async totalConversationsByOrganization(organizationId) {

        return await prisma.conversation.count({

            where: {

                chatbot: {

                    organizationId

                }

            }

        });

    }

}

export default new DashboardRepository();