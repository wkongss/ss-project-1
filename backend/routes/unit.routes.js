import { Router } from "express";

const router = Router();

router.route("/")
    .get((req, res) => {
        WarehouseController.getAllWarehouses(req, res);
    })
    .post((req, res) => {
        WarehouseController.createWarehouse(req, res);
    })
    .put((req, res) => {
        WarehouseController.updateWarehouse(req, res);
    })

router.route("/:id")
    .get((req, res) => {
        WarehouseController.getWarehouseById(req, res);
    })
    .delete((req, res) => {
        WarehouseController.deleteWarehouse(req, res);
    });

export default router;