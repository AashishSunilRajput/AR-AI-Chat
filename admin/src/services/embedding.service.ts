import api from "./api";

export interface Embedding {

    id: number;

    chunkId: number;

    provider: string;

    model: string;

    tokenCount: number;

    createdAt: string;


    chunk?: {

        id: number;

        documentId: number;

        chunkIndex: number;

        content: string;

        tokenCount?: number;

    };

}

class EmbeddingService {

    async generateEmbeddings(
        documentId: number
    ) {

        const response = await api.post(

            `/embeddings/${documentId}`

        );

        return response.data;

    }

    async getEmbeddings(
        documentId: number
    ) {

        const response = await api.get(

            `/embeddings/${documentId}`

        );

        return response.data;

    }

}

export default new EmbeddingService();