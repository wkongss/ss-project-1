import { useEffect, useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal";

import type { IWarehouse } from "../../helpers/api/warehouses.api";

interface CreateWarehouseModalProps {
    show: boolean,
    handleClose: () => void,
    handleConfirm: (data: IWarehouse) => Promise<void>
}

/**
 * Represents a modal for updating a warehouse
 */
export default function CreateInventoryModal({ show, handleClose, handleConfirm }: CreateWarehouseModalProps) {
    const [name, setName] = useState("");
    const [capacity, setCapacity] = useState(1);
    const [location, setLocation] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        setName("");
        setCapacity(1);
        setLocation("");
        setErrorMessage("");
    }, [show])

    async function handleSubmit() {
        const data = {
            _id: "",
            name: name,
            capacity: capacity,
            location: location,
            currentCapacity: 0
        };

        try {
            await handleConfirm(data);
        } catch (error) {
            if (error instanceof Error) {
                setErrorMessage(error.message);
            }
        }
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{`Create New Warehouse`}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

                <Form>
                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    
                    <Form.Group className="mb-3" controlId="formLocation">
                        <Form.Label>Location</Form.Label>
                        <Form.Control
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formQuantity">
                        <Form.Label>Capacity</Form.Label>
                        <Form.Control
                            type="number"
                            value={capacity}
                            onChange={(e) => setCapacity(Number(e.target.value))}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="success" onClick={handleSubmit}>
                    Create
                </Button>
            </Modal.Footer>
        </Modal>
    );
}