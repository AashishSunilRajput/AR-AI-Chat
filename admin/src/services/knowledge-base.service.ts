import api from "./api";

export interface KnowledgeBase {
    id: number;
    organizationId: number;
    chatbotId: number;

    name: string;
    description?: string;

    isActive: boolean;

    chatbot?: {
        id: number;
        name: string;
    };

   _count?: {
        documents: number;
    };

    createdAt: string;
    updatedAt: string;
}

class KnowledgeBaseService {

    async getKnowledgeBases() {

        const response = await api.get(
            "/knowledge-bases"
        );

        return response.data;

    }

    async getKnowledgeBase(
        id: number
    ) {

        const response = await api.get(
            `/knowledge-bases/${id}`
        );

        return response.data;

    }

    async create(
        data: any
    ) {

        const response = await api.post(
            "/knowledge-bases",
            data
        );

        return response.data;

    }

    async update(
        id: number,
        data: any
    ) {

        const response = await api.put(
            `/knowledge-bases/${id}`,
            data
        );

        return response.data;

    }

    async delete(
        id: number
    ) {

        const response = await api.delete(
            `/knowledge-bases/${id}`
        );

        return response.data;

    }

}

export default new KnowledgeBaseService();