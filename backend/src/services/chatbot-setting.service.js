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

        return await chatbotSettingRepository.update(

            Number(chatbotId),

            data

        );

    }

}

export default new ChatbotSettingService();