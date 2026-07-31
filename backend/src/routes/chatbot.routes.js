import express from "express";

import chatbotController from "../controllers/chatbot.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";
import authorize from "../middleware/authorize.middleware.js";

const router = express.Router();

// =====================================
// Authentication
// =====================================

router.use(authMiddleware);

// =====================================
// Create Chatbot
// POST /api/chatbots
// =====================================

router.post(

    "/",

    authorize(
        "SUPER_ADMIN"
    ),

    chatbotController.create

);

// =====================================
// Get All Chatbots
// GET /api/chatbots
// =====================================

router.get(

    "/",

    authorize(
        "SUPER_ADMIN",
        "CLIENT_ADMIN"
    ),

    chatbotController.findAll

);

// =====================================
// Get Chatbot By Id
// GET /api/chatbots/:id
// =====================================

router.get(

    "/:id",

    authorize(
        "SUPER_ADMIN",
        "CLIENT_ADMIN"
    ),

    chatbotController.findById

);

// =====================================
// Update Chatbot
// PUT /api/chatbots/:id
// =====================================

router.put(

    "/:id",

    authorize(
        "SUPER_ADMIN"
    ),

    chatbotController.update

);

// =====================================
// Update Chatbot Status
// PATCH /api/chatbots/:id/status
// =====================================

router.patch(

    "/:id/status",

    authorize(
        "SUPER_ADMIN"
    ),

    chatbotController.updateStatus

);

// =====================================
// Delete Chatbot
// DELETE /api/chatbots/:id
// =====================================

router.delete(

    "/:id",

    authorize(
        "SUPER_ADMIN"
    ),

    chatbotController.delete

);

export default router;