import express from "express";

import widgetController
from "../controllers/widget.controller.js";

import widgetAuth
from "../middleware/widget-auth.middleware.js";

const router = express.Router();

router.get(

    "/config/:widgetKey",

    widgetAuth,

    widgetController.getConfig

);

export default router;