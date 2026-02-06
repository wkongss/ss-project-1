import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./layouts/Layout";
import WarehouseLayout from "./layouts/WarehouseLayout";
import WarehouseDetails from "./details/WarehouseDetails";
import NoWarehouseSelected from "./details/NoWarehouseSelected";

import "bootstrap/dist/css/bootstrap.min.css";
// import WarehouseLayout from "./pages/WarehousePage";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<h2>404 Not Found</h2>} />
                    <Route path="warehouses" element={<WarehouseLayout />}>
                        <Route index element={<NoWarehouseSelected />} />
                        <Route path=":id" element={<WarehouseDetails />} />
                    </Route>
                    <Route path="catalog" element={<h2>404 Not Found</h2>} />
                    {/* <Route path="catalog" element={<ProductLayout />}>
                        <Route index element={<NoProductSelected />} />
                        <Route path=":id" element={<ProductDetails />} />
                    </Route> */}
                </Route>
            </Routes>
        </BrowserRouter>
    );
}