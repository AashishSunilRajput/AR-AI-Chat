import express from "express";

import * as embeddingController
from "../controllers/embedding.controller.js";

const router = express.Router();

router.post(

    "/:documentId",

    embeddingController.generate

);

export default router;