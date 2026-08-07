import { getOpenAIClient } from "../config/openai.js";

class OpenAIEmbeddingProvider {

    isConfigured() {

        return !!getOpenAIClient();

    }

    async generateEmbedding(text) {

        const client = getOpenAIClient();

        if (!client) {

            throw new Error(
                "OpenAI API Key not configured"
            );

        }

        const response =
            await client.embeddings.create({

                model: "text-embedding-3-small",

                input: text

            });

        return {

            success: true,

            embedding:
                response.data[0].embedding,

            usage:
                response.usage

        };

    }

}

export default new OpenAIEmbeddingProvider();