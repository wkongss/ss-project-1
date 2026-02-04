import Product from "../models/product.model.js";

/**
 * Finds and returns all products from the database
 * @returns {Promise<Product[]>} A promise with all products
 */
function findAll() {
    return Product.find().exec();
}

/**
 * Finds and returns a product by its ID
 * @param {string} _id The id of the product to find
 * @returns {Promise<Product | null>} A promise of the document of the product found
 */
function findProductById(_id) {
    return Product.findById(_id).exec();
}

/**
 * Creates a product with the given data
 * @param {{ sku: string, name: string, description?: string }} data 
 * @returns {Promise<Product>} A promise of the document created
 */
function createProduct(data) {
    return Product.create(data).exec();
}

/**
 * Updates a product with given data
 * @param {string} _id The id of the product to update
 * @param {{ sku: string, name: string, description?: string }} newData 
 * @returns {Promise<Product>} A promise with the updated unit
 */
async function updateProduct(_id, newData) {
    return Product.findByIdAndUpdate(_id, newData, { returnDocument: "after" }).exec();
}


/**
 * Deletes the product with the given ID.
 * @param {string} _id The id of the product to delete 
 * @returns {Promise<Product>} A promise of the document deleted (if available)
 */
function deleteProduct(_id) {
    return Product.findOneAndDelete(_id).exec();
}

const ProductRepo = {
    findAll, findProductById, createProduct, updateProduct, deleteProduct
};

export default ProductRepo;