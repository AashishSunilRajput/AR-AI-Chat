import prisma from "../config/prisma.js";

class UserRepository {

    async create(data) {

        return await prisma.user.create({
            data
        });

    }

    async findByEmail(email) {

        return await prisma.user.findUnique({
            where: {
                email
            }
        });

    }

    async findById(id) {

        return await prisma.user.findUnique({

            where: {
                id
            },

            include: {
                organization: true
            }

        });

    }

    async findByIdAndOrganization(id, organizationId) {

        return await prisma.user.findFirst({

            where: {

                id,

                organizationId

            },

            include: {
                organization: true
            }

        });

    }

    async getAllUsers(organizationId) {

        return await prisma.user.findMany({

            where: {
                organizationId
            },

            orderBy: {
                id: "desc"
            }

        });

    }

    async update(id, data) {

        return await prisma.user.update({

            where: {
                id
            },

            data

        });

    }

    async updateStatus(id, isActive) {

        return await prisma.user.update({

            where: {
                id
            },

            data: {
                isActive
            }

        });

    }

    async delete(id) {

        return await prisma.user.delete({

            where: {
                id
            }

        });

    }

    async countUsers(organizationId) {

        return await prisma.user.count({

            where: {
                organizationId
            }

        });

    }

}

export default new UserRepository();