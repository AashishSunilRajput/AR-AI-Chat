import settingRepository from "../repositories/setting.repository.js";

class SettingService {

    // ==========================================
    // Get Settings
    // ==========================================

    async getSettings(user) {

        return await settingRepository.getSettings(
            user.organizationId
        );

    }

    // ==========================================
    // Update Organization Settings
    // ==========================================

    async updateOrganizationSettings(
        user,
        data
    ) {

        return await settingRepository.updateOrganizationSettings(

            user.organizationId,

            data

        );

    }

    // ==========================================
    // Update Chatbot Settings
    // ==========================================

    async updateChatbotSettings(
        chatbotId,
        data
    ) {

        return await settingRepository.updateChatbotSettings(

            chatbotId,

            data

        );

    }

}

export default new SettingService();