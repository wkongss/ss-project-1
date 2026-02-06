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

const baseUrl = "http://localhost:8080/api/v1/warehouses";

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
export async function getWarehouseById(id: string): Promise<IWarehouse> {
    const res = await fetch(`${baseUrl}/${id}`);
    const data = await res.json();

    if (res.ok) {
        return data;
    }

    throw new Error(data.message);
}

/**
 * Creates and returns a new warehouse
 */
export async function createWarehouse(warehouse: IWarehouse): Promise<IWarehouse> {
    const res = await fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(warehouse)
    });
    const data = await res.json();

    if (res.ok) {
        return data;
    }

    throw new Error(data.message);
}

/**
 * Updates and returns a warehouse
 */
export async function updateWarehouse(warehouse: IWarehouse): Promise<IWarehouse> {
    const res = await fetch(baseUrl, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(warehouse)
    });
    const data = await res.json();

    if (res.ok) {
        return data;
    }

    throw new Error(data.message);
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
    console.log(body);
    const res = await fetch(`${baseUrl}/transfer`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });
    const data = await res.json();

    if (res.ok) {
        return data;
    }

    throw new Error(data.message);
}