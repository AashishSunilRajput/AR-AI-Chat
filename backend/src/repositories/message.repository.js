import prisma from "../config/prisma.js";

class MessageRepository {

    // ==========================================
    // Create Message
    // ==========================================

    async create(data) {

        return await prisma.message.create({

            data,

            include: {

                conversation: true

            }

        });

    }

    // ==========================================
    // Find Messages By Conversation
    // ==========================================

    async findByConversation(conversationId) {

        return await prisma.message.findMany({

            where: {

                conversationId: Number(conversationId)

            },

            orderBy: {

                createdAt: "asc"

            }

        });

    }

    // ==========================================
    // Find Message By Id
    // ==========================================

    async findById(id) {

        return await prisma.message.findUnique({

            where: {

                id: Number(id)

            }

        });

    }

    // ==========================================
    // Delete Message
    // ==========================================

    async delete(id) {

        return await prisma.message.delete({

            where: {

                id: Number(id)

            }

        });

    }

}

export default new MessageRepository();