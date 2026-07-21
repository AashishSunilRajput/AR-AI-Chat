import express from "express";

import conversationController
from "../controllers/conversation.controller.js";

const router = express.Router();

// ==========================================
// Get Conversation
// ==========================================

router.get(

    "/:id",

    conversationController.get

);

// ==========================================
// Close Conversation
// ==========================================

router.patch(

    "/:id/close",

    conversationController.close

);

export default router;