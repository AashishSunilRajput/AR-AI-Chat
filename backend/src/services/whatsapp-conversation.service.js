import whatsappConversationRepository from "../repositories/whatsapp-conversation.repository.js";

class WhatsAppConversationService {

    // ==========================================
    // Find Or Create Conversation
    // ==========================================

    async findOrCreate({

        contactId,

        phoneNumberId

    }) {

        if (!contactId) {

            throw new Error(
                "Contact ID is required"
            );

        }

        if (!phoneNumberId) {

            throw new Error(
                "Phone Number ID is required"
            );

        }


        const existingConversation =

            await whatsappConversationRepository.findActive(

                Number(contactId),

                Number(phoneNumberId)

            );


        if (existingConversation) {

            return existingConversation;

        }


        return await whatsappConversationRepository.create({

            contactId:
                Number(contactId),

            phoneNumberId:
                Number(phoneNumberId),

            status:
                "ACTIVE",

            agentMode:
                "AI",

            lastMessageAt:
                new Date()

        });

    }


    // ==========================================
    // Get Conversation
    // ==========================================

    async getById(id) {

        return await whatsappConversationRepository.findById(

            Number(id)

        );

    }


    // ==========================================
    // Get Contact Conversations
    // ==========================================

    async getByContact(contactId) {

        return await whatsappConversationRepository.findByContact(

            Number(contactId)

        );

    }


    // ==========================================
    // Get Phone Number Conversations
    // ==========================================

    async getByPhoneNumber(phoneNumberId) {

        return await whatsappConversationRepository.findByPhoneNumber(

            Number(phoneNumberId)

        );

    }


    // ==========================================
    // Update Conversation
    // ==========================================

    async update(id, data) {

        return await whatsappConversationRepository.update(

            Number(id),

            data

        );

    }


    // ==========================================
    // Close Conversation
    // ==========================================

    async close(id) {

        return await whatsappConversationRepository.close(

            Number(id)

        );

    }


    // ==========================================
    // Switch Agent Mode
    // ==========================================

    async setAgentMode(id, agentMode) {

        const allowedModes = [

            "AI",

            "HUMAN"

        ];

        if (!allowedModes.includes(agentMode)) {

            throw new Error(
                "Invalid agent mode"
            );

        }

        return await whatsappConversationRepository.setAgentMode(

            Number(id),

            agentMode

        );

    }

}


export default new WhatsAppConversationService();