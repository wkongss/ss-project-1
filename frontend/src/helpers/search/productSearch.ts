import type { IProduct } from "../api/products.api";

/**
 * Parses the queries and then filters the given productList
 * @param productList A list of units to filter
 * @param queries The search parameters
 */
export default function productSearch(productList: IProduct[], queries: string) : IProduct[] {
    const filters = queries.toLowerCase().trim().split(/\s+/);
    
    return productList.filter((e) => {
        return filters.every((f) => {
            const searchString = `$${e.sku} ${e.name} ${e.description} ${e.tags}`.toLowerCase();
            return searchString.includes(f);
        });
    });
}