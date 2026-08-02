import api from "./http";


export interface Organization {

    id:number;

    name:string;

    email:string;

    phone?:string;

    website?:string;

    logo?:string;

    plan:string;

    status:string;

    users:number;

    chatbots:number;

    createdAt:string;

}



class OrganizationService {



    // =====================================
    // Get Organizations
    // =====================================

    async getOrganizations(){

        const response = await api.get(
            "/organization/"
        );

        return response.data;

    }





    // =====================================
    // Create Organization
    // =====================================

    async create(data:any){

        const response = await api.post(

            "/organization",

            data

        );

        return response.data;

    }





    // =====================================
    // Upload Organization Logo
    // SUPER ADMIN
    // =====================================

   async uploadLogo(
    organizationId: number,
    file: File
) {

    const formData = new FormData();

    formData.append(
        "logo",
        file
    );

    const response = await api.post(

        `/organization/${organizationId}/logo`,

        formData,

        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }

    );

    return response.data;

}

    // =====================================
// Get Organization By Id
// =====================================

async getById(id: number) {

    const response = await api.get(
        `/organization/${id}`
    );

    return response.data;

}

// =====================================
// Update Organization
// =====================================

async update(
    id: number,
    data: any
) {

    const response =
        await api.put(

            `/organization/${id}`,

            data

        );

    return response.data;

}


}



export default new OrganizationService();