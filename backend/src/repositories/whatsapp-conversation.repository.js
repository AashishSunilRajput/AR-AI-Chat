import prisma from "../config/prisma.js";

class WhatsAppConversationRepository {

    async create(data) {
        return await prisma.whatsAppConversation.create({
            data,
            include: {
                contact: true,
                phoneNumber: true
            }
        });
    }

    async findById(id) {
        return await prisma.whatsAppConversation.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                contact: true,
                phoneNumber: true,
                messages: {
                    orderBy: {
                        createdAt: "asc"
                    }
                }
            }
        });
    }

    async findActive(contactId, phoneNumberId) {
        return await prisma.whatsAppConversation.findFirst({
            where: {
                contactId: Number(contactId),
                phoneNumberId: Number(phoneNumberId),
                status: "ACTIVE"
            },
            include: {
                contact: true,
                phoneNumber: true
            }
        });
    }

    async findByContact(contactId) {
        return await prisma.whatsAppConversation.findMany({
            where: {
                contactId: Number(contactId)
            },
            include: {
                phoneNumber: true
            },
            orderBy: {
                lastMessageAt: "desc"
            }
        });
    }

    async findByPhoneNumber(phoneNumberId) {
        return await prisma.whatsAppConversation.findMany({
            where: {
                phoneNumberId: Number(phoneNumberId)
            },
            include: {
                contact: true
            },
            orderBy: {
                lastMessageAt: "desc"
            }
        });
    }

    async update(id, data) {
        return await prisma.whatsAppConversation.update({
            where: {
                id: Number(id)
            },
            data
        });
    }

    async close(id) {
        return await prisma.whatsAppConversation.update({
            where: {
                id: Number(id)
            },
            data: {
                status: "CLOSED"
            }
        });
    }

    async setAgentMode(id, agentMode) {
        return await prisma.whatsAppConversation.update({
            where: {
                id: Number(id)
            },
            data: {
                agentMode
            }
        });
    }
}

export default new WhatsAppConversationRepository();