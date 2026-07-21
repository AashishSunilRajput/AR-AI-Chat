import conversationRepository from "../repositories/conversation.repository.js";

class ConversationService {

    // ==========================================
    // Create / Get Active Conversation
    // ==========================================

    async create(visitor) {

        let conversation =
            await conversationRepository.findActive(

                visitor.id,

                visitor.chatbotId

            );

        if (conversation) {

            return conversation;

        }

        conversation =
            await conversationRepository.create({

                visitorId: visitor.id,

                chatbotId: visitor.chatbotId,

                status: "ACTIVE"

            });

        return conversation;

    }

    // ==========================================
    // Get By Id
    // ==========================================

    async get(id) {

        const conversation =
            await conversationRepository.findById(id);

        if (!conversation) {

            throw new Error("Conversation not found");

        }

        return conversation;

    }

    // ==========================================
    // Close Conversation
    // ==========================================

    async close(id) {

        return await conversationRepository.close(id);

    }

}

export default new ConversationService();