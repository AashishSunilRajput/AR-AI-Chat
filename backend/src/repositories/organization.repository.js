import prisma from "../config/prisma.js";

class OrganizationRepository {

    async createOrganization(data) {

        return await prisma.organization.create({
            data
        });

    }

    async findByEmail(email) {

        return await prisma.organization.findUnique({
            where: {
                email
            }
        });

    }

    async findBySlug(slug) {

        return await prisma.organization.findUnique({
            where: {
                slug
            }
        });

    }

    async createOrganizationSetting(organizationId) {

        return await prisma.organizationSetting.create({

            data: {
                organizationId
            }

        });

    }

    async createAdmin(data) {

        return await prisma.user.create({

            data

        });

    }

    async findOrganizationById(id) {

        return await prisma.organization.findUnique({

            where: {
                id
            },

            include: {

                users: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: true,
                        isActive: true
                    }
                },

                settings: true

            }

        });

    }

    async updateOrganization(id, data) {

        return await prisma.organization.update({

            where: {
                id
            },

            data

        });

    }

    async updateOrganizationSettings(organizationId, data) {

        return await prisma.organizationSetting.update({

            where: {
                organizationId
            },

            data

        });

    }

}

export default new OrganizationRepository();