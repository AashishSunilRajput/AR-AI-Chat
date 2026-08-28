import prisma from "../config/prisma.js";

class WhatsAppContactRepository {

    async create(data) {
        return await prisma.whatsAppContact.create({
            data
        });
    }

    async findById(id) {
        return await prisma.whatsAppContact.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                phoneNumber: true,
                conversations: true
            }
        });
    }

    async findByWaId(waId) {
        return await prisma.whatsAppContact.findUnique({
            where: {
                waId
            }
        });
    }

    async findByPhoneNumber(phoneNumberId) {
        return await prisma.whatsAppContact.findMany({
            where: {
                phoneNumberId: Number(phoneNumberId)
            },
            orderBy: {
                id: "desc"
            }
        });
    }

    async update(id, data) {
        return await prisma.whatsAppContact.update({
            where: {
                id: Number(id)
            },
            data
        });
    }

    async delete(id) {
        return await prisma.whatsAppContact.delete({
            where: {
                id: Number(id)
            }
        });
    }
}

export default new WhatsAppContactRepository();