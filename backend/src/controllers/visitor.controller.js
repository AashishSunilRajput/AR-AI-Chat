import visitorService from "../services/visitor.service.js";
import conversationService from "../services/conversation.service.js";

class VisitorController {

    // ==========================================
    // Start Visitor Session
    // ==========================================

    async start(req, res, next) {

        try {

            const chatbot = req.chatbot;

            let visitor;

            const existingToken =
                req.cookies?.ar_session;

            // ==========================================
            // Existing Visitor
            // ==========================================

            if (existingToken) {

                visitor =
                    await visitorService.getBySession(

                        existingToken

                    );

            }

            // ==========================================
            // Create New Visitor
            // ==========================================

            if (!visitor) {

                visitor =
                    await visitorService.create(

                        chatbot,

                        req

                    );

            }

            // ==========================================
            // Create / Get Active Conversation
            // ==========================================

            const conversation =
                await conversationService.create(

                    visitor

                );

            // ==========================================
            // Save Session Cookie
            // ==========================================

            res.cookie(

                "ar_session",

                visitor.sessionToken,

                {

                    httpOnly: true,

                    secure: false,

                    sameSite: "lax",

                    maxAge:
                        1000 *
                        60 *
                        60 *
                        24 *
                        30

                }

            );

            // ==========================================
            // Response
            // ==========================================

            return res.status(200).json({

                success: true,

                data: {

                    visitorId:
                        visitor.id,

                    sessionToken:
                        visitor.sessionToken,

                    conversationId:
                        conversation.id

                }

            });

        }

        catch (error) {

            next(error);

        }

    }

}

export default new VisitorController();