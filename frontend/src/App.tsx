import { BrowserRouter, Routes, Route, Navigate } from "react-router";

import Layout from "./layouts/Layout";
import Dashboard from "./layouts/Dashboard";
import WarehouseLayout from "./layouts/WarehouseLayout";
import WarehouseDetails from "./details/WarehouseDetails";
import NoWarehouseSelected from "./details/NoWarehouseSelected";
import CatalogLayout from "./layouts/CatalogLayout";
import ProductDetails from "./details/ProductDetails";
import NoProductSelected from "./details/NoProductSelected";

import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="warehouses" element={<WarehouseLayout />}>
                        <Route index element={<NoWarehouseSelected />} />
                        <Route path=":id" element={<WarehouseDetails />} />
                    </Route>
                    <Route path="catalog" element={<CatalogLayout />}>
                        <Route index element={<NoProductSelected />} />
                        <Route path=":id" element={<ProductDetails />} />
                    </Route>
                </Route>
                <Route path="*" element={<Navigate to='/' replace />} />
            </Routes>
        </BrowserRouter>
    );
}