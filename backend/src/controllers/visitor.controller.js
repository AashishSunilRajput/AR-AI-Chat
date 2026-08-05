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

    // ==========================================
// Get All Visitors
// ==========================================

async getVisitors(req,res,next){

try{


    const filters={


        search:req.query.search,


        page:req.query.page || 1,


        limit:req.query.limit || 10


    };



    const visitors =

        await visitorService.getVisitors(

            req.user,

            filters

        );



    return res.json({

        success:true,

        data:visitors.data,

        pagination:
            visitors.pagination

    });


}
catch(error){

    next(error);

}


}

// ==========================================
// Visitor Stats
// ==========================================

async getStats(req, res, next) {

    try {

        const stats =
            await visitorService.getStats(
                req.user
            );

        return res.json({

            success: true,

            data: stats

        });

    }

    catch (error) {

        next(error);

    }

}

// ==========================================
// Visitor Detail
// ==========================================

async getVisitor(req, res, next) {

    try {

        const visitor =
            await visitorService.getVisitor(

                req.params.id

            );

        return res.json({

            success: true,

            data: visitor

        });

    }

    catch (error) {

        next(error);

    }

}

// ==========================================
// Export Visitors
// ==========================================

async exportVisitors(req, res, next) {

    try {

        const format =
            (req.query.format || "csv")
            .toLowerCase();

        const filters = {

            search: req.query.search

        };

        const visitors =
            await visitorService.getVisitors(

                req.user,

                filters

            );

        const data = visitors.data.map(visitor => ({

            id: visitor.id,

            name: visitor.name || "",

            email: visitor.email || "",

            chatbot:
                visitor.chatbot?.name || "",

            conversations:
                visitor._count?.conversations || 0,

            leads:
                visitor._count?.leads || 0,

            ipAddress:
                visitor.ipAddress || "",

            lastSeen:
                visitor.lastSeenAt
                    ? new Date(
                        visitor.lastSeenAt
                    ).toLocaleString()
                    : "",

            createdAt:
                new Date(
                    visitor.createdAt
                ).toLocaleString()

        }));

        const headers = [

            {
                id: "id",
                title: "ID"
            },

            {
                id: "name",
                title: "Name"
            },

            {
                id: "email",
                title: "Email"
            },

            {
                id: "chatbot",
                title: "Chatbot"
            },

            {
                id: "conversations",
                title: "Conversations"
            },

            {
                id: "leads",
                title: "Leads"
            },

            {
                id: "ipAddress",
                title: "IP Address"
            },

            {
                id: "lastSeen",
                title: "Last Seen"
            },

            {
                id: "createdAt",
                title: "Created At"
            }

        ];

        switch (format) {

            case "csv":

                return await exportService.exportCSV(

                    res,

                    "Visitors",

                    headers,

                    data

                );

            case "xlsx":

                return await exportService.exportExcel(

                    res,

                    "Visitors",

                    headers,

                    data

                );

            case "pdf":

                return await exportService.exportPDF(

                    res,

                    "Visitors",

                    headers,

                    data

                );

            default:

                return res.status(400).json({

                    success: false,

                    message: "Invalid format"

                });

        }

    }

    catch (error) {

        next(error);

    }

}

}
export default new VisitorController();