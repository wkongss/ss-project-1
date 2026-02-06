import { useEffect, useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal";

import type { IUnit } from "../../helpers/api/units.api";
import type { IProduct } from "../../helpers/api/products.api";
import { getAllProducts } from "../../helpers/api/products.api";
import type { IWarehouse } from "../../helpers/api/warehouses.api";

interface CreateInventoryModalProps {
    warehouse: IWarehouse,
    show: boolean,
    handleClose: () => void,
    handleConfirm: (data: IUnit) => Promise<void>
}

/**
 * Represents a modal for updating a unit in a warehouse
 */
export default function CreateInventoryModal({ warehouse, show, handleClose, handleConfirm }: CreateInventoryModalProps) {
    const [productList, setProductList] = useState<IProduct[]>([]);
    const [product, setProduct] = useState<IProduct | undefined>(undefined);
    const [quantity, setQuantity] = useState(0);
    const [location, setLocation] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        getAllProducts()
            .then((res) => {
                setProductList(res);
            });
    }, []);

    useEffect(() => {
        setQuantity(0);
        setProduct(undefined);
        setLocation("");
        setErrorMessage("");
    }, [show])

    async function handleSubmit() {
        if (!product) {
            throw new Error("Please choose a product to add!");
        }

        const data = {
            _id: "",
            warehouse: warehouse,
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
                <Modal.Title>{`New ${warehouse?.name} stock`}</Modal.Title>
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
                <Button variant="success" onClick={handleSubmit}>
                    Create
                </Button>
            </Modal.Footer>
        </Modal>
    );
}