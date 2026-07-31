import embeddingService from "../services/embedding.service.js";


// ==========================================
// Generate Embeddings
// ==========================================

export const generate = async (req, res, next) => {

    try {

        const result =
            await embeddingService.generate(
                req.params.documentId
            );


        res.json({

            success: true,

            message:
                "Embeddings generated successfully",

            data: result

        });


    }
    catch (error) {

        next(error);

    }

};



// ==========================================
// Get Embeddings By Document
// ==========================================

export const getEmbeddings = async (
    req,
    res,
    next
) => {

    try {

        const result =
            await embeddingService.getByDocument(
                req.params.documentId
            );


        res.json({

            success: true,

            data: result

        });


    }
    catch (error) {

        next(error);

    }

};