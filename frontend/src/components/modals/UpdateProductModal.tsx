import { useEffect, useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal";

import type { IProduct } from "../../helpers/api/products.api";

interface CreateProductModalProps {
    oldData: IProduct,
    show: boolean,
    handleClose: () => void,
    handleConfirm: (data: IProduct) => Promise<void>
}

/**
 * Represents a modal for updating a warehouse
 */
export default function CreateProductModal({ oldData, show, handleClose, handleConfirm }: CreateProductModalProps) {
    const [sku, setSku] = useState(oldData?.sku);
    const [name, setName] = useState(oldData?.name);
    const [description, setDescription] = useState(oldData?.description);
    const [tags, setTags] = useState(oldData?.tags?.join(", "));
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        setSku(oldData?.sku);
        setName(oldData?.name);
        setDescription(oldData?.description);
        setTags(oldData?.tags?.join(", "));
        setErrorMessage("");
    }, [show])

    async function handleSubmit() {
        const data = {
            _id: "",
            sku: sku,
            name: name,
            description: description,
            tags: tags.split(",")
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
                        <Form.Label>SKU</Form.Label>
                        <Form.Control
                            type="text"
                            value={sku}
                            onChange={(e) => setSku(e.target.value)}
                        />
                    </Form.Group>
                    
                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Tags</Form.Label>
                        <Form.Control
                            type="text"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
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