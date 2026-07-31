import express from "express";

import conversationController
    from "../controllers/conversation.controller.js";

import authMiddleware
    from "../middleware/auth.middleware.js";

const router = express.Router();

router.get(
    "/stats",
    authMiddleware,
    conversationController.stats
);

// ==========================================
// Get All Conversations
// ==========================================

router.get(

    "/",

    authMiddleware,

    conversationController.getAll

);

// ==========================================
// Get Conversation
// ==========================================

router.get(

    "/:id",

    authMiddleware,

    conversationController.get

);

// ==========================================
// Close Conversation
// ==========================================

router.patch(

    "/:id/close",

    authMiddleware,

    conversationController.close

);

export default router;