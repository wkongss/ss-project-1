import UnitRepo from "../repos/unit.repo.js";
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
    return await UnitRepo.findById(id);
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
    const { quantity } = data;

    if (quantity && quantity > 0) {
        throw new RangeError("Quantity must be non-negative!");
    }

    return await UnitRepo.createUnit(data);
}

/**
 * Updates a unit with given data
 * @param {{ _id: string, name: string, location: string, capacity: number }} data The unit data to update
 * @returns {Promise<Unit>} The updated unit document
 */
async function updateUnit(data) {
    const { _id, quantity } = data;

    if (quantity && quantity > 0) {
        throw new RangeError("Quantity must be non-negative!");
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