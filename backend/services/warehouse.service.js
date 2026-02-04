import WarehouseRepo from "../repos/warehouse.repo.js";
import Warehouse from "../models/warehouse.model.js";
import UnitRepo from "../repos/unit.repo.js";
import Unit from "../models/unit.model.js";
import ActivityRepo from "../repos/activity.repo.js";

import { startSession } from "mongoose";

/**
 * Gets all warehouses
 * @returns {Promise<Warehouse[]>} A promise containing warehouse data
 */
async function findAll() {
    return await WarehouseRepo.findAll();
}

/**
 * Gets the warehouse with the given id
 * @param {string} id The id of the warehouse to find
 * @returns {Promise<Warehouse | null>} The Warehouse document, or null if not found
 */
async function findWarehouseById(id) {
    return await WarehouseRepo.findWarehouseById(id);
}

/**
 * Creates a warehouse with given data
 * @param {{ name: string, location: string, capacity: number, }} data Warehouse data
 * @returns {Promise<Warehouse>} The warehouse document created
 */
async function createWarehouse(data) {
    const { capacity } = data;

    if (capacity && capacity > 0) {
        throw new RangeError("Capacity must be positive");
    }

    const warehouseDoc = await WarehouseRepo.createWarehouse(data);
    await ActivityRepo.createActivity({ type: "create", affected: [warehouseDoc._id] });

    return warehouseDoc;
}

/**
 * Deletes a warehouse with given id
 * @param {string} id The id of the warehouse to delete
 * @returns {Promise<Warehouse>} The warehouse document deleted
 */
async function deleteWarehouse(id) {
    const warehouseDoc = await WarehouseRepo.deleteWarehouse(id);

    if (warehouseDoc) {
        await ActivityRepo.createActivity({ type: "delete", affected: [warehouseDoc._id] });
    }

    return warehouseDoc;
}

/**
 * Updates a warehouse with given data
 * @param {{ _id: string, name: string, location: string, capacity: number }} data The warehouse data to update
 * @returns {Promise<Warehouse>} The updated warehouse document
 */
async function updateWarehouse(data) {
    const { _id, capacity } = data;

    if (capacity && capacity > 0) {
        throw new RangeError("Capacity must be positive");
    }

    const warehouseDoc = await WarehouseRepo.updateWarehouse(_id, data);

    if (warehouseDoc) {
        await ActivityRepo.createActivity({ type: "update", affected: [warehouseDoc._id] });
    }

    return warehouseDoc;
}

/**
 * Transfers a unit from one warehouse to another
 * @param {string} source The source warehouse ID
 * @param {string} destination The destination warehouse ID
 * @param {string} unitId The unit in the source warehouse to transfer
 * @param {number} quantity The number of units to transfer
 * @returns {Promise<Unit[]>} A promise with the updated units affected
 */
async function transferStock(source, destination, unitId, quantity) {
    const sourceWarehouse = await WarehouseRepo.findWarehouseById(source);
    const destinationWarehouse = await WarehouseRepo.findWarehouseById(destination);
    const unit = await UnitRepo.findUnitById(unitId);

    if (!sourceWarehouse) {
        throw new ReferenceError("Source warehouse doesn't exist");
    }
    
    if (!destinationWarehouse) {
        throw new ReferenceError("Destination warehouse doesn't exist");
    }

    if (!unit || unit.warehouse._id != source) {
        throw new ReferenceError("Product does not exist at source warehouse");
    }

    if (quantity < 1) {
        throw new RangeError("Quantity transferred must be positive");
    }
    
    if (unit.quantity < quantity) {
        throw new RangeError("Source warehouse does not have enough stock to be transferred.");
    }

    if (destinationWarehouse.capacity - destinationWarehouse.currentCapacity < quantity) {
        throw new RangeError("Destination warehouse does not have enough room.");
    }

    // Begins mongoose transaction for integrity (atomically transfer items)
    const session = await startSession();

    session.startTransaction();
    
    try {
        const returnValue = [];

        // Takes units out of source warehouse
        const updatedSource = await UnitRepo.updateUnit(unitId, { 
            $inc: {
                quantity: -quantity
            }
        });

        returnValue.push(updatedSource);
        
        // Adds units to destination warehouse
        const newUnit = await UnitRepo.findUnitByWarehouseAndProduct(destination, unit.product._id);
        
        let updatedDestination;

        if (!newUnit) {
            const data = {
                product: unit.product._id,
                warehouse: destinationWarehouse._id,
                quantity: quantity,
            }

            updatedDestination = await UnitRepo.createUnit(data);
        } else {
            updatedDestination = await UnitRepo.updateUnit(newUnit._id, {
                $inc: {
                    quantity: quantity
                }
            }); 
        }

        returnValue.push(updatedDestination);

        await session.commitTransaction();

        await ActivityRepo.createActivity({ 
            type: "transfer", 
            affected: [source, destination], 
            description: `${quantity} units of ${unit.product.sku}` })
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