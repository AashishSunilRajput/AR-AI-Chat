import express from "express";
import messageController from "../controllers/message.controller.js";

const router = express.Router();

// ==========================================
// Send Message
// ==========================================

router.post(

    "/send",

    messageController.send

);

// ==========================================
// Conversation History
// ==========================================

router.get(

    "/conversation/:conversationId",

    messageController.history

);

// ==========================================
// Delete Message
// ==========================================

router.delete(

    "/:id",

    messageController.delete

);

export default router;