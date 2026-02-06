import { useEffect, useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal";

import type { IWarehouse } from "../../helpers/api/warehouses.api";

interface UpdateInventoryModalProps {
    oldData: IWarehouse,
    show: boolean,
    handleClose: () => void,
    handleConfirm: (data: IWarehouse) => Promise<void>
}

/**
 * Represents a modal for updating a warehouse
 */
export default function UpdateInventoryModal({ oldData, show, handleClose, handleConfirm }: UpdateInventoryModalProps) {
    const [name, setName] = useState(oldData?.name);
    const [capacity, setCapacity] = useState(oldData?.capacity);
    const [location, setLocation] = useState(oldData?.location);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        setName(oldData?.name);
        setCapacity(oldData?.capacity);
        setLocation(oldData?.location);
        setErrorMessage("");
    }, [oldData])

    async function handleSubmit() {
        const data = {
            ...oldData,
            name: name,
            capacity: capacity,
            location: location
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
                <Modal.Title>{`Update ${oldData?.name}`}</Modal.Title>
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
                            min={1}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Update
                </Button>
            </Modal.Footer>
        </Modal>
    );
}