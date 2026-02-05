import ProductRepo from "../repos/product.repo.js";
import Product from "../models/product.model.js";

/**
 * Gets all product types
 * @returns {Promise<Product[]>} A promise containing product data
 */
async function findAll() {
    return await ProductRepo.findAll();
}

/**
 * Gets the product with the given id
 * @param {string} id The id of the product to find
 * @returns {Promise<Product | null>} The Product document, or null if not found
 */
async function findProductById(id) {
    return await ProductRepo.findProductById(id);
}

/**
 * Creates a product with given data
 * @param {{ sku: string, name: string, description?: string, tags: string[] }} data Product data
 * @returns {Promise<Product>} The product document created
 */
async function createProduct(data) {
    return await ProductRepo.createProduct(data);
}

/**
 * Deletes a product with given id
 * @param {string} id The id of the product to delete
 * @returns {Promise<Product>} The product document deleted
 */
async function deleteProduct(id) {
    return await ProductRepo.deleteProduct(id);
}

/**
 * Updates a product with given data
 * @param {{ _id: string, sku: string, name: string, description?: string. tags: string[] }} data The product data to update
 * @returns {Promise<Product>} The updated product document
 */
async function updateProduct(data) {
    const { _id } = data;
    return await ProductRepo.updateProduct(_id, data);
}

const ProductService = {
    findAll, findProductById, createProduct, deleteProduct, updateProduct
};

export default ProductService;