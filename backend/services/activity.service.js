import ActivityRepo from "../repos/activity.repo.js";

async function findAll() {
    return await ActivityRepo.findAll();
}

async function findMostRecent(limit) {
    return await ActivityRepo.findMostRecent(limit);
}

const ActivityService = {
    findAll, findMostRecent
};

export default ActivityService;