import type { IWarehouse } from "./warehouses.api"

/**
 * Activity object type
 */
export interface IActivity {
    _id: string,
    action: string,
    affected: IWarehouse[],
    description?: string,
    createdAt: string
}

const baseUrl = "http://localhost:8080/api/v1/activities";

export async function getRecentActivity(limit: number): Promise<IActivity[]>{
    const res = await fetch(`${baseUrl}/${limit}`);
    const data = await res.json();

    if (res.ok) {
        return data;
    }

    throw new Error(data.message);
}