import express from "express";

import organizationController from "../controllers/organization.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";
import authorize from "../middleware/authorize.middleware.js";
import validate from "../middleware/validate.middleware.js";

import organizationValidation from "../validators/organization.validation.js";


const router = express.Router();


// =======================================
// Get Organization List
// GET /api/organization/
// SUPER ADMIN
// =======================================

router.get(

    "/",

    authMiddleware,

    authorize("SUPER_ADMIN"),

    organizationController.getOrganizations

);



// =======================================
// Create Organization
// POST /api/organization/
// SUPER ADMIN
// =======================================

router.post(

    "/",

    authMiddleware,

    authorize("SUPER_ADMIN"),

    validate(
        organizationValidation.create
    ),

    organizationController.create

);



// =======================================
// Get Organization Profile
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