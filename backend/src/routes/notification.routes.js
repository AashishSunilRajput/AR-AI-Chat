import express from "express";

import notificationController from "../controllers/notification.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

// ==========================================
// Notification Stats
// ==========================================

router.get(
    "/stats",
    authMiddleware,
    notificationController.getStats
);

// ==========================================
// Get Notifications
// ==========================================

router.get(
    "/",
    authMiddleware,
    notificationController.getAll
);

// ==========================================
// Mark As Read
// ==========================================

router.patch(
    "/:id/read",
    authMiddleware,
    notificationController.markAsRead
);

// ==========================================
// Mark All As Read
// ==========================================

router.patch(
    "/read-all",
    authMiddleware,
    notificationController.markAllAsRead
);

// ==========================================
// Delete Notification
// ==========================================

router.delete(
    "/:id",
    authMiddleware,
    notificationController.delete
);

export default router;