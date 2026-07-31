import api from "./api";


// ==========================================
// Knowledge Chunk Interface
// ==========================================

export interface KnowledgeChunk {
    id: number;
    documentId: number;
    chunkIndex: number;
    content: string;
    tokenCount: number;
    embeddingId?: string | null;
    createdAt: string;

    embeddings?: {
        id: number;
        chunkId: number;
        provider: string;
        model: string;
        tokenCount: number;
        createdAt: string;
    }[];
}



// ==========================================
// Knowledge Chunk Service
// ==========================================

class KnowledgeChunkService {



    // ======================================
    // Generate Chunks
    // ======================================

    async generateChunks(
        documentId: number
    ) {


        const response =
            await api.post(

                `/knowledge-chunks/${documentId}`

            );


        return response.data;

    }





    // ======================================
    // Get Document Chunks
    // ======================================

    async getChunks(
        documentId: number
    ) {


        const response =
            await api.get(

                `/knowledge-chunks/${documentId}`

            );


        return response.data;

    }


}


export default new KnowledgeChunkService();