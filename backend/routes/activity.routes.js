import { Router } from "express";
import ActivityController from "../controllers/activity.controller.js";

const router = Router();

router.get("/", (req, res) => {
    ActivityController.getAll(req, res);
});

router.get("/:limit", (req, res) => {
    ActivityController.getMostRecent(req, res);
});

export default router;