import dashboardRepository from "../repositories/dashboard.repository.js";

class DashboardService {

    // ===========================================
    // Dashboard
    // ===========================================

    async getDashboard(user) {

        // Organization Details
        const organization = await dashboardRepository.getOrganization(
            user.organizationId
        );

        if (!organization) {
            throw new Error("Organization not found");
        }

        // User Statistics
        const totalUsers = await dashboardRepository.totalUsers(
            user.organizationId
        );

        const activeUsers = await dashboardRepository.activeUsers(
            user.organizationId
        );

        const inactiveUsers = totalUsers - activeUsers;

        // Dashboard Response
        return {

            organization: {

                id: organization.id,

                name: organization.name,

                slug: organization.slug,

                email: organization.email,

                plan: organization.plan,

                status: organization.status,

                createdAt: organization.createdAt

            },

            stats: {

                totalUsers,

                activeUsers,

                inactiveUsers,

                totalChatbots: 0,

                totalKnowledgeBases: 0,

                totalLeads: 0,

                totalConversations: 0

            }

        };

    }

}

export default new DashboardService();