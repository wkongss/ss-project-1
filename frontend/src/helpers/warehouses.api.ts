import type { IUnit } from "./units.api";

/**
 * Warehouse object type
 */
export interface IWarehouse {
    _id: string,
    name: string,
    location: string,
    capacity: number,
    currentCapacity: number,
    unitList?: IUnit[]
};

/**
 * Defines how a transfer request body is structured
 */
export interface ITransfer {
    source: string,
    destination: string,
    unit: string,
    quantity: number
}

const baseUrl = "http:/localhost:8080/api/v1/warehouses";

/**
 * Fetches a list of all warehouses
 */
export async function getAllWarehouses(): Promise<IWarehouse[]> {
    const res = await fetch(baseUrl);

    if (res.ok) {
        return await res.json();
    }

    return [];
}

/**
 * Fetches a populated warehouse object with given id
 */
export async function getWarehouseById(id: string): Promise<IWarehouse | null> {
    const res = await fetch(`${baseUrl}/${id}`);

    if (res.ok) {
        return await res.json();
    }

    return null;
}

/**
 * Creates and returns a new warehouse
 */
export async function createWarehouse(data: IWarehouse): Promise<IWarehouse | null> {
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
 * Updates and returns a warehouse
 */
export async function updateWarehouse(data: IWarehouse): Promise<IWarehouse | null> {
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
 * Deletes a warehouse with given id
 */
export async function deleteWarehouse(id: string): Promise<boolean> {
    const res = await fetch(`${baseUrl}/${id}`, { method: "DELETE" });
    
    return res.ok;
}

/**
 * Transfers units between warehouses
 */
export async function transfer(body: ITransfer): Promise<IWarehouse[]> {
    const res = await fetch(`${baseUrl}/transfer`, { 
        method: "POST", 
        body: JSON.stringify(body) 
    });

    if (res.ok) {
        return await res.json();
    }

    return [];
}