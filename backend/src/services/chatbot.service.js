import chatbotRepository from "../repositories/chatbot.repository.js";
import chatbotSettingService from "./chatbot-setting.service.js";
import { nanoid } from "nanoid";

class ChatbotService {

    // Create Chatbot
   async create(user, data) {

    const chatbot =
        await chatbotRepository.create({

            ...data,

 widgetKey: "ar_live_" + nanoid(16),
            organizationId:
                user.organizationId

        });

    await chatbotSettingService.createDefault(
        chatbot.id
    );

    return chatbot;

}

    // Get All Chatbots
    async findAll(user) {

        return await chatbotRepository.findAll(
            user.organizationId
        );

    }

    // Get Single Chatbot
    async findById(id) {

        const chatbot = await chatbotRepository.findById(
            Number(id)
        );

        if (!chatbot) {
            throw new Error("Chatbot not found");
        }

        return chatbot;

    }

    // Update Chatbot
    async update(id, data) {

        await this.findById(id);

        return await chatbotRepository.update(
            Number(id),
            data
        );

    }

    // Delete Chatbot
    async delete(id) {

        await this.findById(id);

        return await chatbotRepository.delete(
            Number(id)
        );

    }

}

export default new ChatbotService();