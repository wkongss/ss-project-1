import { useEffect, useState } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { getAllWarehouses, type IWarehouse } from "../helpers/api/warehouses.api";
import WarehouseSidebar from "../components/elements/WarehouseSidebar";
import { Outlet } from "react-router";
import { PlusCircle, PlusCircleFill } from "react-bootstrap-icons";

/**
 * Manages the layout and components of the /warehouse page
 */
export default function WarehouseLayout() {
    const [warehouseList, setWarehouseList] = useState<IWarehouse[]>([]);
    const [selected, setSelected] = useState("");

    useEffect(() => {
        getAllWarehouses()
            .then((data) => {
                setWarehouseList(data);
            })
    }, []);

    return (
        <Container className="p-3">
            <Row>
                <Col md={3}>
                    <Row>
                        <Col>
                            <h3>Warehouses</h3>
                        </Col>
                        <Col className="d-flex justify-content-end">
                            <Button className="d-flex align-items-center justify-content-center circle-rounded">
                                <PlusCircleFill />
                            </Button>
                        </Col>
                    </Row>
                    <WarehouseSidebar
                        warehouses={warehouseList}
                        selected={selected}
                        handleSelection={(index: string) => setSelected(index)}
                    />
                </Col>
                <Col md={9}>
                    <Outlet />
                </Col>
            </Row>
        </Container>
    );
}