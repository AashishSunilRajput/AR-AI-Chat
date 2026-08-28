import prisma from "../config/prisma.js";

class WhatsAppPhoneNumberRepository {

    // ==========================================
    // Create Phone Number
    // ==========================================

    async create(data) {

        return await prisma.whatsAppPhoneNumber.create({

            data

        });

    }


    // ==========================================
    // Find By ID
    // ==========================================

    async findById(id) {

        return await prisma.whatsAppPhoneNumber.findUnique({

            where: {

                id: Number(id)

            },

            include: {

                whatsappAccount: true,

                contacts: true

            }

        });

    }


    // ==========================================
    // Find By Meta Phone Number ID
    // ==========================================

    async findByPhoneNumberId(phoneNumberId) {

        return await prisma.whatsAppPhoneNumber.findUnique({

            where: {

                phoneNumberId

            },

            include: {

                whatsappAccount: true

            }

        });

    }


    // ==========================================
    // Find By WhatsApp Account
    // ==========================================

    async findByAccount(whatsappAccountId) {

        return await prisma.whatsAppPhoneNumber.findMany({

            where: {

                whatsappAccountId:
                    Number(whatsappAccountId)

            },

            orderBy: {

                id: "desc"

            }

        });

    }


    // ==========================================
    // Update
    // ==========================================

    async update(id, data) {

        return await prisma.whatsAppPhoneNumber.update({

            where: {

                id: Number(id)

            },

            data

        });

    }


    // ==========================================
    // Delete
    // ==========================================

    async delete(id) {

        return await prisma.whatsAppPhoneNumber.delete({

            where: {

                id: Number(id)

            }

        });

    }

}


export default new WhatsAppPhoneNumberRepository();