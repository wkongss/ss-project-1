import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./components/layouts/Layout";

import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    {/* <Route index element={<Dashboard />} /> */}

                    <Route path="warehouses" element={<p>A</p> } >
                        {/* <Route index element={<WarehousePage />} />
                        <Route path=":id" element={<UnitPage />} /> */}
                    </Route>

                    <Route path="catalog" element={<p>B</p> } >
                        {/* <Route index element={<WarehousePage />} />
                        <Route path=":id" element={<UnitPage />} /> */}
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}