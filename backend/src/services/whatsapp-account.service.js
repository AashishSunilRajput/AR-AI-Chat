import whatsappAccountRepository from "../repositories/whatsapp-account.repository.js";

class WhatsAppAccountService {

    // ==========================================
    // Create Account
    // ==========================================

    async create(data) {

        if (!data.organizationId) {
            throw new Error("Organization ID is required");
        }

        return await whatsappAccountRepository.create({

            organizationId: Number(data.organizationId),

            businessAccountId:
                data.businessAccountId || null,

            name:
                data.name || null,

            status:
                data.status || "PENDING"

        });

    }


    // ==========================================
    // Get Account By ID
    // ==========================================

    async getById(id) {

        return await whatsappAccountRepository.findById(

            Number(id)

        );

    }


    // ==========================================
    // Get Accounts By Organization
    // ==========================================

    async getByOrganization(organizationId) {

        return await whatsappAccountRepository.findByOrganization(

            Number(organizationId)

        );

    }


    // ==========================================
    // Update Account
    // ==========================================

    async update(id, data) {

        return await whatsappAccountRepository.update(

            Number(id),

            data

        );

    }


    // ==========================================
    // Update Connection Status
    // ==========================================

    async updateStatus(id, status) {

        const allowedStatuses = [

            "PENDING",

            "CONNECTED",

            "DISCONNECTED",

            "ERROR"

        ];

        if (!allowedStatuses.includes(status)) {

            throw new Error(
                "Invalid WhatsApp connection status"
            );

        }

        return await whatsappAccountRepository.update(

            Number(id),

            {

                status

            }

        );

    }


    // ==========================================
    // Delete Account
    // ==========================================

    async delete(id) {

        return await whatsappAccountRepository.delete(

            Number(id)

        );

    }

}


export default new WhatsAppAccountService();