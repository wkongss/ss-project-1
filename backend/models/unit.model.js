import mongoose, { Schema, Types } from "mongoose";

// Schema that represents a warehouses's stock of a product
// product: product type stored
// warehouse: warehouse product is stored in
// quantity: quantity stored in warehouse
// location: zone-aisle-bay-level-position of item
const unitSchema = new Schema({
    product: {
        type: Types.ObjectId,
        ref: "Product",
        required: true
    },

    warehouse: {
        type: Types.ObjectId,
        ref: "Warehouse",
        required: true
    },

    quantity: {
        type: Number,
        required: true,
        min: 0
    },

    location: {
        type: String,
        match: /Z\d{3}-A\d{3}-B\d{3}-L\d{1,3}-P\d{1,3}/
    }
});

const Unit = mongoose.model("Unit", unitSchema, "units");

export default Unit;