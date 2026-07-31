import express from "express";

import * as embeddingController
from "../controllers/embedding.controller.js";

const router = express.Router();


// Generate Embeddings
router.post(
    "/:documentId",
    embeddingController.generate
);


// Get Embeddings
router.get(
    "/:documentId",
    embeddingController.getEmbeddings
);


export default router;