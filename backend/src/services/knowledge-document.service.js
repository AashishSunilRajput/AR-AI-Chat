import fs from "fs/promises";
import path from "path";

import knowledgeBaseRepository from "../repositories/knowledge-base.repository.js";
import knowledgeDocumentRepository from "../repositories/knowledge-document.repository.js";

import extractorFactory from "../utils/extractors/extractor.factory.js";
import embeddingRepository from "../repositories/embedding.repository.js";
class KnowledgeDocumentService {

    // ==========================================
    // Upload Document
    // ==========================================

    async upload(user, file, knowledgeBaseId) {

        if (!file) {
            throw new Error("Please upload a document");
        }

        let knowledgeBase;

        // SUPER ADMIN
        if (user.role === "SUPER_ADMIN") {

            knowledgeBase =
                await knowledgeBaseRepository.findById(
                    Number(knowledgeBaseId)
                );

        }
        // CLIENT ADMIN
        else {

            knowledgeBase =
                await knowledgeBaseRepository.findById(
                    Number(knowledgeBaseId),
                    user.organizationId
                );

        }

        if (!knowledgeBase) {
            throw new Error("Knowledge Base not found");
        }

        // ==========================================
        // Create Document
        // ==========================================

        const document =
            await knowledgeDocumentRepository.create({

                knowledgeBaseId: Number(knowledgeBaseId),

                title: path.parse(
                    file.originalname
                ).name,

                fileName: file.filename,

                fileType: file.mimetype,

                fileSize: file.size,

                storagePath: file.path,

                processingStatus: "PENDING"

            });

        // ==========================================
        // Update Status -> PROCESSING
        // ==========================================

        await knowledgeDocumentRepository.update(

            document.id,

            {
                processingStatus: "PROCESSING"
            }

        );

        try {

            // ==========================================
            // Get Extractor
            // ==========================================

            const extractor =
                extractorFactory.getExtractor(
                    file.mimetype
                );

            if (!extractor) {

                throw new Error(
                    "Unsupported file type"
                );

            }

            // ==========================================
            // Extract Text
            // ==========================================

            const extractedText =
                await extractor.extract(
                    file.path
                );

            // ==========================================
            // Save Extracted Text
            // ==========================================

            await knowledgeDocumentRepository.update(

                document.id,

                {

                    extractedText,

                    processingStatus: "COMPLETED"

                }

            );

        }
        catch (error) {

            // ==========================================
            // Failed
            // ==========================================

            await knowledgeDocumentRepository.update(

                document.id,

                {

                    processingStatus: "FAILED"

                }

            );

            throw error;

        }

        return await knowledgeDocumentRepository.findById(
            document.id
        );

    }

    // ==========================================
    // List Documents
    // ==========================================

    async getAll(user, knowledgeBaseId) {

        let knowledgeBase;

        // SUPER ADMIN
        if (user.role === "SUPER_ADMIN") {

            knowledgeBase =
                await knowledgeBaseRepository.findById(
                    Number(knowledgeBaseId)
                );

        }
        // CLIENT ADMIN
        else {

            knowledgeBase =
                await knowledgeBaseRepository.findById(
                    Number(knowledgeBaseId),
                    user.organizationId
                );

        }

        if (!knowledgeBase) {

            throw new Error(
                "Knowledge Base not found"
            );

        }

      const documents =
    await knowledgeDocumentRepository.findAll(
        Number(knowledgeBaseId)
    );

const data = await Promise.all(

    documents.map(async (doc) => {

        const embeddingCount =
            await embeddingRepository.countByDocument(
                doc.id
            );

        return {

            ...doc,

            chunkCount:
                doc._count.chunks,

            embeddingCount

        };

    })

);

return data;

// Next step me yahan chunkCount aur embeddingCount add karenge

return documents;

    }

    // ==========================================
    // Get Document
    // ==========================================

    async getById(user, id) {

        let document;

        if (user.role === "SUPER_ADMIN") {

            document =
                await knowledgeDocumentRepository.findById(
                    Number(id)
                );

        }
        else {

            document =
                await knowledgeDocumentRepository.findByIdWithOrganization(
                    Number(id),
                    user.organizationId
                );

        }

        if (!document) {

            throw new Error(
                "Document not found"
            );

        }

        return document;

    }

    // ==========================================
    // Delete Document
    // ==========================================

    async delete(user, id) {

        let document;

        // SUPER ADMIN
        if (user.role === "SUPER_ADMIN") {

            document =
                await knowledgeDocumentRepository.findById(
                    Number(id)
                );

        }
        // CLIENT ADMIN
        else {

            document =
                await knowledgeDocumentRepository.findByIdWithOrganization(

                    Number(id),

                    user.organizationId

                );

        }

        if (!document) {

            throw new Error(
                "Document not found"
            );

        }

        // ==========================================
        // Delete Physical File
        // ==========================================

        if (document.storagePath) {

            try {

                await fs.unlink(
                    document.storagePath
                );

            }
            catch {

                // Ignore if file doesn't exist

            }

        }

        // ==========================================
        // Delete Database Record
        // ==========================================

        await knowledgeDocumentRepository.delete(
            Number(id)
        );

        return true;

    }

}

export default new KnowledgeDocumentService();