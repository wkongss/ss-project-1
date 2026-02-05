import WarehouseService from "../services/warehouse.service.js";

/**
 * Handles GET /api/v1/warehouses/
 */
async function getAllWarehouses(_, res) {
    try {
        const data = await WarehouseService.findAll();
        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Something went wrong!");
    }
}

/**
 * Handles GET /api/v1/warehouses/:id
 */
async function getWarehouseById(req, res) {
    try {
        const { id } = req.params;
        const data = await WarehouseService.findWarehouseById(id);

        if (!data) {
            return res.sendStatus(404);
        }

        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Something went wrong!");
    }
}

/**
 * Handles POST /api/v1/warehouses/
 */
async function createWarehouse(req, res) {
    try {
        const data = req.body;

        const document = await WarehouseService.createWarehouse(data);
        res.status(201).json(document);
    } catch (error) {
        if (error instanceof RangeError) {
            return res.status(400).send(error.message);
        }

        console.error(error);
        return res.status(500).send("Something went wrong!");
    }
}

/**
 * Handles PUT /api/v1/warehouses/
 */
async function updateWarehouse(req, res) {
    try {
        const data = req.body;
        const document = await WarehouseService.updateWarehouse(data);
        res.status(201).json(document);
    } catch (error) {
        if (error instanceof RangeError || error instanceof ReferenceError) {
            return res.status(400).send(error.message);
        }

        console.error(error);
        return res.status(500).send("Something went wrong!");
    }
}

/**
 * Handles DELETE /api/v1/warehouses/:id
 */
async function deleteWarehouse(req, res) {
    try {
        const { id } = req.params;

        await WarehouseService.deleteWarehouse(id);
        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Something went wrong!");
    }
}

/**
 * Handles POST /api/v1/warehouses/transfer
 */
async function transferItems(req, res) {
    try {
        const { source, destination, unit, quantity } = req.body;
        const document = await WarehouseService.transferStock(source, destination, unit, quantity);
        res.status(200).json(document);
    } catch (error) {
        if (error instanceof RangeError || error instanceof ReferenceError) {
            return res.status(400).send(error.message);
        }

        console.error(error);
        return res.sendStatus(500);
    }
}

const WarehouseController = {
    getAllWarehouses, getWarehouseById, createWarehouse, updateWarehouse, deleteWarehouse, transferItems
};

export default WarehouseController;