import prisma from "../config/prisma.js";

class WhatsAppWebhookEventRepository {

    async create(data) {
        return await prisma.whatsAppWebhookEvent.create({
            data
        });
    }

    async findById(id) {
        return await prisma.whatsAppWebhookEvent.findUnique({
            where: {
                id: Number(id)
            }
        });
    }

    async findByEventId(eventId) {
        return await prisma.whatsAppWebhookEvent.findUnique({
            where: {
                eventId
            }
        });
    }

    async findPending(whatsappAccountId) {
        return await prisma.whatsAppWebhookEvent.findMany({
            where: {
                whatsappAccountId: Number(whatsappAccountId),
                status: "PENDING"
            },
            orderBy: {
                createdAt: "asc"
            }
        });
    }

    async markProcessed(id) {
        return await prisma.whatsAppWebhookEvent.update({
            where: {
                id: Number(id)
            },
            data: {
                status: "PROCESSED",
                processedAt: new Date()
            }
        });
    }

    async markFailed(id, errorMessage) {
        return await prisma.whatsAppWebhookEvent.update({
            where: {
                id: Number(id)
            },
            data: {
                status: "FAILED",
                errorMessage
            }
        });
    }
}

export default new WhatsAppWebhookEventRepository();