import express from "express";

import messageController 
from "../controllers/message.controller.js";

import widgetAuth 
from "../middleware/widget-auth.middleware.js";


const router = express.Router();


// ==========================================
// Send Message From Widget
// ==========================================

router.post(
    "/:widgetKey",
    widgetAuth,
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
    "/message/:id",
    messageController.delete
);


export default router;