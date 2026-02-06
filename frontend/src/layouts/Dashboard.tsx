import { useState, useEffect } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";

import { getAllWarehouses, type IWarehouse } from "../helpers/api/warehouses.api";
import { getRecentActivity, type IActivity } from "../helpers/api/activities.api";
import BarGraph from "../components/elements/BarGraph";

/**
 * Dashboard for displaying aggregate data, alerts, and log
 */
export default function Dashboard() {
    const [warehouseList, setWarehouseList] = useState<IWarehouse[]>([]);
    const [log, setLog] = useState<IActivity[]>([]);

    useEffect(() => {
        getAllWarehouses()
            .then((data) => {
                setWarehouseList(data.toSorted((a, b) => {
                    return b.capacity - a.capacity;
                }));
            });

        getRecentActivity(5)
            .then((data) => {
                setLog(data);
            });
    }, []);

    /**
     * Maps an Activity type to a log color
     */
    function logTypeMap(type: string): string {
        switch (type) {
            case "create":
                return "success"
            case "update":
                return "primary"
            case "delete":
                return "danger"
            case "transfer":
                return "info"
        }

        return "secondary";
    }

    return (
        <>
            <Container className="p-3">
                <Row>
                    <Col md={6}>
                        <h2>Dashboard</h2>
                        <div className="d-flex flex-column justify-content-center align-items-center text-center">
                            <BarGraph warehouseList={warehouseList}/>
                        </div>
                    </Col>
                    <Col md={6}>
                        <Row className="p-3">
                            <h4>Logs</h4>
                            {
                                log.map((e) => {
                                    return (
                                        <Alert variant={logTypeMap(e.action)} className="p-2 m-1">
                                            <Alert.Heading className="h6">{e.action.toUpperCase()}</Alert.Heading>
                                            <p className="small">
                                                Involved IDs: {e.affected.join(", ")}
                                                <br />
                                                Time: {e.createdAt}
                                            </p>
                                        </Alert>
                                    )
                                })
                            }
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    );
}