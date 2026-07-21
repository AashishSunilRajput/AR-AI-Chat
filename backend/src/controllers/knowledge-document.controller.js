import knowledgeDocumentService from "../services/knowledge-document.service.js";

class KnowledgeDocumentController {

    // ==========================================
    // Upload
    // ==========================================

    async upload(req, res, next) {

        try {

            const document =
                await knowledgeDocumentService.upload(

                    req.user,

                    req.file,

                    req.body.knowledgeBaseId

                );

            return res.status(201).json({

                success: true,

                message: "Document uploaded successfully",

                data: document

            });

        }

        catch (error) {

            next(error);

        }

    }

    // ==========================================
    // List
    // ==========================================

    async getAll(req, res, next) {

        try {

            const documents =
                await knowledgeDocumentService.getAll(

                    req.user,

                    req.query.knowledgeBaseId

                );

            return res.status(200).json({

                success: true,

                data: documents

            });

        }

        catch (error) {

            next(error);

        }

    }

    // ==========================================
    // Delete
    // ==========================================

    async delete(req, res, next) {

        try {

            await knowledgeDocumentService.delete(

                req.user,

                req.params.id

            );

            return res.status(200).json({

                success: true,

                message: "Document deleted successfully"

            });

        }

        catch (error) {

            next(error);

        }

    }

}

export default new KnowledgeDocumentController();