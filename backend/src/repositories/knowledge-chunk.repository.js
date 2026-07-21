import prisma from "../config/prisma.js";


class KnowledgeChunkRepository {



    // ======================================
    // Create Many Chunks
    // ======================================


    async createMany(chunks) {


        return await prisma.knowledgeChunk.createMany({

            data: chunks

        });


    }



    // ======================================
    // Get Document Chunks
    // ======================================


    async findByDocument(
        documentId
    ) {


        return await prisma.knowledgeChunk.findMany({

            where: {

                documentId

            },

            orderBy: {

                chunkIndex: "asc"

            }

        });


    }



    // ======================================
    // Delete Document Chunks
    // ======================================


    async deleteByDocument(
        documentId
    ) {


        return await prisma.knowledgeChunk.deleteMany({

            where: {

                documentId

            }

        });


    }



}


export default new KnowledgeChunkRepository();