import prisma from "../config/prisma.js";

class WhatsAppMessageRepository {

    async create(data) {
        return await prisma.whatsAppMessage.create({
            data
        });
    }

    async findById(id) {
        return await prisma.whatsAppMessage.findUnique({
            where: {
                id: Number(id)
            }
        });
    }

    async findByWhatsAppMessageId(whatsappMessageId) {
        return await prisma.whatsAppMessage.findUnique({
            where: {
                whatsappMessageId
            }
        });
    }

    async findByConversation(conversationId) {
        return await prisma.whatsAppMessage.findMany({
            where: {
                conversationId: Number(conversationId)
            },
            orderBy: {
                createdAt: "asc"
            }
        });
    }

    async update(id, data) {
        return await prisma.whatsAppMessage.update({
            where: {
                id: Number(id)
            },
            data
        });
    }

    async updateStatusByWhatsAppMessageId(
        whatsappMessageId,
        data
    ) {
        return await prisma.whatsAppMessage.update({
            where: {
                whatsappMessageId
            },
            data
        });
    }

    async delete(id) {
        return await prisma.whatsAppMessage.delete({
            where: {
                id: Number(id)
            }
        });
    }
}

export default new WhatsAppMessageRepository();