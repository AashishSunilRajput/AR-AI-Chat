import path from "path";

import knowledgeBaseRepository 
from "../repositories/knowledge-base.repository.js";

import knowledgeDocumentRepository 
from "../repositories/knowledge-document.repository.js";

import extractorFactory
from "../utils/extractors/extractor.factory.js";


class KnowledgeDocumentService {


    // ==========================================
    // Upload
    // ==========================================

    async upload(user, file, knowledgeBaseId) {


        if (!file) {

            throw new Error(
                "Please upload a document"
            );

        }



        const knowledgeBase =
            await knowledgeBaseRepository.findById(

                Number(knowledgeBaseId),

                user.organizationId

            );



        if (!knowledgeBase) {

            throw new Error(
                "Knowledge Base not found"
            );

        }



        // Create Document

        const document =
            await knowledgeDocumentRepository.create({

                knowledgeBaseId:
                    Number(knowledgeBaseId),


                title:
                    path.parse(
                        file.originalname
                    ).name,


                fileName:
                    file.filename,


                fileType:
                    file.mimetype,


                fileSize:
                    file.size,


                storagePath:
                    file.path,


                processingStatus:
                    "PENDING"

            });



        // ===============================
        // Text Extraction
        // ===============================


        await knowledgeDocumentRepository.update(

            document.id,

            {

                processingStatus:
                    "PROCESSING"

            }

        );



        const extractor =
            extractorFactory.getExtractor(
                file.mimetype
            );



        const extractedText =
            await extractor.extract(
                file.path
            );



        await knowledgeDocumentRepository.update(

            document.id,

            {

                extractedText,

                processingStatus:
                    "COMPLETED"

            }

        );



        return await knowledgeDocumentRepository.findById(

            document.id

        );


    }




    // ==========================================
    // List
    // ==========================================

    async getAll(user, knowledgeBaseId) {


        const knowledgeBase =
            await knowledgeBaseRepository.findById(

                Number(knowledgeBaseId),

                user.organizationId

            );


        if (!knowledgeBase) {

            throw new Error(
                "Knowledge Base not found"
            );

        }


        return await knowledgeDocumentRepository.findAll(

            Number(knowledgeBaseId)

        );


    }




    // ==========================================
    // Delete
    // ==========================================

    async delete(user, id) {


        const document =
            await knowledgeDocumentRepository.findById(

                Number(id)

            );


        if (!document) {

            throw new Error(
                "Document not found"
            );

        }



        await knowledgeDocumentRepository.delete(

            Number(id)

        );


        return true;


    }


}


export default new KnowledgeDocumentService();