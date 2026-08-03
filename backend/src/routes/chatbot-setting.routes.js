import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";
import authorize from "../middleware/authorize.middleware.js";

import chatbotSettingController from "../controllers/chatbot-setting.controller.js";
import upload from "../middleware/image-upload.middleware.js";

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

// Upload Avatar

router.post("/:chatbotId/avatar",upload.single("avatar"),
    chatbotSettingController.uploadAvatar
);

export default router;