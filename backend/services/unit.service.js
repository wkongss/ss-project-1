import UnitRepo from "../repos/unit.repo.js";
import ProductRepo from "../repos/product.repo.js";
import WarehouseRepo from "../repos/warehouse.repo.js";
import Unit from "../models/unit.model.js";

/**
 * Gets all stock units
 * @returns {Promise<Unit[]>} A promise containing unit data
 */
async function findAll() {
    return await UnitRepo.findAll();
}

/**
 * Gets the unit with the given id
 * @param {string} id The id of the unit to find
 * @returns {Promise<Unit | null>} The Unit document, or null if not found
 */
async function findUnitById(id) {
    return await UnitRepo.findUnitById(id);
}

/**
 * Gets all units stored within a given warehouse id
 * @param {string} id The id of the warehouse to search for units
 * @returns {Promise<Unit[]>} A promise containing all units within the warehouse
 */
async function findUnitsByWarehouse(id) {
    return await UnitRepo.findUnitsByWarehouse(id);
}

/**
 * Gets all units stored of a specific product type
 * @param {string} id The id of the product to search for units
 * @returns {Promise<Unit[]>} A promise containing all units with given product type
 */
async function findUnitsByProduct(id) {
    return await UnitRepo.findUnitsByProduct(id);
}

/**
 * Creates a unit with given data
 * @param {{ product: string, warehouse: string, quantity: number, location: string }} data Unit data
 * @returns {Promise<Unit>} The unit document created
 */
async function createUnit(data) {
    const { product, warehouse, quantity, location } = data;
    
    if (!warehouse) {
        throw new ReferenceError("Warehouse ID not provided!");
    }
    
    if (!product) {
        throw new ReferenceError("Product ID not provided!");
    }

    if (!location) {
        throw new ReferenceError("Location not provided!");
    }

    const unitDoc = await UnitRepo.findUnitByWarehouseAndProduct(warehouse, product);
    const warehouseDoc = await WarehouseRepo.findWarehouseById(warehouse);
    const productDoc = await ProductRepo.findProductById(product);

    if (!warehouseDoc) {
        throw new ReferenceError("Warehouse not found!");
    }

    if (!productDoc) {
        throw new ReferenceError("Product not found!");
    }

    if (quantity == null || quantity < 0) {
        throw new RangeError("Quantity must be non-negative!");
    }

    if (warehouseDoc.currentCapacity + quantity > warehouseDoc.capacity) {
        throw new RangeError("Adding unit would exceed warehouse capacity!");
    }

    // If an identical entry exists, merges the quantities instead of creating
    // a new document
    if (unitDoc) {
        if (unitDoc.location === location) {
            return await UnitRepo.updateUnit(unitDoc._id, { 
                $inc: {
                    quantity: quantity
                }
            });
        } else {
            throw new ReferenceError("Product already exists at a different location!");
        }
    }

    return await UnitRepo.createUnit(data);
}

/**
 * Updates a unit with given data
 * @param {{ _id: string, name: string, location: string, capacity: number }} data The unit data to update
 * @returns {Promise<Unit>} The updated unit document
 */
async function updateUnit(data) {
    const { _id, product, warehouse, quantity } = data;

    if (!_id) {
        throw new ReferenceError("No ID provided to update!");
    }
    
    const unitDoc = await UnitRepo.findUnitById(_id);
    
    if (!unitDoc) {
        throw new ReferenceError("Unit not found!");
    }
    
    let warehouseDoc = unitDoc.warehouse;
    
    if (warehouse) {
        warehouseDoc = await WarehouseRepo.findWarehouseById(warehouse);
        
        if (!warehouseDoc) {
            throw new ReferenceError("Warehouse not found!");
        }
    }
    
    if (quantity == null || quantity < 0) {
        throw new RangeError("Quantity must be non-negative!");
    }

    if (quantity) {
        if (warehouseDoc.currentCapacity + (quantity - unitDoc.quantity) > warehouseDoc.capacity) {
            throw new RangeError("Updating unit would exceed warehouse quantity!");
        }
    }

    if (product) {
        const productDoc = await ProductRepo.findProductById(product);

        if (!productDoc) {
            throw new ReferenceError("Product not found!");
        }
    }

    if (product && warehouse) {
        const combinedDoc = await UnitRepo.findUnitByWarehouseAndProduct(warehouse, product);

        if (combinedDoc._id !== _id) {
            throw new ReferenceError("Product already exists at a different location!");
        }
    }

    return await UnitRepo.updateUnit(_id, data);
}

/**
 * Deletes a unit with given id
 * @param {string} id The id of the unit to delete
 * @returns {Promise<Unit>} The unit document deleted
 */
async function deleteUnit(id) {
    return await UnitRepo.deleteUnit(id);
}

const UnitService = {
    findAll, findUnitById, findUnitsByWarehouse, findUnitsByProduct, createUnit, updateUnit, deleteUnit
};

export default UnitService;