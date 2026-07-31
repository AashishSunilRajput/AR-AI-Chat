import prisma from "../config/prisma.js";

class ChatbotSettingRepository {

    // ==========================================
    // Find Settings
    // ==========================================

    async findByChatbot(
        chatbotId
    ) {

        return await prisma.chatbotSetting.findUnique({

            where: {

                chatbotId

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

    async update(
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

export default new ChatbotSettingRepository();