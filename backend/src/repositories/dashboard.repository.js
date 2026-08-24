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

    // ===========================================
// Recent Organizations
// ===========================================

async recentOrganizations(limit = 5) {

    return await prisma.organization.findMany({

        orderBy: {
            createdAt: "desc"
        },

        take: limit,

        select: {

            id: true,
            name: true,
            email: true,
            plan: true,
            status: true,
            createdAt: true

        }

    });

}

// ===========================================
// Recent Users
// ===========================================

async recentUsers(
    organizationId = null,
    limit = 5
) {

    return await prisma.user.findMany({

        where: organizationId
            ? {
                organizationId
            }
            : {},

        orderBy: {

            createdAt: "desc"

        },

        take: limit,

        include: {

            organization: {

                select: {

                    name: true

                }

            }

        }

    });

}

// ===========================================
// Recent Leads
// ===========================================

async recentLeads(organizationId = null, limit = 5) {

    return await prisma.lead.findMany({

        where: organizationId
            ? {
                  organizationId
              }
            : {},

        take: limit,

        orderBy: {

            createdAt: "desc"

        },

        include: {

            visitor: {

                select: {

                    name: true,
                    email: true

                }

            }

        }

    });

}

// ===========================================
// Recent Conversations
// ===========================================

async recentConversations(organizationId = null, limit = 5) {

    return await prisma.conversation.findMany({

        where: organizationId
            ? {

                  chatbot: {

                      organizationId

                  }

              }
            : {},

        orderBy: {

            createdAt: "desc"

        },

        take: limit,

        include: {

            visitor: {

                select: {

                    name: true

                }

            },

            chatbot: {

                select: {

                    name: true

                }

            }

        }

    });

}

// ===========================================
// Recent Chatbots
// ===========================================

async recentChatbots(organizationId = null, limit = 5) {

    return await prisma.chatbot.findMany({

        where: organizationId
            ? {
                  organizationId
              }
            : {},

        orderBy: {

            createdAt: "desc"

        },

        take: limit,

        include: {

            organization: {

                select: {

                    name: true

                }

            }

        }

    });

}
// ===========================================
// Monthly Analytics
// ===========================================

async getMonthlyAnalytics(organizationId = null) {

    // ======================================
    // SUPER ADMIN
    // ======================================

    if (!organizationId) {

        const leads = await prisma.$queryRaw`

            SELECT
                DATE_FORMAT(createdAt, '%b') AS month,
                MONTH(createdAt) AS monthNumber,
                COUNT(*) AS total
            FROM Lead
            GROUP BY YEAR(createdAt),
                     MONTH(createdAt),
                     DATE_FORMAT(createdAt, '%b')
            ORDER BY YEAR(createdAt),
                     MONTH(createdAt)

        `;

        const conversations = await prisma.$queryRaw`

            SELECT
                DATE_FORMAT(createdAt, '%b') AS month,
                MONTH(createdAt) AS monthNumber,
                COUNT(*) AS total
            FROM Conversation
            GROUP BY YEAR(createdAt),
                     MONTH(createdAt),
                     DATE_FORMAT(createdAt, '%b')
            ORDER BY YEAR(createdAt),
                     MONTH(createdAt)

        `;

        return {
            leads,
            conversations
        };

    }

    // ======================================
    // CLIENT ADMIN
    // ======================================

    const leads = await prisma.$queryRaw`

        SELECT
            DATE_FORMAT(createdAt, '%b') AS month,
            MONTH(createdAt) AS monthNumber,
            COUNT(*) AS total
        FROM Lead
        WHERE organizationId = ${organizationId}
        GROUP BY YEAR(createdAt),
                 MONTH(createdAt),
                 DATE_FORMAT(createdAt, '%b')
        ORDER BY YEAR(createdAt),
                 MONTH(createdAt)

    `;

    const conversations = await prisma.$queryRaw`

        SELECT
            DATE_FORMAT(c.createdAt, '%b') AS month,
            MONTH(c.createdAt) AS monthNumber,
            COUNT(*) AS total
        FROM Conversation c
        INNER JOIN Chatbot cb
            ON cb.id = c.chatbotId
        WHERE cb.organizationId = ${organizationId}
        GROUP BY YEAR(c.createdAt),
                 MONTH(c.createdAt),
                 DATE_FORMAT(c.createdAt, '%b')
        ORDER BY YEAR(c.createdAt),
                 MONTH(c.createdAt)

    `;

    return {
        leads,
        conversations
    };

}


// ===========================================
// System Status
// ===========================================

async getSystemStatus() {

    let database = "DOWN";

    try {

        await prisma.$queryRaw`SELECT 1`;

        database = "ONLINE";

    }
    catch(error) {

        database = "DOWN";

    }


    return {

        api: "ONLINE",

        database,

        aiProvider: process.env.OPENAI_API_KEY
            ? "CONFIGURED"
            : "NOT CONFIGURED",

        storage: "ONLINE"

    };

}

}
export default new DashboardRepository();