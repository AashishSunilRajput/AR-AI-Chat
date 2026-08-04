import leadService from "../services/lead.service.js";
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

}

export default new ExportController();