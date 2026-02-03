import UnitRepo from "../repos/unit.repo.js";

async function findAll() {
    return await UnitRepo.findAll();
}

async function findUnitsByWarehouse(id) {
    return await UnitRepo.findUnitsByWarehouse(id);
}

async function findUnitsByProduct(id) {
    return await UnitRepo.findUnitsByProduct(id);
}

async function createUnit(data) {
    const { quantity } = data;

    if (quantity && quantity  )

    return await UnitRepo.createUnit(data);
}

async function updateUnit(data) {
    const { _id } = data;
    return await UnitRepo.updateUnit(_id, data);
}

async function deleteUnit(id) {
    return await UnitRepo.deleteUnit(id);
}

const UnitService = {
    findAll, findUnitsByWarehouse, findUnitsByProduct, createUnit, updateUnit, deleteUnit
};

export default UnitService;