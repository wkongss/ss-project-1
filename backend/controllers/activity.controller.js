import ActivityService from "../services/activity.service.js";

/**
 * Handles GET /api/v1/activities/
 */
async function getAll(_, res) {
    const data = await ActivityService.findAll();

    return res.status(200).json(data);
}

/**
 * Handles GET /api/v1/activities/:limit
 */
async function getMostRecent(req, res) {
    const { limit } = req.params;
    const data = ActivityService.findMostRecent(limit);

    return res.status(200),json(data);
}

const ActivityController = {
    getAll, getMostRecent
};

export default ActivityController;