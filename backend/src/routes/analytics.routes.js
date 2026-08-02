import express from "express";

import analyticsController
from "../controllers/analytics.controller.js";

import authMiddleware
from "../middleware/auth.middleware.js";


const router = express.Router();


router.use(authMiddleware);


// ==========================================
// Overview
// ==========================================

router.get(
    "/overview",
    analyticsController.getOverview
);


// ==========================================
// Lead Analytics
// ==========================================

router.get(
    "/leads",
    analyticsController.getLeadAnalytics
);


// ==========================================
// Visitor Analytics
// ==========================================

router.get(
    "/visitors",
    analyticsController.getVisitorAnalytics
);


// ==========================================
// Conversation Analytics
// ==========================================

router.get(
    "/conversations",
    analyticsController.getConversationAnalytics
);


export default router;