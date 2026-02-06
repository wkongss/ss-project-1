import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { getWarehouseById, transfer, type ITransfer, type IWarehouse } from "../helpers/api/warehouses.api";
import { createUnit, deleteUnit, getUnitsByWarehouse, updateUnit, type IUnit } from "../helpers/api/units.api";

import UnitActionRow from "../components/elements/UnitActionRow";
import ConfirmModal from "../components/modals/ConfirmModal";
import UpdateInventoryModal from "../components/modals/UpdateInventoryModal";
import TransferModal from "../components/modals/TransferModal";
import { PlusSquareFill } from "react-bootstrap-icons";

interface InventoryDetailsProps {
    warehouse: IWarehouse,
    setWarehouse: (warehouse: IWarehouse) => void
}

export default function InventoryDetails({ warehouse, setWarehouse }: InventoryDetailsProps) {
    const [unitList, setUnitList] = useState<IUnit[]>([]);
    const [activeUnit, setActiveUnit] = useState<IUnit | undefined>(undefined);
    const [search, setSearch] = useState("");

    useEffect(() => {
        getUnitsByWarehouse(warehouse._id)
            .then((data) => {
                setUnitList(data);
            });
    }, [warehouse]);

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
                        <Form>
                            <Form.Group className="mb-3" controlId="formQuantity">
                                <Form.Control
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    min={0}
                                    placeholder="Search"
                                />
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col>
                        <Button>
                            Search
                        </Button>
                    </Col>
                </Row>
            </Container>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>SKU</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Tags</th>
                        <th>Quantity</th>
                        <th>Location</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {unitList.map((e) => {
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