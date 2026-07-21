import express from "express";

import userController from "../controllers/user.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";
import authorize from "../middleware/authorize.middleware.js";
import validate from "../middleware/validate.middleware.js";
import userValidation from "../validators/user.validation.js";

const router = express.Router();

// =====================================
// Create User
// POST /api/users
// =====================================

router.post(

    "/",

    authMiddleware,

    authorize(
        "CLIENT_ADMIN",
        "SUPER_ADMIN"
    ),

    validate(
        userValidation.create
    ),

    userController.create

);

// =====================================
// Get All Users
// GET /api/users
// =====================================

router.get(

    "/",

    authMiddleware,

    authorize(
        "CLIENT_ADMIN",
        "SUPER_ADMIN"
    ),

    userController.getAll

);

// =====================================
// Get User By ID
// GET /api/users/:id
// =====================================

router.get(

    "/:id",

    authMiddleware,

    authorize(
        "CLIENT_ADMIN",
        "SUPER_ADMIN"
    ),

    userController.getById

);

// =====================================
// Update User
// PUT /api/users/:id
// =====================================

router.put(

    "/:id",

    authMiddleware,

    authorize(
        "CLIENT_ADMIN",
        "SUPER_ADMIN"
    ),

    validate(
        userValidation.update
    ),

    userController.update

);

// =====================================
// Update User Status
// PATCH /api/users/:id/status
// =====================================

router.patch(

    "/:id/status",

    authMiddleware,

    authorize(
        "CLIENT_ADMIN",
        "SUPER_ADMIN"
    ),

    userController.updateStatus

);

// =====================================
// Delete User
// DELETE /api/users/:id
// =====================================

router.delete(

    "/:id",

    authMiddleware,

    authorize(
        "CLIENT_ADMIN",
        "SUPER_ADMIN"
    ),

    userController.delete

);

export default router;