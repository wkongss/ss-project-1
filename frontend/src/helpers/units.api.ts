import type { IWarehouse } from "./warehouses.api";
import type { IProduct } from "./products.api";

/**
 * Unit object type
 */
export interface IUnit {
    warehouse: IWarehouse,
    product: IProduct,
    quantity: number,
    location?: string
};

const baseUrl = "http:/localhost:8080/api/v1/units";

/**
 * Fetches a list of all Units
 */
export async function getAllUnits(): Promise<IUnit[]> {
    const res = await fetch(baseUrl);

    if (res.ok) {
        return await res.json();
    }

    return [];
}

/**
 * Fetches a populated Unit object with given id
 */
export async function getUnitById(id: string): Promise<IUnit | null> {
    const res = await fetch(`${baseUrl}/${id}`);

    if (res.ok) {
        return await res.json();
    }

    return null;
}

/**
 * Fetches all populated Unit objects with given product id
 */
export async function getUnitsByProduct(id: string): Promise<IUnit[]> {
    const res = await fetch(`${baseUrl}?product=${id}`);

    if (res.ok) {
        return await res.json();
    }

    return [];
}

/**
 * Fetches all populated Unit objects with given warehouse id
 */
export async function getUnitsByWarehouse(id: string): Promise<IUnit[]> {
    const res = await fetch(`${baseUrl}?warehouse=${id}`);

    if (res.ok) {
        return await res.json();
    }

    return [];
}

/**
 * Creates and returns a new Unit
 */
export async function createUnit(data: IUnit): Promise<IUnit | null> {
    const res = await fetch(baseUrl, { 
        method: "POST", 
        body: JSON.stringify(data) 
    });

    if (res.ok) {
        return await res.json();
    }

    return null;
}

/**
 * Updates and returns a unit
 */
export async function updateUnit(data: IUnit): Promise<IUnit | null> {
    const res = await fetch(baseUrl, { 
        method: "PUT", 
        body: JSON.stringify(data) 
    });

    if (res.ok) {
        return await res.json();
    }

    return null;
}

/**
 * Deletes a Unit with given id
 */
export async function deleteUnit(id: string): Promise<boolean> {
    const res = await fetch(`${baseUrl}/${id}`, { method: "DELETE" });
    
    return res.ok;
}