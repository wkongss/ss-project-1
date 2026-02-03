import WarehouseRepo from "../repos/warehouse.repo.js";
import UnitRepo from "../repos/unit.repo.js";

import { startSession } from "mongoose";

/**
 * Gets all warehouses
 * @returns {Promise<{name: string, location: string, capacity: number}[]>} A promise containing warehouse data
 */
async function findAll() {
    return await WarehouseRepo.findAll();
}

async function findWarehouseById(id) {
    return await WarehouseRepo.findWarehouseById(id);
}

async function createWarehouse(data) {
    const { capacity } = data;

    if (capacity && capacity > 0) {
        throw new RangeError("Capacity must be positive");
    }

    return await WarehouseRepo.createWarehouse(data);
}

async function deleteWarehouse(id) {
    return await WarehouseRepo.deleteWarehouse(id);
}

async function updateWarehouse(data) {
    const { _id, capacity } = data;

    if (capacity && capacity > 0) {
        throw new RangeError("Capacity must be positive");
    }

    WarehouseRepo.updateWarehouse(_id, data);
}

async function transferStock(source, destination, productId, quantity) {
    const sourceWarehouse = await WarehouseRepo.findWarehouseById(source);
    const destinationWarehouse = await WarehouseRepo.findWarehouseById(destination);
    const unitInfo = await UnitRepo.findUnitByWarehouseAndProduct(source, productId);

    if (!sourceWarehouse) {
        throw new ReferenceError("Source warehouse doesn't exist");
    }
    
    if (!destinationWarehouse) {
        throw new ReferenceError("Destination warehouse doesn't exist");
    }

    if (!unitInfo) {
        throw new ReferenceError("Product does not exist at source warehouse");
    }

    if (quantity < 1) {
        throw new RangeError("Quantity transferred must be positive");
    }
    
    if (unitInfo.quantity < quantity) {
        throw new RangeError("Source warehouse does not have enough stock to be transferred.");
    }

    if (destinationWarehouse.capacity - destinationWarehouse.currentCapacity < quantity) {
        throw new RangeError("Destination warehouse does not have enough room.");
    }

    // Begins mongoose transaction for integrity (atomically transfer items)
    const session = await startSession();

    session.startTransaction();

    try {
        // Takes units out of source warehouse
        await UnitRepo.updateUnit(unitInfo._id, { 
            $inc: {
                quantity: -quantity
            }
        });
        
        // Adds units to destination warehouse
        const newUnit = await UnitRepo.findUnitByWarehouseAndProduct(destination, productId);
        let returnValue;
        
        console.log(newUnit);
        if (!newUnit) {
            const data = {
                product: productId,
                warehouse: destinationWarehouse._id,
                quantity: quantity,
            }
            returnValue = await UnitRepo.createUnit(data);
        } else {
            returnValue = await UnitRepo.updateUnit(newUnit._id, {
                $inc: {
                    quantity: quantity
                }
            }); 
        }

        await session.commitTransaction();
        return returnValue;
    } catch (error) {
        await session.abortTransaction();
        console.error(error);
        throw new Error("Transaction attempted but was unsuccessful");
    }
}

const WarehouseService = {
    findAll, findWarehouseById, createWarehouse, deleteWarehouse, updateWarehouse, transferStock
}

export default WarehouseService;