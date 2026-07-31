import chatbotRepository from "../repositories/chatbot.repository.js";
import knowledgeBaseRepository from "../repositories/knowledge-base.repository.js";

class KnowledgeBaseService {

    // ==========================================
    // Create
    // ==========================================

    async create(user, data) {

        let chatbot;

        // SUPER ADMIN
        if (user.role === "SUPER_ADMIN") {

            chatbot =
                await chatbotRepository.findById(
                    Number(data.chatbotId)
                );

        }

        // CLIENT ADMIN
        else {

            chatbot =
                await chatbotRepository.findByIdAndOrganization(

                    Number(data.chatbotId),

                    user.organizationId

                );

        }

        if (!chatbot) {

            throw new Error("Chatbot not found");

        }

        const exists =
            await knowledgeBaseRepository.findByName(

                chatbot.organizationId,

                chatbot.id,

                data.name

            );

        if (exists) {

            throw new Error(
                "Knowledge Base name already exists"
            );

        }

        return await knowledgeBaseRepository.create({

            organizationId: chatbot.organizationId,

            chatbotId: chatbot.id,

            name: data.name,

            description: data.description

        });

    }

    // ==========================================
    // Get All
    // ==========================================

    async getAll(user) {

        if (user.role === "SUPER_ADMIN") {

            return await knowledgeBaseRepository.findAll();

        }

        return await knowledgeBaseRepository.findByOrganization(

            user.organizationId

        );

    }

    // ==========================================
    // Get By Id
    // ==========================================

    async getById(id, user) {

        let knowledgeBase;

        if (user.role === "SUPER_ADMIN") {

            knowledgeBase =
                await knowledgeBaseRepository.findById(
                    Number(id)
                );

        }

        else {

            knowledgeBase =
                await knowledgeBaseRepository.findById(

                    Number(id),

                    user.organizationId

                );

        }

        if (!knowledgeBase) {

            throw new Error(
                "Knowledge Base not found"
            );

        }

        return knowledgeBase;

    }

    // ==========================================
    // Update
    // ==========================================

    async update(id, user, data) {

        const knowledgeBase =
            await this.getById(id, user);

        const duplicate =
            await knowledgeBaseRepository.findByName(

                knowledgeBase.organizationId,

                knowledgeBase.chatbotId,

                data.name

            );

        if (

            duplicate &&

            duplicate.id !== knowledgeBase.id

        ) {

            throw new Error(
                "Knowledge Base name already exists"
            );

        }

        return await knowledgeBaseRepository.update(

            Number(id),

            {

                name: data.name,

                description: data.description,

                isActive: data.isActive

            }

        );

    }

    // ==========================================
    // Delete
    // ==========================================

    async delete(id, user) {

        await this.getById(id, user);

        await knowledgeBaseRepository.delete(

            Number(id)

        );

        return {

            message:
                "Knowledge Base deleted successfully"

        };

    }

}

export default new KnowledgeBaseService();