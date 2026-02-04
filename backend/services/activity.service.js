import ActivityRepo from "../repos/activity.repo.js";
import Activity from "../models/activity.model.js";

/**
 * Gets all activities
 * @returns {Promise<Activity[]>} A promise containing activity data
 */
async function findAll() {
    return await ActivityRepo.findAll();
}

/**
 * Gets the most recent activities, sorted by newest to oldest
 * @param {number} limit The number of activities to fetch
 * @returns {Promise<Activity[]>} A promise containing activity data
 */
async function findMostRecent(limit) {
    return await ActivityRepo.findMostRecent(limit);
}

const ActivityService = {
    findAll, findMostRecent
};

export default ActivityService;