/**
 * Product object type
 */
export interface IProduct {
    _id: string,
    sku: string,
    name: string,
    description?: string,
    tags: string[]
};

const baseUrl = "http://localhost:8080/api/v1/products";

/**
 * Fetches a list of all Products
 */
export async function getAllProducts(): Promise<IProduct[]> {
    const res = await fetch(baseUrl);
    const data = await res.json();

    if (res.ok) {
        return data;
    }

    throw new Error(data.message);
}

/**
 * Fetches a populated Product object with given id
 */
export async function getProductById(id: string): Promise<IProduct> {
    const res = await fetch(`${baseUrl}/${id}`);
    const data = await res.json();

    if (res.ok) {
        return data;
    }

    throw new Error(data.message);
}

/**
 * Creates and returns a new Product
 */
export async function createProduct(product: IProduct): Promise<IProduct> {
    const { _id, ...rest } = product;
    const res = await fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(rest)
    });
    const data = await res.json();

    if (res.ok) {
        return data;
    }

    throw new Error(data.message);
}

/**
 * Updates and returns a Product
 */
export async function updateProduct(product: IProduct): Promise<IProduct> {
    const { _id, ...rest } = product;
    const res = await fetch(baseUrl, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(rest)
    });

    const data = await res.json();

    if (res.ok) {
        return data;
    }

    throw new Error(data.message);
}

/**
 * Deletes a Product with given id
 */
export async function deleteProduct(id: string): Promise<boolean> {
    const res = await fetch(`${baseUrl}/${id}`, { method: "DELETE" });

    return res.ok;
}