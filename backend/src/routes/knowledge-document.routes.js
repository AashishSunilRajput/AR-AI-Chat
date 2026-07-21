import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";
import authorize from "../middleware/authorize.middleware.js";

import upload from "../middleware/document-upload.middleware.js";

import knowledgeDocumentController
from "../controllers/knowledge-document.controller.js";

const router = express.Router();

// ==========================================
// Upload
// ==========================================

router.post(

    "/upload",

    authMiddleware,

    authorize(
        "SUPER_ADMIN",
        "CLIENT_ADMIN"
    ),

    upload.single("file"),

    knowledgeDocumentController.upload

);

// ==========================================
// List
// ==========================================

router.get(

    "/",

    authMiddleware,

    authorize(
        "SUPER_ADMIN",
        "CLIENT_ADMIN"
    ),

    knowledgeDocumentController.getAll

);

// ==========================================
// Delete
// ==========================================

router.delete(

    "/:id",

    authMiddleware,

    authorize(
        "SUPER_ADMIN",
        "CLIENT_ADMIN"
    ),

    knowledgeDocumentController.delete

);

export default router;