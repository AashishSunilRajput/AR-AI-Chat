import api from "./http";


export interface ExportLeadFilters {

    search?: string;

    status?: string;

    source?: string;

    from?: string;

    to?: string;

}



class ExportService {


    // ==================================
    // Export Leads
    // ==================================

    async exportLeads(

        format: "csv" | "xlsx" | "pdf",

        filters?: ExportLeadFilters

    ) {


        try {


            const response = await api.get(


                "/export/leads",


                {


                    params: {


                        format,


                        ...filters


                    },


                    responseType:"blob"


                }


            );



            const blob = new Blob(

                [

                    response.data

                ]

            );



            const url =

                window.URL.createObjectURL(

                    blob

                );



            const link =

                document.createElement(

                    "a"

                );



            link.href = url;



            link.download =

                `leads-${Date.now()}.${format}`;



            document.body.appendChild(

                link

            );



            link.click();



            link.remove();



            window.URL.revokeObjectURL(

                url

            );


        }

        catch(error){


            console.error(

                "Export Error:",

                error

            );


            throw error;


        }


    }

    // ==================================
// Export Visitors
// ==================================

async exportVisitors(

    format: "csv" | "xlsx" | "pdf",

    filters?: {

        search?: string;

    }

) {

    const response = await api.get(

        "/export/visitors",

        {

            params: {

                format,

                ...filters

            },

            responseType: "blob"

        }

    );

    const blob =
        new Blob([response.data]);

    const url =
        window.URL.createObjectURL(blob);

    const link =
        document.createElement("a");

    link.href = url;

    link.download =
        `visitors.${format}`;

    document.body.appendChild(link);

    link.click();

    link.remove();

    window.URL.revokeObjectURL(url);

}


}


export default new ExportService();