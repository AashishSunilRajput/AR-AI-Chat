import prisma from "../config/prisma.js";

class ChatbotSettingRepository {

    // ==========================================
    // Find Settings
    // ==========================================

    async findByChatbot(chatbotId, organizationId) {

        return await prisma.chatbotSetting.findFirst({

            where: {

                chatbotId,

                chatbot: {

                    organizationId

                }

            }

        });

    }

    // ==========================================
    // Create
    // ==========================================

    async create(data) {

        return await prisma.chatbotSetting.create({

            data

        });

    }

    // ==========================================
    // Update
    // ==========================================

    async update(chatbotId, data) {

        return await prisma.chatbotSetting.update({

            where: {
                chatbotId
            },

            data

        });

    }

}

export default new ChatbotSettingRepository();