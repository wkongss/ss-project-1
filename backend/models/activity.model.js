import mongoose, { Schema, Types } from "mongoose";

// Schema that represents a transaction
// action: create | update | delete | transfer
// affected: warehouse IDs involved in the transaction
// description: description of transaction
// (implict) createdAt: timestamp for the activity
const activitySchema = new Schema({
    action: {
        type: String,
        required: true,
        enum: ["create", "update", "delete", "transfer"]
    },

    affected: {
        type: [Types.ObjectId],
        ref: "Warehouse",
        required: true
    },

    description: {
        type: String,
        required: true,
        default: "No description"
    }
}, { timestamps: true });

const Activity = mongoose.model("Activity", activitySchema, "activities");

export default Activity;