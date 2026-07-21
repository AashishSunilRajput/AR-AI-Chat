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
    // Total Users
    // ===========================================

    async totalUsers(organizationId) {

        return await prisma.user.count({

            where: {
                organizationId
            }

        });

    }

    // ===========================================
    // Active Users
    // ===========================================

    async activeUsers(organizationId) {

        return await prisma.user.count({

            where: {

                organizationId,

                isActive: true

            }

        });

    }

}

export default new DashboardRepository();