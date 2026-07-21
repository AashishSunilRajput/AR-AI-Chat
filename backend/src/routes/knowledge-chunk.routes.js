import express from "express";


import authMiddleware from "../middleware/auth.middleware.js";

import authorize from "../middleware/authorize.middleware.js";


import knowledgeChunkController
from "../controllers/knowledge-chunk.controller.js";



const router = express.Router();



// Create Chunks

router.post(

    "/:documentId",

    authMiddleware,

    authorize(
        "SUPER_ADMIN",
        "CLIENT_ADMIN"
    ),

    knowledgeChunkController.create

);




// Get Chunks

router.get(

    "/:documentId",

    authMiddleware,

    authorize(
        "SUPER_ADMIN",
        "CLIENT_ADMIN"
    ),

    knowledgeChunkController.getAll

);



export default router;