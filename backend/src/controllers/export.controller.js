import leadService from "../services/lead.service.js";
import visitorService from "../services/visitor.service.js";
import conversationService from "../services/conversation.service.js";
import exportService from "../services/export.service.js";

class ExportController {

    // ==========================================
    // Export Leads
    // ==========================================

    async exportLeads(req, res, next) {

        try {

            const format =
                (req.query.format || "csv").toLowerCase();

           const filters = {

    search: req.query.search,

    status: req.query.status,

    source: req.query.source,

    from: req.query.from,

    to: req.query.to

};

const leads = await leadService.exportLeads(

    req.user,

    filters

);

          const leadList = leads.data || leads;


const data = leadList.map(lead => ({

    id: lead.id,

    name: lead.name || "",

    email: lead.email || "",

    phone: lead.phone || "",

    company: lead.company || "",

    status: lead.status,

    source: lead.source,

    visitor:
        lead.visitor?.name || "",

    conversation:
        lead.conversation?.id || "",

    createdAt:
        new Date(
            lead.createdAt
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
                    id: "phone",
                    title: "Phone"
                },

                {
                    id: "company",
                    title: "Company"
                },

                {
                    id: "status",
                    title: "Status"
                },

                {
                    id: "source",
                    title: "Source"
                },

                {
                    id: "visitor",
                    title: "Visitor"
                },

                {
                    id: "conversation",
                    title: "Conversation"
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

                        "Leads",

                        headers,

                        data

                    );

                case "xlsx":

                    return await exportService.exportExcel(

                        res,

                        "Leads",

                        headers,

                        data

                    );

                case "pdf":

                    return await exportService.exportPDF(

                        res,

                        "Leads",

                        headers,

                        data

                    );

                default:

                    return res.status(400).json({

                        success: false,

                        message: "Invalid export format"

                    });

            }

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



// ==========================================
// Export Conversations
// ==========================================

async exportConversations(req, res, next) {

    try {

        const format =
            (req.query.format || "csv")
            .toLowerCase();

        const filters = {

            search: req.query.search

        };

        const conversations =
            await conversationService.getAll(

                req.user,

                filters

            );

        const conversationList =
            conversations.data || conversations;

        const data =
            conversationList.map((conversation) => ({

                id: conversation.id,

                visitor:
                    conversation.visitor?.name ||
                    "Anonymous",

                email:
                    conversation.visitor?.email ||
                    "",

                chatbot:
                    conversation.chatbot?.name ||
                    "",

                status:
                    conversation.status,

                messages:
                    conversation._count?.messages ||
                    0,

                createdAt:
                    new Date(
                        conversation.createdAt
                    ).toLocaleString()

            }));

        const headers = [

            {
                id: "id",
                title: "ID"
            },

            {
                id: "visitor",
                title: "Visitor"
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
                id: "status",
                title: "Status"
            },

            {
                id: "messages",
                title: "Messages"
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

                    "Conversations",

                    headers,

                    data

                );

            case "xlsx":

                return await exportService.exportExcel(

                    res,

                    "Conversations",

                    headers,

                    data

                );

            case "pdf":

                return await exportService.exportPDF(

                    res,

                    "Conversations",

                    headers,

                    data

                );

            default:

                return res.status(400).json({

                    success: false,

                    message: "Invalid export format"

                });

        }

    }

    catch (error) {

        next(error);

    }

}

}
export default new ExportController();