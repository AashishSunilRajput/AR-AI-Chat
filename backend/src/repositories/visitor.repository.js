import prisma from "../config/prisma.js";

class VisitorRepository {

    // ==========================================
    // Create Visitor
    // ==========================================

    async create(data) {

        return await prisma.visitor.create({

            data

        });

    }

    // ==========================================
    // Find By Session Token
    // ==========================================

    async findBySessionToken(sessionToken) {

        return await prisma.visitor.findUnique({

            where: {

                sessionToken

            },

            include: {

                chatbot: true,

                conversations: true

            }

        });

    }

    // ==========================================
    // Find By Id
    // ==========================================

    async findById(id) {

        return await prisma.visitor.findUnique({

            where: {

                id: Number(id)

            },

            include: {

                chatbot: true,

                conversations: true

            }

        });

    }

    // ==========================================
    // Update Last Seen
    // ==========================================

    async updateLastSeen(id) {

        return await prisma.visitor.update({

            where: {

                id: Number(id)

            },

            data: {

                lastSeenAt: new Date()

            }

        });

    }

    // ==========================================
    // Delete
    // ==========================================

    async delete(id) {

        return await prisma.visitor.delete({

            where: {

                id: Number(id)

            }

        });

    }

}

export default new VisitorRepository();