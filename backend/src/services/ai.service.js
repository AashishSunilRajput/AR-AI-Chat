import openAIService from "./openai.service.js";


class AIService {


    async generateReply(message) {


        return await openAIService.generateReply({

            message

        });


    }


}


export default new AIService();