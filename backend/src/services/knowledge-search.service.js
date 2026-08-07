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


        // Generate Question Embedding

        const queryEmbedding =

            await openAIEmbeddingProvider.generateEmbedding(

                question

            );




        // Get Chatbot Knowledge Embeddings

        const embeddings =

            await embeddingRepository.findByChatbot(

                chatbotId

            );




        if (!embeddings.length) {

            return [];

        }




        const results = [];




        // Calculate Similarity

     for (const item of embeddings) {


    const similarity =

        this.cosineSimilarity(

            queryEmbedding.embedding,

            item.vector

        );


    console.log(
        "----------------------------"
    );

    console.log(
        "SIMILARITY:",
        similarity
    );

    console.log(
        "DOCUMENT:",
        item.chunk.document.title
    );

    console.log(
        "CONTENT:",
        item.chunk.content.substring(0,200)
    );


    results.push({

        similarity,

        content:
            item.chunk.content,

        document:
            item.chunk.document.title

    });


}




        // Sort Highest Similarity First

        results.sort(

            (a,b) =>
                b.similarity - a.similarity

        );





        // ==========================================
        // Filter Relevant Results
        // ==========================================

        const relevantResults = [];

        const documentLimit = {};



        for (const item of results) {


            if (item.similarity < 0.30) {

                continue;

            }



            if (!documentLimit[item.document]) {

                documentLimit[item.document] = 0;

            }



            // Maximum 2 chunks from same document

            if (documentLimit[item.document] >= 2) {

                continue;

            }



            documentLimit[item.document]++;



            relevantResults.push(item);



            if (relevantResults.length >= 5) {

                break;

            }


        }





        return relevantResults;


    }


}


export default new KnowledgeSearchService();