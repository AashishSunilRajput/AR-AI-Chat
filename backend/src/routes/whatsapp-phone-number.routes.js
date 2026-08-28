import express from "express";

import whatsappPhoneNumberController
    from "../controllers/whatsapp-phone-number.controller.js";


const router = express.Router();


// ==========================================
// Create Phone Number
// ==========================================

router.post(

    "/",

    whatsappPhoneNumberController.create

);


// ==========================================
// Get Phone Number
// ==========================================

router.get(

    "/:id",

    whatsappPhoneNumberController.getById

);


// ==========================================
// Get Phone Numbers By Account
// ==========================================

router.get(

    "/account/:whatsappAccountId",

    whatsappPhoneNumberController.getByAccount

);


// ==========================================
// Update Phone Number
// ==========================================

router.patch(

    "/:id",

    whatsappPhoneNumberController.update

);


// ==========================================
// Delete Phone Number
// ==========================================

router.delete(

    "/:id",

    whatsappPhoneNumberController.delete

);


export default router;