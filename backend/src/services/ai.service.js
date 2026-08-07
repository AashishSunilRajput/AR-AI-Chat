import openAIService from "./openai.service.js";

class AIService {

    async generateReply({

        message,

        context,

        history = []

    }) {

        return await openAIService.generateReply({

            message,

            context,

            history

        });

    }

}

export default new AIService();