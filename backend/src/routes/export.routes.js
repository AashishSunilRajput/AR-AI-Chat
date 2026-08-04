import { Router } from "express";

import exportController from "../controllers/export.controller.js";

import authenticate from "../middleware/auth.middleware.js";

const router = Router();

// ==========================================
// Export Leads
// ==========================================

router.get(

    "/leads",

    authenticate,

    exportController.exportLeads

);

export default router;