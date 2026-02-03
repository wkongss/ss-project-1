import mongoose, { Schema } from "mongoose";

// Schema that represents a unique product type
// sku: unique product identifier
// name: product name
// description: product description
const productSchema = new Schema({
    sku: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },
    
    description: {
        type: String,
        default: "No description"
    },

    tags: {
        type: [String],
        default: []
    }
});

const Product = mongoose.model("Product", productSchema, "products");

export default Product;