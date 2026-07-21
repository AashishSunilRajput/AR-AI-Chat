import visitorRepository from "../repositories/visitor.repository.js";
import sessionToken from "../utils/session-token.js";

class VisitorService {

    // ==========================================
    // Create Visitor
    // ==========================================

    async create(chatbot, req) {

        const token = sessionToken.generate();

        const visitor =
            await visitorRepository.create({

                organizationId:
                    chatbot.organizationId,

                chatbotId:
                    chatbot.id,

                sessionToken:
                    token,

                ipAddress:
                    req.ip,

                userAgent:
                    req.headers["user-agent"]

            });

        return visitor;

    }

    // ==========================================
    // Get Visitor By Session
    // ==========================================

    async getBySession(sessionTokenValue) {

        const visitor =
            await visitorRepository.findBySessionToken(

                sessionTokenValue

            );

        if (!visitor) {

            return null;

        }

        await visitorRepository.updateLastSeen(

            visitor.id

        );

        return visitor;

    }

}
    
export default new VisitorService();