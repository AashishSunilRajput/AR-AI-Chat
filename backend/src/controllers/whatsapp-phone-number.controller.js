import whatsappPhoneNumberService
    from "../services/whatsapp-phone-number.service.js";


class WhatsAppPhoneNumberController {

    // ==========================================
    // Create Phone Number
    // ==========================================

    async create(req, res) {

        try {

            const phoneNumber =
                await whatsappPhoneNumberService.create(
                    req.body
                );

            return res.status(201).json({

                success: true,

                message:
                    "WhatsApp phone number created successfully",

                data:
                    phoneNumber

            });

        } catch (error) {

            console.error(
                "Create WhatsApp Phone Number Error:",
                error
            );

            return res.status(400).json({

                success: false,

                message:
                    error.message

            });

        }

    }


    // ==========================================
    // Get Phone Number
    // ==========================================

    async getById(req, res) {

        try {

            const phoneNumber =
                await whatsappPhoneNumberService.getById(
                    req.params.id
                );

            if (!phoneNumber) {

                return res.status(404).json({

                    success: false,

                    message:
                        "WhatsApp phone number not found"

                });

            }

            return res.json({

                success: true,

                data:
                    phoneNumber

            });

        } catch (error) {

            console.error(
                "Get WhatsApp Phone Number Error:",
                error
            );

            return res.status(500).json({

                success: false,

                message:
                    error.message

            });

        }

    }


    // ==========================================
    // Get By Account
    // ==========================================

    async getByAccount(req, res) {

        try {

            const phoneNumbers =
                await whatsappPhoneNumberService.getByAccount(
                    req.params.whatsappAccountId
                );

            return res.json({

                success: true,

                data:
                    phoneNumbers

            });

        } catch (error) {

            console.error(
                "Get WhatsApp Phone Numbers Error:",
                error
            );

            return res.status(500).json({

                success: false,

                message:
                    error.message

            });

        }

    }


    // ==========================================
    // Update Phone Number
    // ==========================================

    async update(req, res) {

        try {

            const phoneNumber =
                await whatsappPhoneNumberService.update(

                    req.params.id,

                    req.body

                );

            return res.json({

                success: true,

                message:
                    "WhatsApp phone number updated successfully",

                data:
                    phoneNumber

            });

        } catch (error) {

            console.error(
                "Update WhatsApp Phone Number Error:",
                error
            );

            return res.status(400).json({

                success: false,

                message:
                    error.message

            });

        }

    }


    // ==========================================
    // Delete Phone Number
    // ==========================================

    async delete(req, res) {

        try {

            await whatsappPhoneNumberService.delete(

                req.params.id

            );

            return res.json({

                success: true,

                message:
                    "WhatsApp phone number deleted successfully"

            });

        } catch (error) {

            console.error(
                "Delete WhatsApp Phone Number Error:",
                error
            );

            return res.status(400).json({

                success: false,

                message:
                    error.message

            });

        }

    }

}


export default new WhatsAppPhoneNumberController();