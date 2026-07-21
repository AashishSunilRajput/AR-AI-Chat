import express from "express";

import knowledgeBaseController from "../controllers/knowledge-base.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";

import authorize from "../middleware/authorize.middleware.js";

const router = express.Router();

// ==========================================
// Create
// ==========================================

router.post(
    "/",
    authMiddleware,
    authorize("SUPER_ADMIN", "CLIENT_ADMIN"),
    knowledgeBaseController.create
);

// ==========================================
// Get All
// ==========================================

router.get(
    "/",
    authMiddleware,
    authorize("SUPER_ADMIN", "CLIENT_ADMIN"),
    knowledgeBaseController.getAll
);

// ==========================================
// Get By Id
// ==========================================

router.get(
    "/:id",
    authMiddleware,
    authorize("SUPER_ADMIN", "CLIENT_ADMIN"),
    knowledgeBaseController.getById
);

// ==========================================
// Update
// ==========================================

router.put(
    "/:id",
    authMiddleware,
    authorize("SUPER_ADMIN", "CLIENT_ADMIN"),
    knowledgeBaseController.update
);

// ==========================================
// Delete
// ==========================================

router.delete(
    "/:id",
    authMiddleware,
    authorize("SUPER_ADMIN", "CLIENT_ADMIN"),
    knowledgeBaseController.delete
);

export default router;