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

    // ==========================================
// Update Avatar
// ==========================================

async updateAvatar(
    chatbotId,
    avatar
) {

    return await prisma.chatbotSetting.update({

        where: {
            chatbotId
        },

        data: {
            avatar
        }

    });

}

}

export default new ChatbotSettingRepository();