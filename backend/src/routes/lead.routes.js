import express from "express";


import {

    createLead,
    getLeads,
    getLead,
    updateLead,
    deleteLead

} from "../controllers/lead.controller.js";



import authMiddleware from "../middleware/auth.middleware.js";



const router = express.Router();



// Widget lead create
router.post(
    "/",
    createLead
);



// Admin lead list
router.get(
    "/",
    authMiddleware,
    getLeads
);



router.get(
    "/:id",
    authMiddleware,
    getLead
);



router.put(
    "/:id",
    authMiddleware,
    updateLead
);



router.delete(
    "/:id",
    authMiddleware,
    deleteLead
);



export default router;