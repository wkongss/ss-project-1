import { useEffect, useState } from "react";
import { Outlet } from "react-router";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { PlusCircleFill } from "react-bootstrap-icons";

import { getAllProducts, createProduct, type IProduct } from "../helpers/api/products.api";
import CatalogSidebar from "../components/elements/CatalogSidebar";
import CreateProductModal from "../components/modals/CreateProductModal";

/**
 * Manages the layout and components of the /catalog page
 */
export default function CatalogLayout() {
    const [productList, setProductList] = useState<IProduct[]>([]);
    const [selected, setSelected] = useState("");

    /**
     * Repopulates Product array
     */
    async function refreshCatalog() {
        const data = await getAllProducts();
        setProductList(data);
    };

    /**
     * Resets selection when current Product is deleted
     */
    async function resetSelected() {
        setSelected("");
    }

    useEffect(() => {
        refreshCatalog();
    }, []);

    // Handles display of Product create modal
    const [showProductCreateModal, setShowProductCreateModal] = useState(false);

    /**
     * Callback function for creating Products
     */
    async function handleProductCreate(data: IProduct) {
        const newData = await createProduct(data);
        setProductList((state) => {
            return [...state, newData];
        });
        setShowProductCreateModal(false);
    }

    return (
        <>
            <Container className="p-3">
                <Row>
                    <Col md={3}>
                        <Row>
                            <Col>
                                <h3>Products</h3>
                            </Col>
                            <Col className="d-flex justify-content-end">
                                <Button 
                                    className="d-flex align-items-center justify-content-center circle-rounded gap-2"
                                    onClick={() => setShowProductCreateModal(true)}
                                >
                                    New
                                    <PlusCircleFill />
                                </Button>
                            </Col>
                        </Row>
                        <CatalogSidebar
                            products={productList}
                            selected={selected}
                            handleSelection={(index: string) => setSelected(index)}
                        />
                    </Col>
                    <Col md={9}>
                        <Outlet context={{ refreshCatalog, resetSelected }} />
                    </Col>
                </Row>
            </Container>

            <CreateProductModal
                show={showProductCreateModal}
                handleClose={() => setShowProductCreateModal(false)}
                handleConfirm={(data) => handleProductCreate(data)}
            />
        </>
    );
}