import knowledgeChunkRepository from "../repositories/knowledge-chunk.repository.js";
import embeddingRepository from "../repositories/embedding.repository.js";
import openAIEmbeddingProvider from "../providers/openai.embedding.provider.js";

class EmbeddingService {

    async generate(documentId) {

        const chunks =
            await knowledgeChunkRepository.findByDocument(
                Number(documentId)
            );

        if (!chunks.length) {

            throw new Error("No chunks found");

        }

        const results = [];

        for (const chunk of chunks) {

            const existing =
                await embeddingRepository.findByChunk(
                    chunk.id
                );

            if (existing) {

                results.push(existing);

                continue;

            }

            const embedding =
                await openAIEmbeddingProvider.generateEmbedding(
                    chunk.content
                );

            const saved =
                await embeddingRepository.create({

                    chunkId: chunk.id,

                    provider: "OPENAI",

                    model: "text-embedding-3-small",

                    vector: embedding.embedding,

                    tokenCount: chunk.tokenCount

                });

            results.push(saved);

        }

        return {

            totalEmbeddings: results.length,

            items: results

        };

    }

    async getByDocument(documentId){

    return await embeddingRepository.findByDocument(
        Number(documentId)
    );

}

}

export default new EmbeddingService();