import express from "express";

import visitorController
from "../controllers/visitor.controller.js";

import widgetAuth
from "../middleware/widget-auth.middleware.js";

import authMiddleware from "../middleware/auth.middleware.js";


const router = express.Router();



router.post(

    "/start/:widgetKey",

    widgetAuth,

    visitorController.start

);

// ==========================================
// Admin
// ==========================================

router.get(
    "/stats",
    authMiddleware,
    visitorController.getStats
);

router.get(
    "/",
    authMiddleware,
    visitorController.getVisitors
);

router.get(
    "/:id",
    authMiddleware,
    visitorController.getVisitor
);



export default router;