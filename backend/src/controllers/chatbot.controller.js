import chatbotService from "../services/chatbot.service.js";

class ChatbotController {

    // ==========================================
    // Create Chatbot
    // ==========================================

    async create(req, res, next) {

        try {

            const chatbot = await chatbotService.create(

                req.user,

                req.body

            );

            return res.status(201).json({

                success: true,

                message: "Chatbot created successfully",

                data: chatbot

            });

        }
        catch (error) {

            next(error);

        }

    }

    // ==========================================
    // Get All Chatbots
    // ==========================================

    async findAll(req, res, next) {

        try {

            const chatbots = await chatbotService.findAll(

                req.user

            );

            return res.json({

                success: true,

                data: chatbots

            });

        }
        catch (error) {

            next(error);

        }

    }

    // ==========================================
    // Get Chatbot By Id
    // ==========================================

    async findById(req, res, next) {

        try {

            const chatbot = await chatbotService.findById(

                req.user,

                req.params.id

            );

            return res.json({

                success: true,

                data: chatbot

            });

        }
        catch (error) {

            next(error);

        }

    }

    // ==========================================
    // Update Chatbot
    // ==========================================

    async update(req, res, next) {

        try {

            const chatbot = await chatbotService.update(

                req.user,

                req.params.id,

                req.body

            );

            return res.json({

                success: true,

                message: "Chatbot updated successfully",

                data: chatbot

            });

        }
        catch (error) {

            next(error);

        }

    }

    // ==========================================
    // Update Chatbot Status
    // ==========================================

    async updateStatus(req, res, next) {

        try {

            const chatbot = await chatbotService.updateStatus(

                req.user,

                req.params.id,

                req.body.isActive

            );

            return res.json({

                success: true,

                message: "Chatbot status updated successfully",

                data: chatbot

            });

        }
        catch (error) {

            next(error);

        }

    }

    // ==========================================
    // Delete Chatbot
    // ==========================================

    async delete(req, res, next) {

        try {

            const result = await chatbotService.delete(

                req.user,

                req.params.id

            );

            return res.json({

                success: true,

                message: result.message

            });

        }
        catch (error) {

            next(error);

        }

    }

}

export default new ChatbotController();