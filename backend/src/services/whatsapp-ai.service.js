import whatsappMessageRepository
    from "../repositories/whatsapp-message.repository.js";

import knowledgeSearchService
    from "./knowledge-search.service.js";

import openAIService
    from "./openai.service.js";

import whatsappCloudService
    from "./whatsapp-cloud.service.js";


class WhatsAppAIService {

    // ==========================================
    // Process AI Reply
    // ==========================================

    async processReply({

        conversation,

        message

    }) {

        // ==========================================
        // Check Agent Mode
        // ==========================================

        if (
            conversation.agentMode !== "AI"
        ) {

            return {

                aiProcessed: false,

                reason:
                    "Conversation is not in AI mode"

            };

        }


        // ==========================================
        // Get Chatbot
        // ==========================================

        const chatbotId =
            conversation.phoneNumber
                ?.whatsappAccount
                ?.chatbotId;


        if (!chatbotId) {

            throw new Error(
                "Chatbot is not configured for this WhatsApp account"
            );

        }


        // ==========================================
        // Get WhatsApp Recipient
        // ==========================================

        const recipientWaId =
            conversation.contact?.waId;


        if (!recipientWaId) {

            throw new Error(
                "WhatsApp recipient waId is not available"
            );

        }


        // ==========================================
        // Knowledge Search
        // ==========================================

        const knowledgeResults =
            await knowledgeSearchService.search(

                chatbotId,

                message.message

            );


        // ==========================================
        // No Knowledge Found
        // ==========================================

        if (!knowledgeResults.length) {

            const fallbackMessage =
                "I can only answer questions related to this business. Please ask about our services, products, pricing, or other information available in our knowledge base.";


            // ------------------------------------------
            // Send fallback message to WhatsApp
            // ------------------------------------------

            const whatsappResponse =
                await whatsappCloudService.sendTextMessage({

                    to:
                        recipientWaId,

                    message:
                        fallbackMessage

                });


            const whatsappMessageId =
                whatsappResponse
                    ?.messages?.[0]?.id || null;


            // ------------------------------------------
            // Save OUTBOUND message
            // ------------------------------------------

            const aiMessage =
                await whatsappMessageRepository.create({

                    conversationId:
                        conversation.id,

                    whatsappMessageId:

                        whatsappMessageId,

                    direction:
                        "OUTBOUND",

                    status:
                        "SENT",

                    messageType:
                        "text",

                    message:
                        fallbackMessage

                });


            return {

                aiProcessed: true,

                message:
                    aiMessage,

                whatsappResponse

            };

        }


        // ==========================================
        // Build Knowledge Context
        // ==========================================

        const knowledgeContext =

            knowledgeResults

                .map(

                    (item, index) =>

                        `SOURCE ${index + 1}

Document:
${item.document}

Content:
${item.content}`

                )

                .join("\n\n");


        // ==========================================
        // Get Conversation History
        // ==========================================

        const history =
            await whatsappMessageRepository
                .findByConversation(

                    conversation.id

                );


        // ==========================================
        // Prepare AI History
        // ==========================================

        const aiHistory =

            history

                .slice(-10)

                .map(item => ({

                    role:
                        item.direction === "INBOUND"
                            ? "user"
                            : "assistant",

                    content:
                        item.message

                }));


        // ==========================================
        // Generate AI Reply
        // ==========================================

        const aiResponse =
            await openAIService.generateReply({

                message:
                    message.message,

                context:
                    knowledgeContext,

                history:
                    aiHistory,

                model:
                    conversation
                        .phoneNumber
                        ?.whatsappAccount
                        ?.chatbot
                        ?.settings
                        ?.model ||
                    "gpt-5-mini",

                maxTokens:
                    conversation
                        .phoneNumber
                        ?.whatsappAccount
                        ?.chatbot
                        ?.settings
                        ?.maxTokens ||
                    1000

            });


        // ==========================================
        // Send AI Reply to WhatsApp
        // ==========================================

        const whatsappResponse =
            await whatsappCloudService.sendTextMessage({

                to:
                    recipientWaId,

                message:
                    aiResponse.message

            });


        // ==========================================
        // Get Meta WhatsApp Message ID
        // ==========================================

        const whatsappMessageId =
            whatsappResponse
                ?.messages?.[0]?.id || null;


        // ==========================================
        // Save OUTBOUND Message
        // ==========================================

        const aiMessage =
            await whatsappMessageRepository.create({

                conversationId:
                    conversation.id,

                whatsappMessageId:

                    whatsappMessageId,

                direction:
                    "OUTBOUND",

                status:
                    "SENT",

                messageType:
                    "text",

                message:
                    aiResponse.message

            });


        // ==========================================
        // Return
        // ==========================================

        return {

            aiProcessed: true,

            message:
                aiMessage,

            whatsappResponse,

            usage:
                aiResponse.usage

        };

    }

}


export default new WhatsAppAIService();

