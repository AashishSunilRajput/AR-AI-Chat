import whatsappWebhookEventRepository from "../repositories/whatsapp-webhook-event.repository.js";

class WhatsAppWebhookService {

    // ==========================================
    // Check Duplicate Event
    // ==========================================

    async findByEventId(eventId) {

        if (!eventId) {

            return null;

        }

        return await whatsappWebhookEventRepository.findByEventId(

            eventId

        );

    }


    // ==========================================
    // Create Webhook Event
    // ==========================================

    async create({

        whatsappAccountId,

        eventId = null,

        payload

    }) {

        if (!whatsappAccountId) {

            throw new Error(
                "WhatsApp Account ID is required"
            );

        }

        if (!payload) {

            throw new Error(
                "Webhook payload is required"
            );

        }


        // Prevent duplicate event

        if (eventId) {

            const existingEvent =

                await this.findByEventId(eventId);


            if (existingEvent) {

                return {

                    duplicate: true,

                    event: existingEvent

                };

            }

        }


        const event =

            await whatsappWebhookEventRepository.create({

                whatsappAccountId:
                    Number(whatsappAccountId),

                eventId,

                payload,

                status:
                    "PENDING"

            });


        return {

            duplicate: false,

            event

        };

    }


    // ==========================================
    // Get Pending Events
    // ==========================================

    async getPending(whatsappAccountId) {

        return await whatsappWebhookEventRepository.findPending(

            Number(whatsappAccountId)

        );

    }


    // ==========================================
    // Mark Processed
    // ==========================================

    async markProcessed(id) {

        return await whatsappWebhookEventRepository.markProcessed(

            Number(id)

        );

    }


    // ==========================================
    // Mark Failed
    // ==========================================

    async markFailed(id, errorMessage) {

        return await whatsappWebhookEventRepository.markFailed(

            Number(id),

            errorMessage

        );

    }

}


export default new WhatsAppWebhookService();