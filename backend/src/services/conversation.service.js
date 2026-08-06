import conversationRepository from "../repositories/conversation.repository.js";

import notificationService from "./notification.service.js";

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

    const fullConversation =
        await conversationRepository.findById(
            conversation.id
        );

    // ==========================================
    // Create Notification
    // ==========================================

    try {

        await notificationService.create({

            title: "New Conversation",

            message: "A visitor started a new conversation.",

            type: "NEW_CONVERSATION",

            organizationId:
                fullConversation.chatbot.organizationId,

            entityType: "CONVERSATION",

            entityId: conversation.id

        });

        console.log(
            "Conversation Notification Created"
        );

    }

    catch (error) {

        console.error(
            "Conversation Notification Error:",
            error
        );

    }

    return conversation;

}

// ==========================================
// Get By Id
// ==========================================

async get(
    id,
    user
) {

    let conversation;

    if (user.role === "SUPER_ADMIN") {

        conversation =
            await conversationRepository.findById(
                id
            );

    }
    else {

        conversation =
            await conversationRepository.findByIdWithOrganization(

                id,

                user.organizationId

            );

    }

    if (!conversation) {

        throw new Error(
            "Conversation not found"
        );

    }

    return conversation;

}

    // ==========================================
    // Close Conversation
    // ==========================================

   async close(
    id,
    user
) {

    let conversation;

    if (user.role === "SUPER_ADMIN") {

        conversation =
            await conversationRepository.findById(id);

    }
    else {

        conversation =
            await conversationRepository.findByIdWithOrganization(

                id,

                user.organizationId

            );

    }

    if (!conversation) {

        throw new Error(
            "Conversation not found"
        );

    }

    return await conversationRepository.close(id);

}




// ==========================================
// Get All Conversations
// ==========================================

async getAll(

    user,

    filters = {}

) {

    if (

        user.role === "SUPER_ADMIN"

    ) {

        return await conversationRepository.findAll(

            filters

        );

    }

    return await conversationRepository.findAllByOrganization(

        user.organizationId,

        filters

    );

}

// ==========================================
// Conversation Stats
// ==========================================

async getStats(user) {

    if (user.role === "SUPER_ADMIN") {

        return await conversationRepository.getStats();

    }

    return await conversationRepository.getStats(

        user.organizationId

    );

}
}
export default new ConversationService();