/**
 * Product object type
 */
export interface IProduct {
    _id: string,
    name: string,
    description?: string,
    tags: string[]
};

const baseUrl = "http:/localhost:8080/api/v1/products";

/**
 * Fetches a list of all Products
 */
export async function getAllProducts(): Promise<IProduct[]> {
    const res = await fetch(baseUrl);

    if (res.ok) {
        return await res.json();
    }

    return [];
}

/**
 * Fetches a populated Product object with given id
 */
export async function getProductById(id: string): Promise<IProduct | null> {
    const res = await fetch(`${baseUrl}/${id}`);

    if (res.ok) {
        return await res.json();
    }

    return null;
}

/**
 * Creates and returns a new Product
 */
export async function createProduct(data: IProduct): Promise<IProduct | null> {
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
 * Updates and returns a Product
 */
export async function updateProduct(data: IProduct): Promise<IProduct | null> {
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
 * Deletes a Product with given id
 */
export async function deleteProduct(id: string): Promise<boolean> {
    const res = await fetch(`${baseUrl}/${id}`, { method: "DELETE" });
    
    return res.ok;
}