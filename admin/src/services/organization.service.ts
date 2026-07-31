import api from "./http";


export interface Organization {

    id: number;

    name: string;

    email: string;

    phone?: string;

    website?: string;

    plan: string;

    status: string;

    users: number;

    chatbots: number;

    createdAt: string;

}


class OrganizationService {


    // =====================================
    // Get Organizations
    // =====================================

    async getOrganizations() {

        const response = await api.get(
            "/organization/"
        );

        return response.data;

    }

    async create(data:any){

    const response = await api.post(
        "/organization",
        data
    );

    return response.data;

}



}




export default new OrganizationService();