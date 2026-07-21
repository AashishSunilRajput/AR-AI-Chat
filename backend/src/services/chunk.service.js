import knowledgeDocumentRepository
from "../repositories/knowledge-document.repository.js";


import knowledgeChunkRepository
from "../repositories/knowledge-chunk.repository.js";


import textChunker
from "../utils/text.chunker.js";



class ChunkService {



    async createChunks(
        documentId
    ) {



        const document =
            await knowledgeDocumentRepository.findById(
                Number(documentId)
            );


        if(!document){

            throw new Error(
                "Document not found"
            );

        }



        if(!document.extractedText){

            throw new Error(
                "Document text not available"
            );

        }



        const chunks =
            textChunker.chunkText(
                document.extractedText
            );



        const data =
            chunks.map(
                (chunk,index)=>({

                    documentId:
                        Number(documentId),

                    chunkIndex:
                        index + 1,

                    content:
                        chunk,

                    tokenCount:
                        chunk.length

                })
            );



        await knowledgeChunkRepository
            .deleteByDocument(
                Number(documentId)
            );



        await knowledgeChunkRepository
            .createMany(
                data
            );



        return {

            totalChunks:
                data.length

        };


    }
async getChunks(documentId){


    return await knowledgeChunkRepository.findByDocument(

        Number(documentId)

    );


}


}


export default new ChunkService();