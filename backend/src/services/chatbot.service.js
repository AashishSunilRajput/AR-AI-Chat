import chatbotRepository from "../repositories/chatbot.repository.js";
import chatbotSettingService from "./chatbot-setting.service.js";
import { nanoid } from "nanoid";

class ChatbotService {

    // ==========================================
    // Create Chatbot
    // ==========================================

    async create(user, data) {

        const {
            organizationId,
            name,
            slug,
            description
        } = data;

        let orgId;

        // SUPER ADMIN
        if (user.role === "SUPER_ADMIN") {

            if (!organizationId) {

                throw new Error(
                    "Organization is required"
                );

            }

            orgId = Number(
                organizationId
            );

        }
        // CLIENT ADMIN
        else {

            orgId =
                user.organizationId;

        }

        const chatbot =
            await chatbotRepository.create({

                organizationId: orgId,

                name,

                slug,

                description,

                widgetKey:
                    "ar_live_" + nanoid(16),

                isActive: true

            });

        await chatbotSettingService.createDefault(
            chatbot.id
        );

        return chatbot;

    }

    // ==========================================
    // Get All Chatbots
    // ==========================================

    async findAll(user) {

        // SUPER ADMIN

        if (user.role === "SUPER_ADMIN") {

            return await chatbotRepository.findAll();

        }

        // CLIENT ADMIN

        return await chatbotRepository.findByOrganization(

            user.organizationId

        );

    }

    // ==========================================
    // Get Chatbot By Id
    // ==========================================

    async findById(
        user,
        id
    ) {

        let chatbot;

        if (user.role === "SUPER_ADMIN") {

            chatbot =
                await chatbotRepository.findById(

                    Number(id)

                );

        }
        else {

            chatbot =
                await chatbotRepository.findByIdAndOrganization(

                    Number(id),

                    user.organizationId

                );

        }

        if (!chatbot) {

            throw new Error(
                "Chatbot not found"
            );

        }

        return chatbot;

    }

    // ==========================================
    // Update Chatbot
    // ==========================================

    async update(
    user,
    id,
    data
) {

    await this.findById(

        user,

        id

    );


    const updateData = {};


    if (data.name !== undefined) {

        updateData.name = data.name;

    }


    if (data.slug !== undefined) {

        updateData.slug = data.slug;

    }


    if (data.description !== undefined) {

        updateData.description = data.description;

    }


    if (data.allowedDomains !== undefined) {

        updateData.allowedDomains =
            data.allowedDomains;

    }



    return await chatbotRepository.update(

        Number(id),

        updateData

    );

}

    // ==========================================
    // Update Status
    // ==========================================

    async updateStatus(
        user,
        id,
        isActive
    ) {

        await this.findById(

            user,

            id

        );

        return await chatbotRepository.updateStatus(

            Number(id),

            isActive

        );

    }

    // ==========================================
    // Delete Chatbot
    // ==========================================

    async delete(
        user,
        id
    ) {

        await this.findById(

            user,

            id

        );

        await chatbotRepository.delete(

            Number(id)

        );

        return {

            message:
                "Chatbot deleted successfully"

        };

    }

}

export default new ChatbotService();