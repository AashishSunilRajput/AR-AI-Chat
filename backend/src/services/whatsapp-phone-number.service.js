import whatsappPhoneNumberRepository
    from "../repositories/whatsapp-phone-number.repository.js";


class WhatsAppPhoneNumberService {

    // ==========================================
    // Create Phone Number
    // ==========================================

    async create(data) {

        if (!data.whatsappAccountId) {

            throw new Error(
                "WhatsApp Account ID is required"
            );

        }

        if (!data.phoneNumberId) {

            throw new Error(
                "WhatsApp Phone Number ID is required"
            );

        }

        return await whatsappPhoneNumberRepository.create({

            whatsappAccountId:
                Number(data.whatsappAccountId),

            phoneNumberId:
                data.phoneNumberId,

            displayPhoneNumber:
                data.displayPhoneNumber || null,

            verifiedName:
                data.verifiedName || null,

            status:
                data.status || "ACTIVE"

        });

    }


    // ==========================================
    // Get By ID
    // ==========================================

    async getById(id) {

        return await whatsappPhoneNumberRepository.findById(
            Number(id)
        );

    }


    // ==========================================
    // Get By Meta Phone Number ID
    // ==========================================

    async getByPhoneNumberId(phoneNumberId) {

        return await whatsappPhoneNumberRepository
            .findByPhoneNumberId(
                phoneNumberId
            );

    }


    // ==========================================
    // Get By Account
    // ==========================================

    async getByAccount(whatsappAccountId) {

        return await whatsappPhoneNumberRepository
            .findByAccount(
                Number(whatsappAccountId)
            );

    }


    // ==========================================
    // Update
    // ==========================================

    async update(id, data) {

        return await whatsappPhoneNumberRepository.update(

            Number(id),

            data

        );

    }


    // ==========================================
    // Delete
    // ==========================================

    async delete(id) {

        return await whatsappPhoneNumberRepository.delete(

            Number(id)

        );

    }

}


export default new WhatsAppPhoneNumberService();