import knowledgeBaseService from "../services/knowledge-base.service.js";

class KnowledgeBaseController {

    // ==========================================
    // Create
    // ==========================================

    async create(req, res, next) {

        try {

            const knowledgeBase =
                await knowledgeBaseService.create(
                    req.user,
                    req.body
                );

            return res.status(201).json({

                success: true,

                message: "Knowledge Base created successfully",

                data: knowledgeBase

            });

        } catch (error) {

            next(error);

        }

    }

    // ==========================================
    // Get All
    // ==========================================

    async getAll(req, res, next) {

        try {

            const knowledgeBases =
                await knowledgeBaseService.getAll(
                    req.user
                );

            return res.status(200).json({

                success: true,

                data: knowledgeBases

            });

        } catch (error) {

            next(error);

        }

    }

    // ==========================================
    // Get By Id
    // ==========================================

    async getById(req, res, next) {

        try {

            const knowledgeBase =
                await knowledgeBaseService.getById(

                    req.params.id,

                    req.user

                );

            return res.status(200).json({

                success: true,

                data: knowledgeBase

            });

        } catch (error) {

            next(error);

        }

    }

    // ==========================================
    // Update
    // ==========================================

    async update(req, res, next) {

        try {

            const knowledgeBase =
                await knowledgeBaseService.update(

                    req.params.id,

                    req.user,

                    req.body

                );

            return res.status(200).json({

                success: true,

                message: "Knowledge Base updated successfully",

                data: knowledgeBase

            });

        } catch (error) {

            next(error);

        }

    }

    // ==========================================
    // Delete
    // ==========================================

    async delete(req, res, next) {

        try {

            await knowledgeBaseService.delete(

                req.params.id,

                req.user

            );

            return res.status(200).json({

                success: true,

                message: "Knowledge Base deleted successfully"

            });

        } catch (error) {

            next(error);

        }

    }

}

export default new KnowledgeBaseController();