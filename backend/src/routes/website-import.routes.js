import express from "express";

import {
    importWebsite
} from "../controllers/website-import.controller.js";


import authMiddleware from "../middleware/auth.middleware.js";


const router =
    express.Router();



router.post(

    "/import-website",

    authMiddleware,

    importWebsite

);



export default router;