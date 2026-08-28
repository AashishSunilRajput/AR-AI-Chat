import whatsappAccountService
    from "./whatsapp-account.service.js";

import whatsappContactService
    from "./whatsapp-contact.service.js";

import whatsappConversationService
    from "./whatsapp-conversation.service.js";

import whatsappMessageService
    from "./whatsapp-message.service.js";

import whatsappAIService
    from "./whatsapp-ai.service.js";


class WhatsAppService {

    // ==========================================
    // Get Account
    // ==========================================

    async getAccount(id) {

        return await whatsappAccountService.getById(id);

    }


    // ==========================================
    // Create Account
    // ==========================================

    async createAccount(data) {

        return await whatsappAccountService.create(data);

    }


    // ==========================================
    // Process Incoming Text Message
    // ==========================================

    async processIncomingMessage({

        phoneNumberId,

        waId,

        contactName = null,

        profileName = null,

        whatsappMessageId = null,

        message

    }) {

        // ------------------------------------------
        // 1. Find / Create Contact
        // ------------------------------------------

        const contact =

            await whatsappContactService.findOrCreate({

                phoneNumberId,

                waId,

                name:
                    contactName,

                profileName

            });


        // ------------------------------------------
        // 2. Find / Create Conversation
        // ------------------------------------------

        const conversation =

            await whatsappConversationService.findOrCreate({

                contactId:
                    contact.id,

                phoneNumberId

            });


        // ------------------------------------------
        // 3. Prevent Duplicate Message
        // ------------------------------------------

        if (whatsappMessageId) {

            const existingMessage =

                await whatsappMessageService
                    .getByWhatsAppMessageId(

                        whatsappMessageId

                    );


            if (existingMessage) {

                return {

                    duplicate: true,

                    contact,

                    conversation,

                    message:
                        existingMessage

                };

            }

        }


        // ------------------------------------------
        // 4. Save Incoming Message
        // ------------------------------------------

        const savedMessage =

            await whatsappMessageService.create({

                conversationId:
                    conversation.id,

                whatsappMessageId,

                direction:
                    "INBOUND",

                status:
                    "RECEIVED",

                messageType:
                    "text",

                message

            });


        // ------------------------------------------
        // 5. Update Last Message Time
        // ------------------------------------------

        await whatsappConversationService.update(

            conversation.id,

            {

                lastMessageAt:
                    new Date()

            }

        );


        // ------------------------------------------
        // 6. Process AI Reply
        // ------------------------------------------

        let aiResponse = null;


        if (
            conversation.agentMode === "AI"
        ) {

            try {

                aiResponse =

                    await whatsappAIService.processReply({

                        conversation,

                        message:
                            savedMessage

                    });


            } catch (error) {

                console.error(

                    "WhatsApp AI Processing Error:",

                    error

                );


                aiResponse = {

                    aiProcessed:
                        false,

                    error:
                        error.message

                };

            }

        }


        // ------------------------------------------
        // 7. Return Result
        // ------------------------------------------

        return {

            duplicate:
                false,

            contact,

            conversation,

            message:
                savedMessage,

            aiResponse

        };

    }

}


export default new WhatsAppService();