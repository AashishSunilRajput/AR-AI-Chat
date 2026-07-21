import conversationService from "../services/conversation.service.js";

class ConversationController {

    // ==========================================
    // Get Conversation
    // ==========================================

    async get(req, res, next) {

        try {

            const conversation =
                await conversationService.get(

                    req.params.id

                );

            return res.status(200).json({

                success: true,

                data: conversation

            });

        }

        catch (error) {

            next(error);

        }

    }

    // ==========================================
    // Close Conversation
    // ==========================================

    async close(req, res, next) {

        try {

            const conversation =
                await conversationService.close(

                    req.params.id

                );

            return res.status(200).json({

                success: true,

                message: "Conversation closed successfully",

                data: conversation

            });

        }

        catch (error) {

            next(error);

        }

    }

}

export default new ConversationController();