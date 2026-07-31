import prisma from "../config/prisma.js";

class ChatbotRepository {

    // ==========================================
    // Create
    // ==========================================

    async create(data) {

        return await prisma.chatbot.create({
            data
        });

    }

    // ==========================================
    // SUPER ADMIN
    // All Chatbots
    // ==========================================

    async findAll() {

        return await prisma.chatbot.findMany({

            include: {

                organization: {

                    select: {

                        id: true,

                        name: true

                    }

                }

            },

            orderBy: {

                id: "desc"

            }

        });

    }

    // ==========================================
    // CLIENT ADMIN
    // Organization Chatbots
    // ==========================================

    async findByOrganization(
        organizationId
    ) {

        return await prisma.chatbot.findMany({

            where: {

                organizationId

            },

            include: {

                organization: {

                    select: {

                        id: true,

                        name: true

                    }

                }

            },

            orderBy: {

                id: "desc"

            }

        });

    }

    // ==========================================
    // Find By Id
    // ==========================================

    async findById(id) {

        return await prisma.chatbot.findUnique({

            where: {

                id

            },

            include: {

                organization: true

            }

        });

    }

    // ==========================================
    // Find By Id + Organization
    // ==========================================

    async findByIdAndOrganization(
        id,
        organizationId
    ) {

        return await prisma.chatbot.findFirst({

            where: {

                id,

                organizationId

            },

            include: {

                organization: true

            }

        });

    }

    // ==========================================
    // Update
    // ==========================================

    async update(
        id,
        data
    ) {

        return await prisma.chatbot.update({

            where: {

                id

            },

            data

        });

    }

    // ==========================================
    // Update Status
    // ==========================================

    async updateStatus(
        id,
        isActive
    ) {

        return await prisma.chatbot.update({

            where: {

                id

            },

            data: {

                isActive

            }

        });

    }

    // ==========================================
    // Delete
    // ==========================================

    async delete(id) {

        return await prisma.chatbot.delete({

            where: {

                id

            }

        });

    }

}

export default new ChatbotRepository();