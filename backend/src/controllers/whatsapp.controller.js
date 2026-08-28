import whatsappService from "../services/whatsapp.service.js";
import whatsappAccountService from "../services/whatsapp-account.service.js";
import whatsappContactService from "../services/whatsapp-contact.service.js";
import whatsappConversationService from "../services/whatsapp-conversation.service.js";
import whatsappMessageService from "../services/whatsapp-message.service.js";
import whatsappPhoneNumberService
    from "../services/whatsapp-phone-number.service.js";

class WhatsAppController {

    // ==========================================
    // Create WhatsApp Account
    // ==========================================

    async createAccount(req, res) {

        try {

            const account =
                await whatsappAccountService.create(
                    req.body
                );

            return res.status(201).json({

                success: true,

                message:
                    "WhatsApp account created successfully",

                data:
                    account

            });

        } catch (error) {

            console.error(
                "Create WhatsApp Account Error:",
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
    // Get WhatsApp Account
    // ==========================================

    async getAccount(req, res) {

        try {

            const account =
                await whatsappAccountService.getById(
                    req.params.id
                );

            if (!account) {

                return res.status(404).json({

                    success: false,

                    message:
                        "WhatsApp account not found"

                });

            }

            return res.json({

                success: true,

                data:
                    account

            });

        } catch (error) {

            console.error(
                "Get WhatsApp Account Error:",
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
    // Get Accounts By Organization
    // ==========================================

    async getAccountsByOrganization(req, res) {

        try {

            const accounts =
                await whatsappAccountService
                    .getByOrganization(
                        req.params.organizationId
                    );

            return res.json({

                success: true,

                data:
                    accounts

            });

        } catch (error) {

            console.error(
                "Get WhatsApp Accounts Error:",
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
    // Create WhatsApp Phone Number
    // ==========================================

    async createPhoneNumber(req, res) {

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
    // Get WhatsApp Phone Number
    // ==========================================

    async getPhoneNumber(req, res) {

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
    // Get Phone Number By Meta Phone Number ID
    // ==========================================

    async getPhoneNumberByMetaId(req, res) {

        try {

            const phoneNumber =
                await whatsappPhoneNumberService
                    .getByPhoneNumberId(
                        req.params.phoneNumberId
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
                "Get WhatsApp Phone Number By Meta ID Error:",
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
    // Get Phone Numbers By Account
    // ==========================================

    async getPhoneNumbersByAccount(req, res) {

        try {

            const phoneNumbers =
                await whatsappPhoneNumberService
                    .getByAccount(
                        req.params.accountId
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

    async updatePhoneNumber(req, res) {

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

    async deletePhoneNumber(req, res) {

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


    // ==========================================
    // Update Account
    // ==========================================

    async updateAccount(req, res) {

        try {

            const account =
                await whatsappAccountService.update(

                    req.params.id,

                    req.body

                );

            return res.json({

                success: true,

                message:
                    "WhatsApp account updated successfully",

                data:
                    account

            });

        } catch (error) {

            console.error(
                "Update WhatsApp Account Error:",
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
    // Delete Account
    // ==========================================

    async deleteAccount(req, res) {

        try {

            await whatsappAccountService.delete(

                req.params.id

            );

            return res.json({

                success: true,

                message:
                    "WhatsApp account deleted successfully"

            });

        } catch (error) {

            console.error(
                "Delete WhatsApp Account Error:",
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
    // Get Contact
    // ==========================================

    async getContact(req, res) {

        try {

            const contact =
                await whatsappContactService.getById(

                    req.params.id

                );

            if (!contact) {

                return res.status(404).json({

                    success: false,

                    message:
                        "WhatsApp contact not found"

                });

            }

            return res.json({

                success: true,

                data:
                    contact

            });

        } catch (error) {

            console.error(
                "Get WhatsApp Contact Error:",
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
    // Get Contact By WhatsApp ID
    // ==========================================

    async getContactByWaId(req, res) {

        try {

            const contact =
                await whatsappContactService.getByWaId(

                    req.params.waId

                );

            if (!contact) {

                return res.status(404).json({

                    success: false,

                    message:
                        "WhatsApp contact not found"

                });

            }

            return res.json({

                success: true,

                data:
                    contact

            });

        } catch (error) {

            console.error(
                "Get WhatsApp Contact Error:",
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
    // Get Conversation
    // ==========================================

    async getConversation(req, res) {

        try {

            const conversation =
                await whatsappConversationService.getById(

                    req.params.id

                );

            if (!conversation) {

                return res.status(404).json({

                    success: false,

                    message:
                        "WhatsApp conversation not found"

                });

            }

            return res.json({

                success: true,

                data:
                    conversation

            });

        } catch (error) {

            console.error(
                "Get WhatsApp Conversation Error:",
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
    // Get Conversation Messages
    // ==========================================

    async getConversationMessages(req, res) {

        try {

            const messages =
                await whatsappMessageService
                    .getByConversation(

                        req.params.id

                    );

            return res.json({

                success: true,

                data:
                    messages

            });

        } catch (error) {

            console.error(
                "Get WhatsApp Messages Error:",
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
    // Close Conversation
    // ==========================================

    async closeConversation(req, res) {

        try {

            const conversation =
                await whatsappConversationService.close(

                    req.params.id

                );

            return res.json({

                success: true,

                message:
                    "WhatsApp conversation closed successfully",

                data:
                    conversation

            });

        } catch (error) {

            console.error(
                "Close WhatsApp Conversation Error:",
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
    // Set Agent Mode
    // ==========================================

    async setAgentMode(req, res) {

        try {

            const conversation =
                await whatsappConversationService
                    .setAgentMode(

                        req.params.id,

                        req.body.agentMode

                    );

            return res.json({

                success: true,

                message:
                    "Agent mode updated successfully",

                data:
                    conversation

            });

        } catch (error) {

            console.error(
                "Set WhatsApp Agent Mode Error:",
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
    // Process Incoming WhatsApp Message
    // ==========================================

    async processIncomingMessage(req, res) {

        try {

            const result =
                await whatsappService
                    .processIncomingMessage(

                        req.body

                    );

            return res.status(201).json({

                success: true,

                message:
                    result.duplicate
                        ? "Message already processed"
                        : "Incoming message processed successfully",

                data:
                    result

            });

        } catch (error) {

            console.error(
                "Process WhatsApp Message Error:",
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
    // Get Message
    // ==========================================

    async getMessage(req, res) {

        try {

            const message =
                await whatsappMessageService.getById(

                    req.params.id

                );

            if (!message) {

                return res.status(404).json({

                    success: false,

                    message:
                        "WhatsApp message not found"

                });

            }

            return res.json({

                success: true,

                data:
                    message

            });

        } catch (error) {

            console.error(
                "Get WhatsApp Message Error:",
                error
            );

            return res.status(500).json({

                success: false,

                message:
                    error.message

            });

        }

    }

}


export default new WhatsAppController();