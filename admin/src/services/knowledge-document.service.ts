import api from "./api";

export interface KnowledgeDocument {

    id: number;

    knowledgeBaseId: number;

    title: string;

    fileName: string;

    fileType: string;

    fileSize: number;

    processingStatus: string;

    extractedText?: string;

    createdAt: string;

    updatedAt: string;

    chunkCount: number;

    embeddingCount: number;

    _count?: {
        chunks: number;
    };

}

class KnowledgeDocumentService {

    async uploadDocument(
        formData: FormData
    ) {

        const response = await api.post(

            "/knowledge-documents/upload",

            formData,

            {

                headers: {

                    "Content-Type":
                        "multipart/form-data"

                }

            }

        );

        return response.data;

    }

    async getDocuments(
        knowledgeBaseId: number
    ) {

        const response = await api.get(

            `/knowledge-documents?knowledgeBaseId=${knowledgeBaseId}`

        );

        return response.data;

    }

    async deleteDocument(
        id: number
    ) {

        const response = await api.delete(

            `/knowledge-documents/${id}`

        );

        return response.data;

    }

}

export default new KnowledgeDocumentService();