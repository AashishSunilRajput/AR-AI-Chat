import embeddingRepository from "../repositories/embedding.repository.js";
import openAIEmbeddingProvider from "../providers/openai.embedding.provider.js";

class KnowledgeSearchService {

    // ==========================================
    // Cosine Similarity
    // ==========================================

    cosineSimilarity(a, b) {

        let dot = 0;
        let normA = 0;
        let normB = 0;

        for (let i = 0; i < a.length; i++) {

            dot += a[i] * b[i];

            normA += a[i] * a[i];

            normB += b[i] * b[i];

        }

        if (normA === 0 || normB === 0) {

            return 0;

        }

        return (
            dot /
            (Math.sqrt(normA) * Math.sqrt(normB))
        );

    }


    // ==========================================
    // Search Knowledge
    // ==========================================

    async search(chatbotId, question) {

        // ------------------------------------------
        // Generate query embedding
        // ------------------------------------------

        const queryEmbedding =
            await openAIEmbeddingProvider.generateEmbedding(
                question
            );


        // ------------------------------------------
        // Get all chatbot embeddings
        // ------------------------------------------

        const embeddings =
            await embeddingRepository.findByChatbot(
                chatbotId
            );


        if (!embeddings.length) {

            return [];

        }


        // ------------------------------------------
        // Calculate similarity
        // ------------------------------------------

        const results = [];


        for (const item of embeddings) {

            const similarity =
                this.cosineSimilarity(
                    queryEmbedding.embedding,
                    item.vector
                );


            results.push({

                similarity,

                content:
                    item.chunk.content,

                document:
                    item.chunk.document.title

            });

        }


        // ------------------------------------------
        // Sort by similarity
        // ------------------------------------------

        results.sort(
            (a, b) =>
                b.similarity - a.similarity
        );


        // ------------------------------------------
        // Debug top results
        // ------------------------------------------

        console.log(
            "======================================"
        );

        console.log(
            "KNOWLEDGE SEARCH QUESTION:",
            question
        );

        console.log(
            "TOP SIMILARITY RESULTS:"
        );


        results
            .slice(0, 10)
            .forEach((item, index) => {

                console.log(
                    `#${index + 1}`,
                    "Similarity:",
                    item.similarity
                );

                console.log(
                    "Content:",
                    item.content.substring(0, 300)
                );

                console.log(
                    "--------------------------------------"
                );

            });


        // ------------------------------------------
        // Relevance threshold
        // ------------------------------------------

        const MIN_SIMILARITY = 0.15;


        const relevantResults =
            results
                .filter(
                    item =>
                        item.similarity >=
                        MIN_SIMILARITY
                )
                .slice(0, 5);


        console.log(
            "FINAL KNOWLEDGE RESULTS:",
            relevantResults.map(item => ({
                similarity: item.similarity,
                document: item.document,
                content: item.content.substring(0, 300)
            }))
        );


        console.log(
            "======================================"
        );


        return relevantResults;

    }

}

export default new KnowledgeSearchService();