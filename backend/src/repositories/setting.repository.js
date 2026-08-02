import prisma from "../config/prisma.js";

class SettingRepository {

    // ==========================================
    // Get Organization Settings
    // ==========================================

    async getSettings(organizationId) {

        return await prisma.organization.findUnique({

            where: {
                id: organizationId
            },

            include: {

                settings: true,

                chatbots: {

                    include: {
                        settings: true
                    }

                }

            }

        });

    }

    // ==========================================
    // Update Organization Settings
    // ==========================================

    async updateOrganizationSettings(
        organizationId,
        data
    ) {

        return await prisma.organizationSetting.upsert({

            where: {
                organizationId
            },

            update: data,

            create: {

                organizationId,

                ...data

            }

        });

    }

    // ==========================================
    // Update Chatbot Settings
    // ==========================================

    async updateChatbotSettings(
        chatbotId,
        data
    ) {

        return await prisma.chatbotSetting.update({

            where: {
                chatbotId
            },

            data

        });

    }

}

export default new SettingRepository();