import api from "./api";

export interface Lead {
    id: number;

    organizationId: number;

    visitorId?: number | null;

    conversationId?: number | null;

    name?: string | null;

    email?: string | null;

    phone?: string | null;

    company?: string | null;

    source: string;

    status:
        | "NEW"
        | "CONTACTED"
        | "QUALIFIED"
        | "CONVERTED"
        | "LOST";

    notes?: string | null;

    createdAt: string;

    updatedAt: string;

    visitor?: {
        id: number;
        name?: string | null;
        email?: string | null;
    };

    conversation?: {
        id: number;
    };
}

export interface LeadStats {

    total: number;

    new: number;

    contacted: number;

    qualified: number;

    converted: number;

    lost: number;
}

export interface LeadFilters {

    search?: string;

    status?: string;

    source?: string;

    from?: string;

    to?: string;

    page?: number;

    limit?: number;

}

export interface Pagination {

    total: number;

    page: number;

    limit: number;

    totalPages: number;

}

export interface LeadListResponse {

    data: Lead[];

    pagination: Pagination;

}

class LeadService {

    // ===============================
    // Get All Leads
    // ===============================

// ===============================
// Get All Leads
// ===============================

async getLeads(
    filters?: LeadFilters
): Promise<LeadListResponse> {

    const response = await api.get(

        "/leads",

        {

            params: filters

        }

    );


    return response.data;

}

    // ===============================
    // Get Lead Stats
    // ===============================

    async getStats() {

        const response =
            await api.get("/leads/stats");

        return response.data;

    }

    // ===============================
    // Get Single Lead
    // ===============================

    async getLead(id: number) {

        const response =
            await api.get(`/leads/${id}`);

        return response.data;

    }

    // ===============================
    // Update Lead
    // ===============================

    async updateLead(
        id: number,
        data: any
    ) {

        const response =
            await api.put(

                `/leads/${id}`,

                data

            );

        return response.data;

    }

    // ===============================
    // Delete Lead
    // ===============================

    async deleteLead(id: number) {

        const response =
            await api.delete(

                `/leads/${id}`

            );

        return response.data;

    }

}

export default new LeadService();