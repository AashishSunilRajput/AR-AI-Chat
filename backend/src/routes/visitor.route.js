import express from "express";

import visitorController
from "../controllers/visitor.controller.js";

import widgetAuth
from "../middleware/widget-auth.middleware.js";


const router = express.Router();



router.post(

    "/start/:widgetKey",

    widgetAuth,

    visitorController.start

);



export default router;