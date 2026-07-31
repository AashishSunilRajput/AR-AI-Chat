import conversationService from "../services/conversation.service.js";

class ConversationController {

    // ==========================================
    // Get Conversation
    // ==========================================

    async get(req, res, next) {

        try {

           const conversation =
    await conversationService.get(

        req.params.id,

        req.user

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
// Get All Conversations
// ==========================================

async getAll(req, res, next) {

    try {

        const conversations =
            await conversationService.getAll(
                req.user
            );

        return res.status(200).json({

            success: true,

            data: conversations

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

        req.params.id,

        req.user

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

    // ==========================================
// Conversation Stats
// ==========================================

async stats(req, res, next) {
    

    try {

        const stats =
            await conversationService.getStats(

                req.user

            );

            console.log(req.user);

        return res.json({

            success: true,

            data: stats

        });

    }

    catch (error) {

        next(error);

    }

}

}

export default new ConversationController();