import { getOpenAIClient } from "../config/openai.js";

class OpenAIProvider {

    isConfigured() {

        return !!getOpenAIClient();

    }

    async chat() {

        const client = getOpenAIClient();

        if (!client) {

            return {

                success: false,

                message: "OpenAI API Key not configured"

            };

        }

        return {

            success: true,

            message: "OpenAI Chat Provider Ready"

        };

    }

}

export default new OpenAIProvider();