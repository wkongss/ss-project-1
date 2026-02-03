import Activity from "../models/activity.model.js";
import { Types, Document } from "mongoose";

/**
 * Finds and returns all activities in the database
 * @returns {Query<Activity>} A promise containing all activities
 */
function findAll() {
    return Activity.find();
}

/**
 * Finds and returns the `limit` most recent activities in the database
 * @param {Number} limit the maximum number of activities to return
 * @returns {Query<Activity>} A promise containing the most recent activities
 */
function findMostRecent(limit) {
    return Activity
        .find({ sort: { createdAt: -1 } })
        .limit(limit);
}

/**
 * Creates a new activity with given data
 * @param {{ type: string, affected: Types.ObjectId[], description?: string }} data 
 * @returns {Promise<Document>} The document for the new activity created
 */
function createActivity(data) {
    return Activity.create(data);
}

/**
 * Repo for Activities
 */
const ActivityRepo = {
    findAll, findMostRecent, createActivity
};

export default ActivityRepo;