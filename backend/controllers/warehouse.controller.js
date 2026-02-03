import WarehouseService from "../services/warehouse.service.js";

async function getAllWarehouses(_, res) {
    try {
        const data = await WarehouseService.findAll();
        res.status(200)
            .json(data);
    } catch (error) {
        res.status(500)
            .send("Something went wrong!");

            console.error(error);
    }
}

async function getWarehouseById(req, res) {
    try {
        const { id } = req.params;
        const data = await WarehouseService.findWarehouseById(id);

        res.status(200)
            .json(data);
    } catch (error) {
        res.status(500)
            .send("Something went wrong!");
        
            console.error(error);
        }
    }
    
async function createWarehouse(req, res) {
    try {
        const data = req.body;
        
        const document = await WarehouseService.createWarehouse(data);
        res.status(201)
        .json(document);
    } catch (error) {
        console.log(error);
        res.status(500)
            .send("Something went wrong!");
        
        console.error(error);
    }
}

async function updateWarehouse(req, res) {
    try {
        const data = req.body;
        const document = await WarehouseService.updateWarehouse(data);
        res.status(201)
        .json(document);
    } catch (error) {
        res.status(500)
            .send("Something went wrong!");
        
        console.error(error);
    }
}

async function deleteWarehouse(req, res) {
    try {
        const { id } = req.params;
        
        await WarehouseService.deleteWarehouse(id);
        res.sendStatus(204);
    } catch (error) {
        res.status(500)
            .send("Something went wrong!");
        
        console.error(error);
    }
}

async function transferItems(req, res) {
    try {
        const { from, to, product, amount } = req.body;
        const document = await WarehouseService.transferStock(from, to, product, amount);
        res.status(200)
            .json(document); 
    } catch (error) {
        if (error instanceof RangeError || error instanceof ReferenceError) {
            res.status(400)
                .send(error.message);
        } else {
            res.sendStatus(500);
        }
        
        console.error(error);   
    }
}

const WarehouseController = {
    getAllWarehouses, getWarehouseById, createWarehouse, updateWarehouse, deleteWarehouse, transferItems
};

export default WarehouseController;