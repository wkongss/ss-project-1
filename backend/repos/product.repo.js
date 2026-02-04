import Product from "../models/product.model.js";
import { Document, Query } from "mongoose";

/**
 * Finds and returns all products from the database
 * @returns {Query<Product>} A promise with all products
 */
function findAll() {
    return Product.find();
}

/**
 * Creates a product with the given data
 * @param {{ sku: string, name: string, description?: string }} data 
 * @returns {Promise<Document>} the document created
 */
function createProduct(data) {
    return Product.create(data);
}

/**
 * Deletes the product with the given ID.
 * @param {string} _id the ObjectId of the product to delete 
 * @returns {Promise<Document>} the document deleted (if available)
 */
function deleteProduct(_id) {
    return Product.findOneAndDelete(_id);
}

const ProductRepo = {
    findAll, createProduct, deleteProduct
};

export default ProductRepo;