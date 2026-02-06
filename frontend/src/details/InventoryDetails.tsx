import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { PlusCircleFill } from "react-bootstrap-icons";
import { getWarehouseById, transfer, type ITransfer, type IWarehouse } from "../helpers/api/warehouses.api";
import { createUnit, deleteUnit, getUnitsByWarehouse, updateUnit, type IUnit } from "../helpers/api/units.api";
import inventorySearch from "../helpers/search/inventorySearch";
import nestedAccess from "../helpers/search/nestedAccess";

import UnitActionRow from "../components/elements/UnitActionRow";
import SortableHeader from "../components/elements/SortableHeader";
import ConfirmModal from "../components/modals/ConfirmModal";
import UpdateInventoryModal from "../components/modals/UpdateInventoryModal";
import TransferModal from "../components/modals/TransferModal";
import CreateInventoryModal from "../components/modals/CreateInventoryModal";

interface InventoryDetailsProps {
    warehouse: IWarehouse,
    setWarehouse: (warehouse: IWarehouse) => void
}

export default function InventoryDetails({ warehouse, setWarehouse }: InventoryDetailsProps) {
    const [unitList, setUnitList] = useState<IUnit[]>([]);
    const [filteredList, setFilteredList] = useState<IUnit[]>([]);
    const [sortedList, setSortedList] = useState<IUnit[]>([]);
    const [activeUnit, setActiveUnit] = useState<IUnit | undefined>(undefined);
    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState("");
    const [sortParam, setSortParam] = useState("product.sku");
    const [sortDir, setSortDir] = useState(1);

    useEffect(() => {
        getUnitsByWarehouse(warehouse._id)
            .then((data) => {
                setUnitList(data);
            });
    }, [warehouse]);

    useEffect(() => {
        setFilteredList(inventorySearch(unitList, filters));
    }, [unitList, filters]);

    useEffect(() => {
        setSortedList(() => {
            return filteredList.toSorted((a: any, b: any) => {
                const param1 = nestedAccess(a, sortParam);
                const param2 = nestedAccess(b, sortParam);

                if (param1 == null) {
                    return sortDir;
                } else if (param2 == null) {
                    return -sortDir;
                }

                if (typeof param1 === "string") {
                    return sortDir * param1.localeCompare(param2);
                }

                return sortDir * (param1 - param2);
            })
        });
    }, [filteredList, sortParam, sortDir]);

    // Handles display of confirmation modal
    const [showUnitDeleteModal, setShowUnitDeleteModal] = useState(false);

    /**
     * Callback function for on delete confirmation
     */
    async function handleUnitDelete(id: string) {
        await deleteUnit(id);
        setWarehouse(await getWarehouseById(warehouse._id));
        setShowUnitDeleteModal(false);
    }

    // Handles display of unit edit modal
    const [showUnitEditModal, setShowUnitEditModal] = useState(false);

    /**
     * Callback function for unit editing
     */
    async function handleUnitEdit(data: IUnit) {
        await updateUnit(data);
        setWarehouse(await getWarehouseById(warehouse._id));
        setShowUnitEditModal(false);
    }


    // Handles display of unit create modal
    const [showUnitCreateModal, setShowUnitCreateModal] = useState(false);

    /**
     * Callback function for creating units
     */
    async function handleUnitCreate(data: IUnit) {
        await createUnit(data);
        setWarehouse(await getWarehouseById(warehouse._id));
        setShowUnitCreateModal(false);
    }

    // Handles display of transfer modal
    const [showTransferModal, setShowTransferModal] = useState(false);

    /**
     * Callback function for unit transfers
     */
    async function handleTransfer(data: ITransfer) {
        await transfer(data);
        setWarehouse(await getWarehouseById(warehouse._id));
        setShowTransferModal(false);
    }

    return (
        <>
            <Container fluid className="p-0 m-0 mt-5">
                <Row>
                    <Col>
                        <Form action={"#"} onSubmit={(e) => {
                            e.preventDefault();
                            setFilters(search);
                        }}
                        >
                            <Form.Group className="mb-3" controlId="formSearch">
                                <Form.Control
                                    value={search}
                                    onChange={(e) => {
                                        setSearch(e.target.value);
                                        if (!e.target.value) {
                                            setFilters("");
                                        }
                                    }}
                                    min={0}
                                    placeholder="Search"
                                />
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col className="d-flex justify-content-between align-items-start">
                        <Button onClick={() => setFilters(search)}>
                            Search
                        </Button>
                        <Button
                            className="d-flex justify-content-center align-items-center gap-2"
                            onClick={() => setShowUnitCreateModal(true)}
                        >
                            Item
                            <PlusCircleFill />
                        </Button>
                    </Col>
                </Row>
            </Container>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <SortableHeader
                            setParams={(asc) => {
                                setSortDir(asc);
                                setSortParam("product.sku");
                            }}>SKU</SortableHeader>
                        <SortableHeader
                            setParams={(asc) => {
                                setSortDir(asc);
                                setSortParam("product.name");
                            }}>Name</SortableHeader>
                        <SortableHeader
                            setParams={(asc) => {
                                setSortDir(asc);
                                setSortParam("product.description");
                            }}>Description</SortableHeader>
                        <th>Tags</th>
                        <SortableHeader
                            setParams={(asc) => {
                                setSortDir(asc);
                                setSortParam("quantity");
                            }}>
                            Quantity</SortableHeader>
                        <SortableHeader setParams={(asc) => {
                            setSortDir(asc);
                            setSortParam("location");
                        }}>Location</SortableHeader>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedList.map((e) => {
                        return (
                            <tr key={`tr-${e._id}`}>
                                <td>{e.product.sku}</td>
                                <td>{e.product.name}</td>
                                <td>{e.product.description}</td>
                                <td>{e.product.tags.join(", ")}</td>
                                <td>{e.quantity}</td>
                                <td>{e.location}</td>
                                <td>
                                    <UnitActionRow
                                        setActive={() => setActiveUnit(e)}
                                        showEditModal={() => setShowUnitEditModal(true)}
                                        showDeleteModal={() => setShowUnitDeleteModal(true)}
                                        showTransferModal={() => { setShowTransferModal(true) }}
                                    />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>

            <ConfirmModal
                show={showUnitDeleteModal}
                message={`Are you sure you want to delete all ${activeUnit?.product?.name} at ${warehouse.name}?`}
                handleClose={() => setShowUnitDeleteModal(false)}
                handleConfirm={() => handleUnitDelete(activeUnit!._id)} />

            <UpdateInventoryModal
                show={showUnitEditModal}
                oldData={activeUnit!}
                handleClose={() => setShowUnitEditModal(false)}
                handleConfirm={(data) => handleUnitEdit(data)}
            />

            <CreateInventoryModal
                show={showUnitCreateModal}
                warehouse={warehouse}
                handleClose={() => setShowUnitCreateModal(false)}
                handleConfirm={(data) => handleUnitCreate(data)}
            />

            <TransferModal
                show={showTransferModal}
                source={warehouse}
                unit={activeUnit!}
                handleClose={() => setShowTransferModal(false)}
                handleConfirm={(data) => handleTransfer(data)}
            />
        </>
    );
}