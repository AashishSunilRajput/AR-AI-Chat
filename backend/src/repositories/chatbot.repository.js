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
    // Find All
    // ==========================================

    async findAll(organizationId) {

        return await prisma.chatbot.findMany({

            where: {
                organizationId
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
            }

        });

    }

    // ==========================================
    // Find By Id + Organization
    // ==========================================

    async findByIdAndOrganization(id, organizationId) {

        return await prisma.chatbot.findFirst({

            where: {

                id,

                organizationId

            }

        });

    }

    // ==========================================
    // Update
    // ==========================================

    async update(id, data) {

        return await prisma.chatbot.update({

            where: {
                id
            },

            data

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