import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";
import authorize from "../middleware/authorize.middleware.js";

import chatbotController from "../controllers/chatbot.controller.js";

const router = express.Router();

router.use(authMiddleware);

router.use(
    authorize(
        "SUPER_ADMIN",
        "CLIENT_ADMIN"
    )
);

router.post(
    "/",
    chatbotController.create
);

router.get(
    "/",
    chatbotController.findAll
);

router.get(
    "/:id",
    chatbotController.findById
);

router.put(
    "/:id",
    chatbotController.update
);

router.delete(
    "/:id",
    chatbotController.delete
);

export default router;