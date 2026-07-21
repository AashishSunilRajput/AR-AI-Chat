import prisma from "../config/prisma.js";

class ConversationRepository {

    // ==========================================
    // Create Conversation
    // ==========================================

    async create(data) {

        return await prisma.conversation.create({

            data,

            include: {

                visitor: true,

                chatbot: true

            }

        });

    }

    // ==========================================
    // Active Conversation
    // ==========================================

    async findActive(visitorId, chatbotId) {

        return await prisma.conversation.findFirst({

            where: {

                visitorId,

                chatbotId,

                status: "ACTIVE"

            },

            include: {

                visitor: true,

                chatbot: true

            }

        });

    }

    // ==========================================
    // Find By Id
    // ==========================================

    async findById(id) {

        return await prisma.conversation.findUnique({

            where: {

                id: Number(id)

            },

            include: {

                visitor: true,

                chatbot: true,

                messages: {

                    orderBy: {

                        createdAt: "asc"

                    }

                }

            }

        });

    }

    // ==========================================
    // Close Conversation
    // ==========================================

    async close(id) {

        return await prisma.conversation.update({

            where: {

                id: Number(id)

            },

            data: {

                status: "CLOSED",

                endedAt: new Date()

            }

        });

    }

}

export default new ConversationRepository();