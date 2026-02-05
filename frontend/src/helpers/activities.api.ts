import type { IWarehouse } from "./warehouses.api"

/**
 * Activity object type
 */
export interface IActivity {
    _id: string,
    type: string,
    affected: IWarehouse[],
    description?: string
}

const baseUrl = "http://localhost:8080/api/v1/activities";

export async function getRecentActivity(limit: number): Promise<IActivity[]>{
    const res = await fetch(`${baseUrl}/${limit}`);

    if (res.ok) {
        return await res.json();
    }

    return [];
}