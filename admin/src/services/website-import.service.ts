import api from "./api";


class WebsiteImportService {


    async importWebsite(
        data: {
            knowledgeBaseId: number;
            url: string;
            type: "SINGLE" | "FULL";
        }
    ) {


        const response = await api.post(

            "/knowledge-documents/import-website",

            data

        );


        return response.data;


    }


}


export default new WebsiteImportService();