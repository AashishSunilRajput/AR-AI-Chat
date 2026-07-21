import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";
import authorize from "../middleware/authorize.middleware.js";

import chatbotSettingController from "../controllers/chatbot-setting.controller.js";

const router = express.Router();

router.use(authMiddleware);

router.use(
    authorize(
        "SUPER_ADMIN",
        "CLIENT_ADMIN"
    )
);

// Get Chatbot Settings
router.get("/:chatbotId", chatbotSettingController.getSettings);

// Update Chatbot Settings
router.put("/:chatbotId", chatbotSettingController.updateSettings);

export default router;