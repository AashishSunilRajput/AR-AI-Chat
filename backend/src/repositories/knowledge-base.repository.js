import prisma from "../config/prisma.js";

class KnowledgeBaseRepository {

    // ==============================
    // Create
    // ==============================

    async create(data) {

        return await prisma.knowledgeBase.create({
            data
        });

    }

    // ==============================
    // Find All
    // ==============================

    async findAll(organizationId) {

        return await prisma.knowledgeBase.findMany({

            where: {
                organizationId
            },

            include: {
                chatbot: {
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

    // ==============================
    // Find By Id
    // ==============================

    async findById(id, organizationId) {

        return await prisma.knowledgeBase.findFirst({

            where: {
                id,
                organizationId
            },

            include: {
                chatbot: true,
                documents: true
            }

        });

    }

    // ==============================
    // Update
    // ==============================

    async update(id, organizationId, data) {

        return await prisma.knowledgeBase.update({

            where: {
                id
            },

            data

        });

    }

    // ==============================
    // Delete
    // ==============================

    async delete(id) {

        return await prisma.knowledgeBase.delete({

            where: {
                id
            }

        });

    }

}

export default new KnowledgeBaseRepository();