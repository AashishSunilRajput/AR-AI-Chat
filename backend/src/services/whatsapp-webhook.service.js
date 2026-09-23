import whatsappWebhookEventRepository
    from "../repositories/whatsapp-webhook-event.repository.js";

import whatsappPhoneNumberService
    from "./whatsapp-phone-number.service.js";

import whatsappMessageService
    from "./whatsapp-message.service.js";

import whatsappService
    from "./whatsapp.service.js";


class WhatsAppWebhookService {

    // ==========================================
    // Process Meta Webhook
    // ==========================================

    async processWebhook(payload) {

        if (!payload) {
            throw new Error(
                "Webhook payload is required"
            );
        }

        const entries =
            payload.entry || [];

        if (!entries.length) {
            return {
                processed: true,
                message:
                    "Webhook received without entries"
            };
        }

        const results = [];

        for (const entry of entries) {

            const changes =
                entry.changes || [];

            for (const change of changes) {

                const value =
                    change.value || {};

                const metadata =
                    value.metadata || {};

                const metaPhoneNumberId =
                    metadata.phone_number_id;

                if (!metaPhoneNumberId) {

                    results.push({
                        processed: false,
                        reason:
                            "Meta phone number ID not found"
                    });

                    continue;
                }

                const phoneNumber =
                    await whatsappPhoneNumberService
                        .getByPhoneNumberId(
                            metaPhoneNumberId
                        );

                if (!phoneNumber) {

                    results.push({
                        processed: false,
                        reason:
                            "WhatsApp phone number not configured",
                        phoneNumberId:
                            metaPhoneNumberId
                    });

                    continue;
                }

                const whatsappAccountId =
                    phoneNumber.whatsappAccountId;

                const eventId =
                    this.generateEventId(
                        entry,
                        change
                    );

                // ==========================================
                // Duplicate Webhook Check
                // ==========================================

                if (eventId) {

                    const existingEvent =
                        await whatsappWebhookEventRepository
                            .findByEventId(
                                eventId
                            );

                    if (existingEvent) {

                        results.push({
                            processed: true,
                            duplicate: true,
                            eventId
                        });

                        continue;
                    }

                }

                // ==========================================
                // Save Webhook Event
                // ==========================================

                const webhookEvent =
                    await whatsappWebhookEventRepository
                        .create({

                            whatsappAccountId,

                            eventId,

                            payload,

                            status: "PENDING"

                        });

                try {

                    // ==========================================
                    // Incoming Messages
                    // ==========================================

                    if (
                        Array.isArray(
                            value.messages
                        ) &&
                        value.messages.length
                    ) {

                        for (
                            const message
                            of value.messages
                        ) {

                            await this
                                .processIncomingMessage(
                                    phoneNumber,
                                    value,
                                    message
                                );

                        }

                    }

                    // ==========================================
                    // Message Status Updates
                    // ==========================================

                    if (
                        Array.isArray(
                            value.statuses
                        ) &&
                        value.statuses.length
                    ) {

                        for (
                            const status
                            of value.statuses
                        ) {

                            await this
                                .processMessageStatus(
                                    status
                                );

                        }

                    }

                    await whatsappWebhookEventRepository
                        .markProcessed(
                            webhookEvent.id
                        );

                    results.push({

                        processed: true,

                        duplicate: false,

                        eventId,

                        webhookEventId:
                            webhookEvent.id

                    });

                } catch (error) {

                    await whatsappWebhookEventRepository
                        .markFailed(
                            webhookEvent.id,
                            error.message
                        );

                    throw error;
                }
            }
        }

        return {
            processed: true,
            results
        };
    }


    // ==========================================
    // Process Incoming WhatsApp Message
    // ==========================================

    async processIncomingMessage(
        phoneNumber,
        value,
        message
    ) {

        // ------------------------------------------
        // Only process text messages for now
        // ------------------------------------------

        if (
            message.type !== "text"
        ) {

            console.log(
                "WhatsApp message type not supported:",
                message.type
            );

            return {
                processed: false,
                reason:
                    "Unsupported message type",
                messageType:
                    message.type
            };
        }

        const waId =
            message.from;

        const contactName =
            value.contacts?.[0]
                ?.profile
                ?.name || null;

        const profileName =
            contactName;

        const messageText =
            message.text?.body || "";

        if (!waId) {
            throw new Error(
                "WhatsApp sender waId is missing"
            );
        }

        if (!messageText) {
            throw new Error(
                "WhatsApp text message is empty"
            );
        }

        const result =
            await whatsappService
                .processIncomingMessage({

                    phoneNumberId:
                        phoneNumber.id,

                    waId,

                    contactName,

                    profileName,

                    whatsappMessageId:
                        message.id,

                    message:
                        messageText

                });

        return result;
    }


    // ==========================================
    // Process Message Status
    // ==========================================

    async processMessageStatus(status) {

        const whatsappMessageId =
            status.id;

        const statusValue =
            status.status;

        if (
            !whatsappMessageId ||
            !statusValue
        ) {
            return;
        }

        const message =
            await whatsappMessageService
                .getByWhatsAppMessageId(
                    whatsappMessageId
                );

        if (!message) {

            console.log(
                "WhatsApp message not found for status:",
                whatsappMessageId
            );

            return;
        }

        const updateData = {};

        switch (statusValue) {

            case "sent":

                updateData.status =
                    "SENT";

                updateData.sentAt =
                    this.getStatusDate(status);

                break;


            case "delivered":

                updateData.status =
                    "DELIVERED";

                updateData.deliveredAt =
                    this.getStatusDate(status);

                break;


            case "read":

                updateData.status =
                    "READ";

                updateData.readAt =
                    this.getStatusDate(status);

                break;


            case "failed":

                updateData.status =
                    "FAILED";

                updateData.errorMessage =
                    this.getStatusError(status);

                break;


            default:

                console.log(
                    "Unknown WhatsApp status:",
                    statusValue
                );

                return;
        }

        await whatsappMessageService.update(
            message.id,
            updateData
        );
    }


    // ==========================================
    // Generate Event ID
    // ==========================================

    generateEventId(
        entry,
        change
    ) {

        const value =
            change.value || {};

        const messageId =
            value.messages?.[0]?.id;

        if (messageId) {
            return `message:${messageId}`;
        }

        const statusId =
            value.statuses?.[0]?.id;

        if (statusId) {
            return `status:${statusId}:${value.statuses?.[0]?.status}`;
        }

        const entryId =
            entry.id;

        const field =
            change.field;

        if (
            entryId &&
            field
        ) {
            return `${entryId}:${field}:${JSON.stringify(value)}`;
        }

        return null;
    }


    // ==========================================
    // Get Status Date
    // ==========================================

    getStatusDate(status) {

        if (!status.timestamp) {
            return new Date();
        }

        const timestamp =
            Number(
                status.timestamp
            );

        if (
            Number.isNaN(timestamp)
        ) {
            return new Date();
        }

        return new Date(
            timestamp * 1000
        );
    }


    // ==========================================
    // Get Status Error
    // ==========================================

    getStatusError(status) {

        const errors =
            status.errors || [];

        if (!errors.length) {
            return "WhatsApp message failed";
        }

        return errors
            .map(error => {

                return (
                    error.title ||
                    error.message ||
                    `WhatsApp error code: ${error.code || "unknown"}`
                );

            })
            .join("; ");
    }
}


export default new WhatsAppWebhookService();