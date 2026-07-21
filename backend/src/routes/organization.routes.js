import express from "express";

import organizationController from "../controllers/organization.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";
import authorize from "../middleware/authorize.middleware.js";
import validate from "../middleware/validate.middleware.js";

import organizationValidation from "../validators/organization.validation.js";

const router = express.Router();

// =======================================
// Get Organization Profile
// GET /api/organization/profile
// =======================================

router.get(

    "/profile",

    authMiddleware,

    authorize(
        "SUPER_ADMIN",
        "CLIENT_ADMIN"
    ),

    organizationController.getProfile

);

// =======================================
// Update Organization Profile
// PUT /api/organization/profile
// =======================================

router.put(

    "/profile",

    authMiddleware,

    authorize(
        "SUPER_ADMIN",
        "CLIENT_ADMIN"
    ),

    validate(
        organizationValidation.updateProfile
    ),

    organizationController.updateProfile

);

export default router;