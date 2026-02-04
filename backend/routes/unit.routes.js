import { Router } from "express";
import UnitController from "../controllers/unit.controller.js";

const router = Router();

router.route("/")
    .get((req, res) => {
        UnitController.getAllUnits(req, res);
    })
    .post((req, res) => {
        UnitController.createUnit(req, res);
    })
    .put((req, res) => {
        UnitController.updateUnit(req, res);
    })

router.route("/:id")
    .get((req, res) => {
        UnitController.getUnitById(req, res);
    })
    .delete((req, res) => {
        UnitController.deleteUnit(req, res);
    });

export default router;