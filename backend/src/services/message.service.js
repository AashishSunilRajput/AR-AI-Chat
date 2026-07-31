import messageRepository from "../repositories/message.repository.js";
import conversationRepository from "../repositories/conversation.repository.js";
import leadDetection from "./lead-detection.service.js";

class MessageService {

    // ==========================================
    // Send Message
    // ==========================================

    async send(chatbot, conversationId, message) {

        const conversation =
            await conversationRepository.findById(
                Number(conversationId)
            );

        if (!conversation) {

            throw new Error("Conversation not found");

        }

        // ==========================================
        // Save USER Message
        // ==========================================

        const userMessage =
            await messageRepository.create({

                conversationId: Number(conversationId),

                role: "USER",

                message

            });

        // ==========================================
        // Conversation History
        // ==========================================

        const history =
            await messageRepository.findByConversation(
                conversationId
            );

        // ==========================================
        // Lead Detection
        // ==========================================

        const lead =
            leadDetection.detect(message);

        // ==========================================
        // Temporary AI Reply
        // ==========================================

        const aiResponse = {

            reply:
                "Thank you for your message. AI integration is coming soon.",

            model:
                chatbot.settings?.model || "temporary"

        };

        // ==========================================
        // Save AI Message
        // ==========================================

        const assistantMessage =
            await messageRepository.create({

                conversationId: Number(conversationId),

                role: "ASSISTANT",

                message: aiResponse.reply,

                model: aiResponse.model,

                inputTokens: 0,

                outputTokens: 0

            });

        return {

            userMessage,

            assistantMessage,

            history,

            leadDetected: lead.detected,

            keyword: lead.keyword

        };

    }

    // ==========================================
    // Get Messages
    // ==========================================

    async getMessages(conversationId) {

        return await messageRepository.findByConversation(

            Number(conversationId)

        );

    }

    // ==========================================
    // Delete
    // ==========================================

    async delete(id) {

        return await messageRepository.delete(

            Number(id)

        );

    }

}

export default new MessageService();