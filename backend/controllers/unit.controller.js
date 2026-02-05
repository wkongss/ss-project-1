import UnitService from "../services/unit.service.js";

/**
 * Handles GET /api/v1/units/
 */
async function getAllUnits(req, res) {
    try {
        const { warehouse, product } = req.query;
        let data;

        if (warehouse) {
            data = await UnitService.findUnitsByWarehouse(warehouse);
        } else if (product) {
            data = await UnitService.findUnitsByProduct(product);
        } else {
            data = await UnitService.findAll();
        }
        
        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Something went wrong!");
    }
}

/**
 * Handles GET /api/v1/units/:id
 */
async function getUnitById(req, res) {
    try {
        const { id } = req.params;
        const data = await UnitService.findUnitById(id);

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
 * Handles POST /api/v1/units/
 */
async function createUnit(req, res) {
    try {
        const data = req.body;

        const document = await UnitService.createUnit(data);
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
 * Handles PUT /api/v1/units/
 */
async function updateUnit(req, res) {
    try {
        const data = req.body;
        const document = await UnitService.updateUnit(data);
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
 * Handles DELETE /api/v1/units/:id
 */
async function deleteUnit(req, res) {
    try {
        const { id } = req.params;

        await UnitService.deleteUnit(id);
        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Something went wrong!");
    }
}

const UnitController = {
    getAllUnits, getUnitById, createUnit, updateUnit, deleteUnit
};

export default UnitController;