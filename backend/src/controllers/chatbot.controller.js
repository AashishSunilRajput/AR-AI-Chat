import chatbotService from "../services/chatbot.service.js";

class ChatbotController {

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

        } catch (error) {

            next(error);

        }

    }

    async findAll(req, res, next) {

        try {

            const chatbots = await chatbotService.findAll(
                req.user
            );

            return res.json({
                success: true,
                data: chatbots
            });

        } catch (error) {

            next(error);

        }

    }

    async findById(req, res, next) {

        try {

            const chatbot = await chatbotService.findById(
                req.params.id
            );

            return res.json({
                success: true,
                data: chatbot
            });

        } catch (error) {

            next(error);

        }

    }

    async update(req, res, next) {

        try {

            const chatbot = await chatbotService.update(
                req.params.id,
                req.body
            );

            return res.json({
                success: true,
                message: "Chatbot updated successfully",
                data: chatbot
            });

        } catch (error) {

            next(error);

        }

    }

    async delete(req, res, next) {

        try {

            await chatbotService.delete(
                req.params.id
            );

            return res.json({
                success: true,
                message: "Chatbot deleted successfully"
            });

        } catch (error) {

            next(error);

        }

    }

}

export default new ChatbotController();