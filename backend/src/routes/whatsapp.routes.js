import express from "express";

import whatsappController from "../controllers/whatsapp.controller.js";
import whatsappPhoneNumberController
    from "../controllers/whatsapp-phone-number.controller.js";

const router = express.Router();


// ==========================================
// WhatsApp Account
// ==========================================

router.post(

    "/accounts",

    whatsappController.createAccount

);

router.get(

    "/accounts/:id",

    whatsappController.getAccount

);

router.get(

    "/accounts/organization/:organizationId",

    whatsappController.getAccountsByOrganization

);

router.patch(

    "/accounts/:id",

    whatsappController.updateAccount

);

router.delete(

    "/accounts/:id",

    whatsappController.deleteAccount

);


// ==========================================
// WhatsApp Phone Numbers
// ==========================================

router.post(

    "/phone-numbers",

    whatsappController.createPhoneNumber

);

router.get(

    "/phone-numbers/:id",

    whatsappController.getPhoneNumber

);

router.get(

    "/phone-numbers/meta/:phoneNumberId",

    whatsappController.getPhoneNumberByMetaId

);

router.get(

    "/phone-numbers/account/:accountId",

    whatsappController.getPhoneNumbersByAccount

);

router.patch(

    "/phone-numbers/:id",

    whatsappController.updatePhoneNumber

);

router.delete(

    "/phone-numbers/:id",

    whatsappController.deletePhoneNumber

);

// ==========================================
// WhatsApp Contacts
// ==========================================

router.get(

    "/contacts/:id",

    whatsappController.getContact

);

router.get(

    "/contacts/wa/:waId",

    whatsappController.getContactByWaId

);


// ==========================================
// WhatsApp Conversations
// ==========================================

router.get(

    "/conversations/:id",

    whatsappController.getConversation

);

router.get(

    "/conversations/:id/messages",

    whatsappController.getConversationMessages

);

router.patch(

    "/conversations/:id/close",

    whatsappController.closeConversation

);

router.patch(

    "/conversations/:id/agent-mode",

    whatsappController.setAgentMode

);


// ==========================================
// WhatsApp Messages
// ==========================================

router.post(

    "/messages/incoming",

    whatsappController.processIncomingMessage

);

router.get(

    "/messages/:id",

    whatsappController.getMessage

);


export default router;