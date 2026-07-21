import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";
import authorize from "../middleware/authorize.middleware.js";

const router = express.Router();

// Everyone (Logged In)
router.get(
    "/profile",
    authMiddleware,
    (req, res) => {

        res.json({
            success: true,
            user: req.user
        });

    }
);

// Only SUPER_ADMIN
router.get(
    "/super-admin",
    authMiddleware,
    authorize("SUPER_ADMIN"),
    (req, res) => {

        res.json({
            success: true,
            message: "Welcome Super Admin"
        });

    }
);

// Only CLIENT_ADMIN
router.get(
    "/client-admin",
    authMiddleware,
    authorize("CLIENT_ADMIN"),
    (req, res) => {

        res.json({
            success: true,
            message: "Welcome Client Admin"
        });

    }
);

// SUPER_ADMIN OR CLIENT_ADMIN
router.get(
    "/dashboard",
    authMiddleware,
    authorize(
        "SUPER_ADMIN",
        "CLIENT_ADMIN"
    ),
    (req, res) => {

        res.json({
            success: true,
            message: "Dashboard Access Granted"
        });

    }
);

// MANAGER + CLIENT_ADMIN
router.get(
    "/manager",
    authMiddleware,
    authorize(
        "CLIENT_ADMIN",
        "MANAGER"
    ),
    (req, res) => {

        res.json({
            success: true,
            message: "Manager Panel"
        });

    }
);

export default router;