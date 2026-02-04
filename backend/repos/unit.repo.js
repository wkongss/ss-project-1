import Unit from "../models/unit.model.js";

/**
 * Finds and returns every warehouse stock from the database
 * @returns {Promise<Unit[]>} A promise containing all warehouse stock from database
 */
function findAll() {
    return Unit
        .find().
        populate(["warehouse", "product"])
        .exec();
}

/**
 * Finds and returns a unit by ID
 * @param {string} _id The id of the unit
 * @returns {Promise<Unit | null>} A promise containing the unit
 */
function findUnitById(_id) {
    return Unit
        .findById(_id)
        ?.populate(["warehouse", "product"])
        ?.exec();
};

/**
 * Finds and returns all stock from a given warehouse
 * @param {string} _id The id of the warehouse
 * @returns {Promise<Unit[]>} A promise containing all stock from the warehouse
 */
function findUnitsByWarehouse(_id) {
    return Unit
        .find({ warehouse: { _id: _id } })
        .populate(["warehouse", "product"])
        .exec();
};

/**
 * Finds and returns all stock of a give product type
 * @param {string} _id The id of the product
 * @returns {Promise<Unit[]>} A promise containing all stock with given product id
 */
function findUnitsByProduct(_id) {
    return Unit
        .find({ product: { _id: _id }})
        .populate(["warehouse", "product"])
        .exec();
}

/**
 * Finds and returns a unique stock of a give warehouse and product id
 * @param {string} warehouseId The id of the warehouse
 * @param {string} productId The id of the product
 * @returns {Promise<Unit>} A promise containing a specific unit
 */
function findUnitByWarehouseAndProduct(warehouseId, productId) {
    return Unit
        .findOne({ 
            warehouse: { _id: warehouseId }, 
            product: { _id: productId }
        })
        .populate(["warehouse", "product"])
        .exec();
}

/**
 * Creates a new unit of stock with given data
 * @param {{ product: string, warehouse: string, quantity: number, location: string }} data 
 * @returns {Promise<Unit>} A promise with the created unit
 */
function createUnit(data) {
    return Unit.create(data);
}

/**
 * Updates a unit of stock with given data
 * @param {string} _id The id of the unit to update
 * @param {{ product?: string, warehouse?: string, quantity?: number, location?: string }} newData 
 * @returns {Promise<Unit>} A promise with the updated unit
 */
async function updateUnit(_id, newData) {
    return Unit.findByIdAndUpdate(_id, newData, { returnDocument: "after" }).exec();
}

/**
 * Deletes a unit of stock with given id
 * @param {string} _id The id of the unit to delete
 * @returns {Promise<Unit>} A promise with the deleted unit
 */
function deleteUnit(_id) {
    return Unit.findByIdAndDelete(_id).exec();
}

const UnitRepo = {
    findAll, findUnitById, findUnitsByWarehouse, findUnitByWarehouseAndProduct, findUnitsByProduct, createUnit, updateUnit, deleteUnit
};

export default UnitRepo;