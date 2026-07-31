import chunkService from "../services/knowledge-chunk.service.js";



class KnowledgeChunkController {


    // ======================================
    // Create Chunks
    // ======================================

    async create(req, res, next) {

        try {


            const result =
                await chunkService.createChunks(

                    req.params.documentId

                );


            return res.status(200).json({

                success: true,

                message: "Document chunked successfully",

                data: result

            });


        } catch(error) {

            next(error);

        }

    }



    // ======================================
    // Get Document Chunks
    // ======================================

    async getAll(req,res,next){

        try {


            const chunks =
                await chunkService.getChunks(

                    req.params.documentId

                );


            return res.status(200).json({

                success:true,

                data:chunks

            });


        }catch(error){

            next(error);

        }

    }


}


export default new KnowledgeChunkController();