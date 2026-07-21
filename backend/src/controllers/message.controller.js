import messageService from "../services/message.service.js";

class MessageController {

    // ==========================================
    // Send Message
    // ==========================================

    async send(req, res, next) {

        try {

            const {

                conversationId,

                message

            } = req.body;

            const response =
                await messageService.send(

                    conversationId,

                    message

                );

            return res.status(200).json({

                success: true,

                data: response

            });

        }

        catch (error) {

            next(error);

        }

    }

    // ==========================================
    // Conversation History
    // ==========================================

    async history(req, res, next) {

        try {

            const messages =
                await messageService.getMessages(

                    req.params.conversationId

                );

            return res.status(200).json({

                success: true,

                data: messages

            });

        }

        catch (error) {

            next(error);

        }

    }

    // ==========================================
    // Delete Message
    // ==========================================

    async delete(req, res, next) {

        try {

            await messageService.delete(

                req.params.id

            );

            return res.status(200).json({

                success: true,

                message:
                    "Message deleted successfully"

            });

        }

        catch (error) {

            next(error);

        }

    }

}

export default new MessageController();