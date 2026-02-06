import type { IUnit } from "../api/units.api";

/**
 * Parses the queries and then filters the given unitList
 * @param unitList A list of units to filter
 * @param queries The search parameters
 */
export default function inventorySearch(unitList: IUnit[], queries: string) : IUnit[] {
    
    const filters = queries.toLowerCase().trim().split(/\s+/);
    const res = [...unitList];
    return res.filter((e) => {

        // Parses out the numerical values from the warehouse location field
        const numerics: any = { quantity: e.quantity };
        if (e.location != null) {
            let [...arr] = e.location.split("-");
            
            for (let s of arr) {
                const match = s.toLowerCase().match(/(z|a|b|l|p)(\d{1,3})/);
                if (match) {
                    numerics[match[1]] = parseInt(match[2]);
                }
            }
        }

        return filters.every((f) => {
            // Parses search queries for numeric filters + aliases
            const ops = f.match(/^(z|zone|a|aisle|b|bay|l|level|p|position|q|qty|quantity|amt|amount)(<=|>=|<|>|==)(\d+)$/);

            if (ops) {
                let [_, op1, op2, op3] = ops;
                const opNum = parseInt(op3);

                // Coerces aliases into a single field
                switch (op1) {
                    case "zone":
                        op1 = "z";
                        break;
                    case "aisle":
                        op1 = "a";
                        break;
                    case "bay":
                        op1 = "b";
                        break;
                    case "level":
                        op1 = "l";
                        break;
                    case "position":
                        op1 = "p";
                        break;
                    case "q":
                    case "qty":
                    case "amt":
                    case "amount":
                        op1 = "quantity"
                        break;
                }

                // Checks numeric values
                if (numerics[op1] != null) {
                    switch(op2) {
                        case "<":
                            return numerics[op1] < opNum;
                        case "<=":
                            return numerics[op1] <= opNum;
                        case "==":
                            return numerics[op1] == opNum;
                        case ">=":
                            return numerics[op1] >= opNum;
                        case ">":
                            return numerics[op1] > opNum;
                    }
                }
            } else {
                // For non numeric values, searches the relevant string tags for an exact substring.
                return `${e.product.sku} ${e.product.description} ${e.product.name} ${e.location} ${e.product.tags}`
                    .toLowerCase()
                    .includes(f);
            }
        });
    })
}