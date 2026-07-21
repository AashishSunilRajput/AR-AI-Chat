import messageRepository from "../repositories/message.repository.js";
import conversationRepository from "../repositories/conversation.repository.js";
import aiService from "./ai.service.js";

class MessageService {

    // ==========================================
    // Send Message
    // ==========================================

    async send(conversationId, message) {

        const conversation =
            await conversationRepository.findById(
                Number(conversationId)
            );

        if (!conversation) {

            throw new Error(
                "Conversation not found"
            );

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
        // Generate AI Reply
        // ==========================================

        const aiResponse =
            await aiService.generateReply(

                message

            );

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

            assistantMessage

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