import type { IWarehouse } from "./warehouses.api";
import type { IProduct } from "./products.api";

/**
 * Unit object type
 */
export interface IUnit {
    _id: string,
    warehouse: IWarehouse,
    product: IProduct,
    quantity: number,
    location?: string
};

const baseUrl = "http://localhost:8080/api/v1/units";

/**
 * Fetches a list of all Units
 */
export async function getAllUnits(): Promise<IUnit[]> {
    const res = await fetch(baseUrl);
    const data = await res.json();

    if (res.ok) {
        return data;
    }

    throw new Error(data.message);
}

/**
 * Fetches a populated Unit object with given id
 */
export async function getUnitById(id: string): Promise<IUnit> {
    const res = await fetch(`${baseUrl}/${id}`);
    const data = await res.json();

    if (res.ok) {
        return data;
    }

    throw new Error(data.message);
}

/**
 * Fetches all populated Unit objects with given product id
 */
export async function getUnitsByProduct(id: string): Promise<IUnit[]> {
    const res = await fetch(`${baseUrl}?product=${id}`);
    const data = await res.json();

    if (res.ok) {
        return data;
    }

    throw new Error(data.message);
}

/**
 * Fetches all populated Unit objects with given warehouse id
 */
export async function getUnitsByWarehouse(id: string): Promise<IUnit[]> {
    const res = await fetch(`${baseUrl}?warehouse=${id}`);
    const data = await res.json();

    if (res.ok) {
        return data;
    }

    throw new Error(data.message);
}

/**
 * Creates and returns a new Unit
 */
export async function createUnit(unit: IUnit): Promise<IUnit> {
    const res = await fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ...unit,
            warehouse: unit.warehouse._id,
            product: unit.product._id
        })
    });
    const data = await res.json();

    if (res.ok) {
        return data;
    }

    throw new Error(data.message);
}

/**
 * Updates and returns a unit
 */
export async function updateUnit(unit: IUnit): Promise<IUnit> {
    const res = await fetch(baseUrl, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ...unit,
            warehouse: unit.warehouse._id,
            product: unit.product._id
        })
    });
    const data = await res.json();

    if (res.ok) {
        return data;
    }

    throw new Error(data.message);
}

/**
 * Deletes a Unit with given id
 */
export async function deleteUnit(id: string): Promise<boolean> {
    const res = await fetch(`${baseUrl}/${id}`, { method: "DELETE" });

    return res.ok;
}