import knowledgeDocumentRepository from "../repositories/knowledge-document.repository.js";
import knowledgeChunkRepository from "../repositories/knowledge-chunk.repository.js";

import textChunker from "../utils/text.chunker.js";

class KnowledgeChunkService {

    // ======================================
    // Create Chunks
    // ======================================

    async createChunks(documentId) {

        const document =
            await knowledgeDocumentRepository.findById(
                Number(documentId)
            );

        if (!document) {

            throw new Error(
                "Document not found"
            );

        }

        if (!document.extractedText) {

            throw new Error(
                "Document text not available"
            );

        }

        // Generate Chunks
        const chunks =
            textChunker.chunkText(
                document.extractedText
            );

        // Prepare Database Data
        const data =
            chunks.map(chunk => ({

                documentId: Number(documentId),

                chunkIndex: chunk.chunkIndex,

                content: chunk.content,

                tokenCount: chunk.tokenCount

            }));

        // Remove Old Chunks
        await knowledgeChunkRepository.deleteByDocument(
            Number(documentId)
        );

        // Save New Chunks
        await knowledgeChunkRepository.createMany(
            data
        );

        return {

            documentId: Number(documentId),

            totalChunks: data.length,

            status: "COMPLETED"

        };

    }

    // ======================================
    // Get Chunks
    // ======================================

    async getChunks(documentId) {

        return await knowledgeChunkRepository.findByDocument(

            Number(documentId)

        );

    }

}

export default new KnowledgeChunkService();