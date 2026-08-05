import api from "./api";

export interface Visitor {

    id: number;

    organizationId: number;

    chatbotId: number;

    sessionToken: string;

    name?: string | null;

    email?: string | null;

    ipAddress?: string | null;

    userAgent?: string | null;

    lastSeenAt: string;

    createdAt: string;

    updatedAt: string;

    chatbot?: {

        id: number;

        name: string;

    };

    _count?: {

        conversations: number;

        leads: number;

    };

    conversations?: Array<{

        id: number;

        status: string;

        createdAt: string;

        _count?: {

            messages: number;

        };

    }>;

    leads?: Array<{

        id: number;

        name?: string | null;

        email?: string | null;

        phone?: string | null;

        company?: string | null;

        status: string;

        createdAt: string;

    }>;

}
export interface VisitorPagination {

    total:number;

    page:number;

    limit:number;

    totalPages:number;

}


export interface VisitorListResponse {

    data:Visitor[];

    pagination:VisitorPagination;

}
export interface VisitorStats {

    total: number;

    active: number;

    today: number;

}
export interface VisitorFilters {

    search?: string;

}

class VisitorService {

    // ===============================
    // Get Visitors
    // ===============================

   async getVisitors(
    params?:{

        search?:string;

        page?:number;

        limit?:number;

    }
) {


const response =
await api.get(

    "/visitors",

    {
        params
    }

);


return response.data;


}

    // ===============================
    // Get Visitor
    // ===============================

    async getVisitor(id: number) {

        const response =
            await api.get(`/visitors/${id}`);

        return response.data;

    }

    // ===============================
    // Visitor Stats
    // ===============================

    async getStats() {

        const response =
            await api.get("/visitors/stats");

        return response.data;

    }

}

export default new VisitorService();