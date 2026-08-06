import leadRepository from "../repositories/lead.repository.js";
import visitorRepository from "../repositories/visitor.repository.js";
import notificationService from "./notification.service.js";
import conversationRepository from "../repositories/conversation.repository.js";

class LeadService {

    // ==========================================
    // Create Lead
    // ==========================================

    async createLead(data) {

   // ==========================================
// Create Lead
// ==========================================

console.log("LEAD SERVICE DATA:", data);

const lead = await leadRepository.create(data);

console.log("LEAD CREATED:", lead);

// ==========================================
// Create Notification
// ==========================================

try {

    console.log("Lead ConversationId:", lead.conversationId);

    if (lead.conversationId) {

        const conversation =
            await conversationRepository.findById(
                lead.conversationId
            );

        console.log("Conversation:", conversation);

        if (conversation?.chatbot) {

            const notification =
                await notificationService.create({

                    title: "New Lead",

                    message:
                        `${lead.name || "Anonymous"} submitted a new lead.`,

                    type: "NEW_LEAD",

                    organizationId:
                        conversation.chatbot.organizationId,
                           entityType: "LEAD",
                     entityId: lead.id

                });

            console.log(
                "Notification Created:",
                notification
            );

        }

    } else {

        console.log(
            "ConversationId not found."
        );

    }

}

catch (error) {

    console.error(
        "Notification Error:",
        error
    );

}

}
 // ==========================================
// ==========================================
// Get All Leads
// ==========================================

async getLeads(user, filters = {}) {

    if (user.role === "SUPER_ADMIN") {

        return await leadRepository.findAll({

            ...filters

        });

    }

    return await leadRepository.findAll({

        ...filters,

        organizationId: user.organizationId

    });

}

    // ==========================================
    // Get Lead By Id
    // ==========================================

    async getLeadById(id) {

        return await leadRepository.findById(

            id

        );

    }

    // ==========================================
    // Update Lead
    // ==========================================

    async updateLead(id, data) {

        return await leadRepository.update(

            id,

            data

        );

    }

    // ==========================================
    // Delete Lead
    // ==========================================

    async deleteLead(id) {

        return await leadRepository.delete(

            id

        );

    }

// ==========================================
// Lead Stats
// ==========================================

async getStats(user) {

    if (user.role === "SUPER_ADMIN") {

        return await leadRepository.getStats();

    }

    return await leadRepository.getStats(
        user.organizationId
    );

}


// ==========================================
// Export Leads
// ==========================================

// ==========================================
// Export Leads
// ==========================================

async exportLeads(user, filters = {}) {


    if (user.role === "SUPER_ADMIN") {


        return await leadRepository.findAll({

            ...filters

        });


    }


    return await leadRepository.findAll({

        ...filters,

        organizationId:
            user.organizationId

    });


}

}
export default new LeadService();