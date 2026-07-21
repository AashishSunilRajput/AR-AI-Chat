import mockAIService from "./mock-ai.service.js";

class AIService {

    async generateReply(message) {

        return await mockAIService.generateReply(

            message

        );

    }

}

export default new AIService();