import websiteImportService from "../services/website-import.service.js";


export const importWebsite = async (
    req,
    res,
    next
) => {


    try {


        const {
            knowledgeBaseId,
            url,
            type
        } = req.body;



        if (!knowledgeBaseId) {

            throw new Error(
                "Knowledge Base ID is required"
            );

        }


        if (!url) {

            throw new Error(
                "Website URL is required"
            );

        }



        const result =
            await websiteImportService.importWebsite(

                req.user,

                knowledgeBaseId,

                url,

                type || "SINGLE"

            );



        res.json({

            success: true,

            message:
                "Website imported successfully",

            data: result

        });



    }
    catch(error) {


        next(error);


    }


};