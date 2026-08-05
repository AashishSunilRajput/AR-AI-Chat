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

    // ==========================================
// Get All Visitors
// ==========================================

async getVisitors(
    user,
    filters = {}
) {


    if(user.role==="SUPER_ADMIN"){


        return await visitorRepository.findAll(

            null,

            filters

        );


    }


    return await visitorRepository.findAll(

        user.organizationId,

        filters

    );


}

// ==========================================
// Get Visitor Details
// ==========================================

async getVisitor(id) {

    return await visitorRepository.findDetails(

        id

    );

}

// ==========================================
// Visitor Stats
// ==========================================

async getStats(user) {

    if (user.role === "SUPER_ADMIN") {

        return await visitorRepository.getStats();

    }

    return await visitorRepository.getStats(

        user.organizationId

    );

}

}
    
export default new VisitorService();