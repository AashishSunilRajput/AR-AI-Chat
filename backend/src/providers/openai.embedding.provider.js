import { getOpenAIClient } from "../config/openai.js";

class OpenAIEmbeddingProvider {

    isConfigured() {

        return !!getOpenAIClient();

    }

    async generateEmbedding(text) {

        const client = getOpenAIClient();

        if (!client) {

            return {

                success: false,

                message: "OpenAI API Key not configured",

                embedding: []

            };

        }

        return {

            success: true,

            message: "Embedding Provider Ready",

            embedding: []

        };

    }

}

export default new OpenAIEmbeddingProvider();