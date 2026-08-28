import whatsappMessageRepository from "../repositories/whatsapp-message.repository.js";

class WhatsAppMessageService {

    // ==========================================
    // Create Message
    // ==========================================

    async create(data) {

        if (!data.conversationId) {

            throw new Error(
                "Conversation ID is required"
            );

        }

        if (!data.direction) {

            throw new Error(
                "Message direction is required"
            );

        }

        if (data.message === undefined) {

            throw new Error(
                "Message is required"
            );

        }


        return await whatsappMessageRepository.create({

            conversationId:
                Number(data.conversationId),

            whatsappMessageId:
                data.whatsappMessageId || null,

            direction:
                data.direction,

            status:
                data.status || "RECEIVED",

            messageType:
                data.messageType || "text",

            message:
                data.message,

            errorMessage:
                data.errorMessage || null,

            sentAt:
                data.sentAt || null,

            deliveredAt:
                data.deliveredAt || null,

            readAt:
                data.readAt || null

        });

    }


    // ==========================================
    // Get Message
    // ==========================================

    async getById(id) {

        return await whatsappMessageRepository.findById(

            Number(id)

        );

    }


    // ==========================================
    // Find By WhatsApp Message ID
    // ==========================================

    async getByWhatsAppMessageId(whatsappMessageId) {

        return await whatsappMessageRepository.findByWhatsAppMessageId(

            whatsappMessageId

        );

    }


    // ==========================================
    // Get Conversation Messages
    // ==========================================

    async getByConversation(conversationId) {

        return await whatsappMessageRepository.findByConversation(

            Number(conversationId)

        );

    }


    // ==========================================
    // Update Message
    // ==========================================

    async update(id, data) {

        return await whatsappMessageRepository.update(

            Number(id),

            data

        );

    }


    // ==========================================
    // Update WhatsApp Message Status
    // ==========================================

    async updateStatus(

        whatsappMessageId,

        status,

        extraData = {}

    ) {

        const allowedStatuses = [

            "RECEIVED",

            "SENT",

            "DELIVERED",

            "READ",

            "FAILED"

        ];

        if (!allowedStatuses.includes(status)) {

            throw new Error(
                "Invalid WhatsApp message status"
            );

        }


        return await whatsappMessageRepository
            .updateStatusByWhatsAppMessageId(

                whatsappMessageId,

                {

                    status,

                    ...extraData

                }

            );

    }


    // ==========================================
    // Delete Message
    // ==========================================

    async delete(id) {

        return await whatsappMessageRepository.delete(

            Number(id)

        );

    }

}


export default new WhatsAppMessageService();