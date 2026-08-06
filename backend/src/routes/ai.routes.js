import express from "express";
import aiController from "../controllers/ai.controller.js";


const router = express.Router();


router.get(
    "/test",
    aiController.test
);


export default router;