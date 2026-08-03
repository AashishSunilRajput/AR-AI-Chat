import chatbotRepository from "../repositories/chatbot.repository.js";
import chatbotSettingRepository from "../repositories/chatbot-setting.repository.js";

class ChatbotSettingService {

    // ==========================================
    // Create Default Settings
    // ==========================================

    async createDefault(chatbotId) {

        return await chatbotSettingRepository.create({

            chatbotId

        });

    }

    // ==========================================
    // Get Settings
    // ==========================================

    async getSettings(chatbotId, user) {

        let chatbot;

        // ======================================
        // SUPER ADMIN
        // ======================================

        if (user.role === "SUPER_ADMIN") {

            chatbot =
                await chatbotRepository.findById(
                    Number(chatbotId)
                );

        }

        // ======================================
        // CLIENT ADMIN
        // ======================================

        else {

            chatbot =
                await chatbotRepository.findByIdAndOrganization(

                    Number(chatbotId),

                    user.organizationId

                );

        }

        if (!chatbot) {

            throw new Error(
                "Chatbot not found"
            );

        }

        let settings =
            await chatbotSettingRepository.findByChatbot(

                Number(chatbotId)

            );

        if (!settings) {

            settings =
                await this.createDefault(

                    Number(chatbotId)

                );

        }

        return settings;

    }

    // ==========================================
// Update Settings
// ==========================================

async updateSettings(
    chatbotId,
    user,
    data
) {

    let chatbot;


    // ======================================
    // SUPER ADMIN
    // ======================================

    if (user.role === "SUPER_ADMIN") {

        chatbot =
            await chatbotRepository.findById(
                Number(chatbotId)
            );

    }


    // ======================================
    // CLIENT ADMIN
    // ======================================

    else {

        chatbot =
            await chatbotRepository.findByIdAndOrganization(

                Number(chatbotId),

                user.organizationId

            );

    }


    if (!chatbot) {

        throw new Error(
            "Chatbot not found"
        );

    }



    let settings =
        await chatbotSettingRepository.findByChatbot(

            Number(chatbotId)

        );


    if (!settings) {

        settings =
            await this.createDefault(

                Number(chatbotId)

            );

    }



    // ======================================
    // CLIENT ADMIN RESTRICTION
    // ======================================

    if (user.role === "CLIENT_ADMIN") {


        // AI Configuration Lock

        delete data.aiProvider;

        delete data.model;

        delete data.temperature;

        delete data.maxTokens;


        // AI Behaviour Lock

        delete data.systemPrompt;


        // Security Lock

        delete data.allowedDomains;

        delete data.isPublic;


    }



    return await chatbotSettingRepository.update(

        Number(chatbotId),

        data

    );

}

    // ==========================================
// Update Avatar
// ==========================================

async updateAvatar(
    chatbotId,
    user,
    avatar
) {

    let chatbot;

    if (user.role === "SUPER_ADMIN") {

        chatbot =
            await chatbotRepository.findById(
                Number(chatbotId)
            );

    }
    else {

        chatbot =
            await chatbotRepository.findByIdAndOrganization(

                Number(chatbotId),

                user.organizationId

            );

    }

    if (!chatbot) {

        throw new Error(
            "Chatbot not found"
        );

    }

    let settings =
        await chatbotSettingRepository.findByChatbot(

            Number(chatbotId)

        );

    if (!settings) {

        settings =
            await this.createDefault(

                Number(chatbotId)

            );

    }

    return await chatbotSettingRepository.updateAvatar(

        Number(chatbotId),

        avatar

    );

}

}

export default new ChatbotSettingService();