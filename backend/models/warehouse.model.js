import mongoose, { Schema } from "mongoose";

// Schema that represents a warehouse
// name: Name of the warehouse
// location: where the warehouse is located
// capacity: total warehouse unit capacity
const warehouseSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    capacity: {
        type: Number,
        required: true
    }
}, {
    toJSON: {
        virtuals: true
    }
});

// Virtual field: represents the warehouse inventory
warehouseSchema.virtual("unitList", {
    ref: "Unit",
    localField: "_id",
    foreignField: "warehouse",
});

// Virtual field: represents the current capacity of the warehouse
warehouseSchema.virtual("currentCapacity").get(function () {
    if (!this.unitList) {
        return 0;
    }

    return this.unitList.reduce((acc, e) => acc + e.quantity, 0);
});

const Warehouse = mongoose.model("Warehouse", warehouseSchema, "warehouses");

export default Warehouse;