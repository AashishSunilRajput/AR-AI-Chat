import prisma from "../config/prisma.js";

class WhatsAppAccountRepository {

    // ==========================================
    // Create WhatsApp Account
    // ==========================================

    async create(data) {

        return await prisma.whatsAppAccount.create({

            data

        });

    }


    // ==========================================
    // Find By Id
    // ==========================================

    async findById(id) {

        return await prisma.whatsAppAccount.findUnique({

            where: {

                id: Number(id)

            },

            include: {

                phoneNumbers: true

            }

        });

    }


    // ==========================================
    // Find By Organization
    // ==========================================

    async findByOrganization(organizationId) {

        return await prisma.whatsAppAccount.findMany({

            where: {

                organizationId: Number(organizationId)

            },

            include: {

                phoneNumbers: true

            },

            orderBy: {

                id: "desc"

            }

        });

    }


    // ==========================================
    // Update
    // ==========================================

    async update(id, data) {

        return await prisma.whatsAppAccount.update({

            where: {

                id: Number(id)

            },

            data

        });

    }


    // ==========================================
    // Delete
    // ==========================================

    async delete(id) {

        return await prisma.whatsAppAccount.delete({

            where: {

                id: Number(id)

            }

        });

    }

}


export default new WhatsAppAccountRepository();