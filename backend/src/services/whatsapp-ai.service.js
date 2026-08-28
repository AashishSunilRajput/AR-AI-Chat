import whatsappConversationRepository
    from "../repositories/whatsapp-conversation.repository.js";

import whatsappMessageRepository
    from "../repositories/whatsapp-message.repository.js";

import knowledgeSearchService
    from "./knowledge-search.service.js";

import openAIService
    from "./openai.service.js";


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


            const aiMessage =
                await whatsappMessageRepository.create({

                    conversationId:
                        conversation.id,

                    whatsappMessageId:
                        null,

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
                    aiMessage

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
        // Save OUTBOUND Message
        // ==========================================

        const aiMessage =
            await whatsappMessageRepository.create({

                conversationId:
                    conversation.id,

                whatsappMessageId:
                    null,

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

            usage:
                aiResponse.usage

        };

    }

}


export default new WhatsAppAIService();