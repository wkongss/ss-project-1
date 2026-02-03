import Warehouse from "../models/warehouse.model.js";

/**
 * Finds and returns all warehouses from the database
 * @returns {Promise<{Warehouse}[]>} A promise with all warehouses
 */
function findAll() {
    return Warehouse
        .find()
        .populate("unitList")
        .exec();
}

/**
 * Finds and populates a warehouse by Id
 * @param {string} _id the ObjectId of the warehouse to get
 * @return {Promise<Warehouse>} A promise with the populated warehouse
 */
function findWarehouseById(id) {
    return Warehouse
        .findById(id)
        .populate("unitList")
        .exec();
}

/**
 * Creates a new warehouse with given data
 * @param {{ name: string, location: string, capacity: number }} data 
 * @returns {Promise<Warehouse>} A promise with all products
 */
function createWarehouse(data) {
    return Warehouse.create(data);
}

/**
 * Deletes the warehouse with the given ID.
 * @param {string} _id the ObjectId of the warehouse to delete 
 * @returns {Promise<Warehouse>} the document deleted (if available)
 */
function deleteWarehouse(_id) {
    return Warehouse.findByIdAndDelete(_id).exec();
}

/**
 * Upadtes the warehouse with the given ID.
 * @param {string} _id: the id of the warehouse to update
 * @param {{ name: string, location: string, capacity: number }} newData 
 * @returns {Promise<Document>} the updated document (if available)
 */
function updateWarehouse(_id, newData) {
    return Warehouse.findByIdAndUpdate(_id, newData).exec();
}

/**
 * Repo for warehouses
 */
const WarehouseRepo = {
    findAll, findWarehouseById, createWarehouse, deleteWarehouse, updateWarehouse
};

export default WarehouseRepo;