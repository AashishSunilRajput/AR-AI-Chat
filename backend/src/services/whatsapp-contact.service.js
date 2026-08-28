import whatsappContactRepository from "../repositories/whatsapp-contact.repository.js";

class WhatsAppContactService {

    // ==========================================
    // Create / Get Contact
    // ==========================================

    async findOrCreate({

        phoneNumberId,

        waId,

        name = null,

        profileName = null

    }) {

        if (!phoneNumberId) {

            throw new Error(
                "Phone Number ID is required"
            );

        }

        if (!waId) {

            throw new Error(
                "WhatsApp ID is required"
            );

        }


        const existingContact =

            await whatsappContactRepository.findByWaId(

                waId

            );


        if (existingContact) {

            const updateData = {};

            if (name !== null) {
                updateData.name = name;
            }

            if (profileName !== null) {
                updateData.profileName = profileName;
            }

            if (Object.keys(updateData).length) {

                return await whatsappContactRepository.update(

                    existingContact.id,

                    updateData

                );

            }

            return existingContact;

        }


        return await whatsappContactRepository.create({

            phoneNumberId:
                Number(phoneNumberId),

            waId,

            name,

            profileName

        });

    }


    // ==========================================
    // Get Contact
    // ==========================================

    async getById(id) {

        return await whatsappContactRepository.findById(

            Number(id)

        );

    }


    // ==========================================
    // Get By WhatsApp ID
    // ==========================================

    async getByWaId(waId) {

        return await whatsappContactRepository.findByWaId(

            waId

        );

    }


    // ==========================================
    // Get Contacts By Phone Number
    // ==========================================

    async getByPhoneNumber(phoneNumberId) {

        return await whatsappContactRepository.findByPhoneNumber(

            Number(phoneNumberId)

        );

    }


    // ==========================================
    // Update Contact
    // ==========================================

    async update(id, data) {

        return await whatsappContactRepository.update(

            Number(id),

            data

        );

    }


    // ==========================================
    // Delete Contact
    // ==========================================

    async delete(id) {

        return await whatsappContactRepository.delete(

            Number(id)

        );

    }

}


export default new WhatsAppContactService();