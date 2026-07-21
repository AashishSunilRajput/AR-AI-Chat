import embeddingService from "../services/embedding.service.js";

export const generate = async (req, res, next) => {

    try {

        const result =
            await embeddingService.generate(
                req.params.documentId
            );

        res.json({

            success: true,

            message: "Embeddings generated successfully",

            data: result

        });

    } catch (error) {

        next(error);

    }

};