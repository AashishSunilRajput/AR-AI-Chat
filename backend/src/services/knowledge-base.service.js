import chatbotRepository from "../repositories/chatbot.repository.js";
import knowledgeBaseRepository from "../repositories/knowledge-base.repository.js";

class KnowledgeBaseService {

    // ==========================================
    // Create
    // ==========================================

    async create(user, data) {

        const chatbot =
            await chatbotRepository.findByIdAndOrganization(
                Number(data.chatbotId),
                user.organizationId
            );

        if (!chatbot) {
            throw new Error("Chatbot not found");
        }

        return await knowledgeBaseRepository.create({

            organizationId: user.organizationId,

            chatbotId: data.chatbotId,

            name: data.name,

            description: data.description

        });

    }

    // ==========================================
    // List
    // ==========================================

    async getAll(user) {

        return await knowledgeBaseRepository.findAll(
            user.organizationId
        );

    }

    // ==========================================
    // Details
    // ==========================================

    async getById(id, user) {

        const knowledgeBase =
            await knowledgeBaseRepository.findById(
                Number(id),
                user.organizationId
            );

        if (!knowledgeBase) {
            throw new Error("Knowledge Base not found");
        }

        return knowledgeBase;

    }

    // ==========================================
    // Update
    // ==========================================

    async update(id, user, data) {

        const knowledgeBase =
            await knowledgeBaseRepository.findById(
                Number(id),
                user.organizationId
            );

        if (!knowledgeBase) {
            throw new Error("Knowledge Base not found");
        }

        return await knowledgeBaseRepository.update(

            Number(id),

            user.organizationId,

            data

        );

    }

    // ==========================================
    // Delete
    // ==========================================

    async delete(id, user) {

        const knowledgeBase =
            await knowledgeBaseRepository.findById(
                Number(id),
                user.organizationId
            );

        if (!knowledgeBase) {
            throw new Error("Knowledge Base not found");
        }

        await knowledgeBaseRepository.delete(
            Number(id)
        );

        return true;

    }

}

export default new KnowledgeBaseService();