import dashboardRepository from "../repositories/dashboard.repository.js";

class DashboardService {

    // ===========================================
    // Dashboard
    // ===========================================

    async getDashboard(user) {

        // ===========================================
        // SUPER ADMIN
        // ===========================================

        if (user.role === "SUPER_ADMIN") {

            const totalUsers =
                await dashboardRepository.totalUsersGlobal();

            const activeUsers =
                await dashboardRepository.activeUsersGlobal();

            return {

                organization: null,

                stats: {

                    totalOrganizations:
                        await dashboardRepository.totalOrganizations(),

                    totalUsers,

                    activeUsers,

                    inactiveUsers:
                        totalUsers - activeUsers,

                    totalChatbots:
                        await dashboardRepository.totalChatbots(),

                    totalKnowledgeBases:
                        await dashboardRepository.totalKnowledgeBases(),

                    totalLeads:
                        await dashboardRepository.totalLeads(),

                    totalConversations:
                        await dashboardRepository.totalConversations()

                }

            };

        }

        // ===========================================
        // CLIENT ADMIN
        // ===========================================

        const organization =
            await dashboardRepository.getOrganization(
                user.organizationId
            );

        if (!organization) {

            throw new Error("Organization not found");

        }

        const totalUsers =
            await dashboardRepository.totalUsers(
                user.organizationId
            );

        const activeUsers =
            await dashboardRepository.activeUsers(
                user.organizationId
            );

        return {

            organization,

            stats: {

                totalUsers,

                activeUsers,

                inactiveUsers:
                    totalUsers - activeUsers,

                totalChatbots:
                    await dashboardRepository.totalChatbotsByOrganization(
                        user.organizationId
                    ),

                totalKnowledgeBases:
                    await dashboardRepository.totalKnowledgeBasesByOrganization(
                        user.organizationId
                    ),

                totalLeads:
                    await dashboardRepository.totalLeadsByOrganization(
                        user.organizationId
                    ),

                totalConversations:
                    await dashboardRepository.totalConversationsByOrganization(
                        user.organizationId
                    )

            }

        };

    }

}

export default new DashboardService();