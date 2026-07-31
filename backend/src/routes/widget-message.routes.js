import express from "express";

import messageController from "../controllers/message.controller.js";
import widgetAuth from "../middleware/widget-auth.middleware.js";

const router = express.Router();

// ==========================================
// Widget Send Message
// ==========================================

router.post(

    "/:widgetKey",

    widgetAuth,

    messageController.send

);

export default router;