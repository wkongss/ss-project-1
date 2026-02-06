import { useEffect, useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal";

import type { IUnit } from "../../helpers/api/units.api";
import type { IProduct } from "../../helpers/api/products.api";
import { getAllProducts } from "../../helpers/api/products.api";

interface UpdateInventoryModalProps {
    oldData: IUnit,
    show: boolean,
    handleClose: () => void,
    handleConfirm: (data: IUnit) => Promise<void>
}

/**
 * Represents a modal for updating a unit in a warehouse
 */
export default function UpdateInventoryModal({ oldData, show, handleClose, handleConfirm }: UpdateInventoryModalProps) {
    const [productList, setProductList] = useState<IProduct[]>([]);
    const [product, setProduct] = useState(oldData?.product);
    const [quantity, setQuantity] = useState(oldData?.quantity);
    const [location, setLocation] = useState(oldData?.location);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        getAllProducts()
            .then((res) => {
                setProductList(res);
            });
    }, []);

    useEffect(() => {
        setProduct(oldData?.product);
        setQuantity(oldData?.quantity);
        setLocation(oldData?.location);
        setErrorMessage("");
    }, [oldData])

    async function handleSubmit() {
        const data = {
            ...oldData,
            product: product,
            quantity: quantity,
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
                <Modal.Title>{`Update ${oldData?.product.name}`}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

                <Form>
                    <Form.Group className="mb-3" controlId="formProduct">
                        <Form.Label>Product</Form.Label>
                        <Form.Select
                            value={product?.sku}
                            onChange={(e) => {
                                const selected = productList.find(p => p.sku === e.target.value);
                                if (selected) {
                                    setProduct(selected)
                                };
                            }}
                        >
                            {productList.map((p) => (
                                <option key={p._id} value={p.sku}>
                                    {p.name} ({p.sku})
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formQuantity">
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            min={0}
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