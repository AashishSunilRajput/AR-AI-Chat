import leadRepository from "../repositories/lead.repository.js";
import visitorRepository from "../repositories/visitor.repository.js";

class LeadService {

    // ==========================================
    // Create Lead
    // ==========================================

    async createLead(data) {

    console.log("LEAD SERVICE DATA:", data);


    const lead = await leadRepository.create(data);


    console.log("LEAD CREATED:", lead);


    if (data.visitorId) {

        console.log(
            "VISITOR UPDATE START:",
            data.visitorId
        );


        const updateData = {};


        if (data.name) {

            updateData.name = data.name;

        }


        if (data.email) {

            updateData.email = data.email;

        }


        console.log(
            "VISITOR UPDATE DATA:",
            updateData
        );


        if (Object.keys(updateData).length > 0) {

            const visitor =
                await visitorRepository.update(
                    data.visitorId,
                    updateData
                );


            console.log(
                "VISITOR UPDATED:",
                visitor
            );

        }

    }


    return lead;

}
 // ==========================================
// Get All Leads
// ==========================================

async getLeads(user) {

    if (user.role === "SUPER_ADMIN") {

        return await leadRepository.findAll();

    }

    return await leadRepository.findAll(

        user.organizationId

    );

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
}
export default new LeadService();