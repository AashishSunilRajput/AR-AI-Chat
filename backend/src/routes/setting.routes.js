import express from "express";

import settingController
from "../controllers/setting.controller.js";

import authMiddleware
from "../middleware/auth.middleware.js";

import validate
from "../middleware/validate.middleware.js";

import {

    updateOrganizationSettingsSchema,

    updateChatbotSettingsSchema

} from "../validators/setting.validator.js";

const router = express.Router();

// ==========================================
// Protected Routes
// ==========================================

router.use(authMiddleware);

// ==========================================
// Get Settings
// ==========================================

router.get(

    "/",

    settingController.getSettings

);

// ==========================================
// Update Organization Settings
// ==========================================

router.put(

    "/",

    validate(updateOrganizationSettingsSchema),

    settingController.updateOrganizationSettings

);

// ==========================================
// Update Chatbot Settings
// ==========================================

router.put(

    "/chatbot/:chatbotId",

    validate(updateChatbotSettingsSchema),

    settingController.updateChatbotSettings

);

export default router;