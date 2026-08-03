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

            const analytics =
                await dashboardRepository.getMonthlyAnalytics();

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

                },

                activities: [

                    ...(await dashboardRepository.recentOrganizations())
                        .map(item => ({

                            id: `org-${item.id}`,

                            type: "organization",

                            title: `Organization "${item.name}" created`,

                            createdAt: item.createdAt

                        })),

                    ...(await dashboardRepository.recentUsers())
                        .map(item => ({

                            id: `user-${item.id}`,

                            type: "user",

                            title: `User "${item.name}" added`,

                            createdAt: item.createdAt

                        })),

                    ...(await dashboardRepository.recentChatbots())
                        .map(item => ({

                            id: `chatbot-${item.id}`,

                            type: "chatbot",

                            title: `Chatbot "${item.name}" created`,

                            createdAt: item.createdAt

                        })),

                    ...(await dashboardRepository.recentLeads())
                        .map(item => ({

                            id: `lead-${item.id}`,

                            type: "lead",

                            title: "Lead generated",

                            createdAt: item.createdAt

                        })),

                    ...(await dashboardRepository.recentConversations())
                        .map(item => ({

                            id: `conversation-${item.id}`,

                            type: "conversation",

                            title: "Conversation started",

                            createdAt: item.createdAt

                        }))

                ]
                    .sort(

                        (a, b) =>

                            new Date(b.createdAt) -

                            new Date(a.createdAt)

                    )
                    .slice(0, 10),

                analytics,

                recentOrganizations:
                    await dashboardRepository.recentOrganizations(),

                recentUsers:
                    await dashboardRepository.recentUsers(),

                recentChatbots:
                    await dashboardRepository.recentChatbots(),

                recentLeads:
                    await dashboardRepository.recentLeads(),

                recentConversations:
                    await dashboardRepository.recentConversations(),
                    systemStatus:
    await dashboardRepository.getSystemStatus(),

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

            throw new Error(
                "Organization not found"
            );

        }

        const totalUsers =
            await dashboardRepository.totalUsers(
                user.organizationId
            );

        const activeUsers =
            await dashboardRepository.activeUsers(
                user.organizationId
            );

        const analytics =
            await dashboardRepository.getMonthlyAnalytics(
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

            },

            activities: [

                ...(await dashboardRepository.recentUsers(
                    user.organizationId
                )).map(item => ({

                    id: `user-${item.id}`,

                    type: "user",

                    title: `User "${item.name}" added`,

                    createdAt: item.createdAt

                })),

                ...(await dashboardRepository.recentChatbots(
                    user.organizationId
                )).map(item => ({

                    id: `chatbot-${item.id}`,

                    type: "chatbot",

                    title: `Chatbot "${item.name}" created`,

                    createdAt: item.createdAt

                })),

                ...(await dashboardRepository.recentLeads(
                    user.organizationId
                )).map(item => ({

                    id: `lead-${item.id}`,

                    type: "lead",

                    title: "Lead generated",

                    createdAt: item.createdAt

                })),

                ...(await dashboardRepository.recentConversations(
                    user.organizationId
                )).map(item => ({

                    id: `conversation-${item.id}`,

                    type: "conversation",

                    title: "Conversation started",

                    createdAt: item.createdAt

                }))

            ]
                .sort(
                    (a, b) =>
                        new Date(b.createdAt) -
                        new Date(a.createdAt)
                )
                .slice(0, 10),

            analytics,

            recentChatbots:
                await dashboardRepository.recentChatbots(
                    user.organizationId
                ),

            recentLeads:
                await dashboardRepository.recentLeads(
                    user.organizationId
                ),

            recentConversations:
                await dashboardRepository.recentConversations(
                    user.organizationId
                ),
             systemStatus:
    await dashboardRepository.getSystemStatus(),

        };

    }

}

export default new DashboardService();