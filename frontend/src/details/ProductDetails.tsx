import { useEffect, useState } from "react";
import { Link } from "react-router";
import Spinner from "react-bootstrap/Spinner";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { Table } from "react-bootstrap";
import { useParams, useOutletContext, useNavigate } from "react-router";
import { deleteProduct, getProductById, updateProduct, type IProduct } from "../helpers/api/products.api";

import ConfirmModal from "../components/modals/ConfirmModal";
import UpdateProductModal from "../components/modals/UpdateProductModal";
import ActionRow from "../components/elements/ActionRow";
import { getUnitsByProduct, type IUnit } from "../helpers/api/units.api";
import { BoxArrowUpRight } from "react-bootstrap-icons";

/**
 * Context item that re-render's parent's state
 */
interface ProductContext {
    refreshCatalog: () => Promise<void>,
    resetSelected: () => void
}

/**
 * Component that displays detailed Product information
 */
export default function ProductDetails() {
    const { id } = useParams();
    const [productData, setProductData] = useState<IProduct | undefined>(undefined);
    const [unitData, setUnitData] = useState<IUnit[] | undefined>(undefined);

    const navigate = useNavigate();
    const { refreshCatalog, resetSelected } = useOutletContext<ProductContext>();

    /**
     * Fetches all product data
     */
    useEffect(() => {
        getProductById(id!)
            .then((data) => {
                if (data) {
                    setProductData(data);
                }
            });

        getUnitsByProduct(id!)
            .then((data) => {
                if (data) {
                    setUnitData(data);
                }
            });
        return () => { setProductData(undefined) };
    }, [id]);

    // Handles display of confirmation modal
    const [showProductDeleteModal, setShowProductDeleteModal] = useState(false);

    /**
     * Callback function for on delete confirmation
     */
    async function handleProductDelete(id: string) {
        await deleteProduct(id);
        await refreshCatalog();
        resetSelected();
        console.log("Resetting");
        navigate("/catalog", { replace: true });
        console.log("Redirected");
        setShowProductDeleteModal(false);
        console.log("Modal closed")
    }

    // Handles display of Product edit modal
    const [showProductEditModal, setShowProductEditModal] = useState(false);

    /**
     * Callback function for unit editing
     */
    async function handleProductEdit(data: IProduct) {
        await updateProduct(data);
        await refreshCatalog();
        setProductData(data);
        setShowProductEditModal(false);
    }

    return (
        <>
            {
                productData ?
                    (
                        <div className="d-flex flex-column min-vh-50">
                            <h2 className="d-flex gap-2">
                                {productData.name}
                                <ActionRow
                                    showDeleteModal={() => setShowProductDeleteModal(true)}
                                    showEditModal={() => setShowProductEditModal(true)}
                                />
                            </h2>
                            <h5>{productData.sku}</h5>
                            <p className="mt-3">{productData.description}</p>

                            <Table>
                                <thead>
                                    <tr>
                                        <th>Warehouse Name</th>
                                        <th>Product Location</th>
                                        <th>Product Quantity</th>
                                        <th>View</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        unitData?.map((e) => {
                                            return (
                                                <tr>
                                                    <td>{e.warehouse.name}</td>
                                                    <td>{e.location}</td>
                                                    <td>{e.quantity}</td>
                                                    <td>
                                                        <Button
                                                            variant="outline-light"
                                                            className="rounded-circle border-0"
                                                            // I think the "as" prop is overloaded for Bootstrap
                                                            // I get red squiggles, but seems to work as-intended, so I dunno
                                                            as={Link}
                                                            to={`/warehouses/${e.warehouse._id}`}
                                                        >
                                                            <BoxArrowUpRight />
                                                        </Button>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </Table>

                            <div className="d-flex gap-2 fixe">
                                {
                                    productData.tags.map((e) => (
                                        <Badge key={`${productData.sku}-${e}`} bg="primary">
                                            {`#${e}`}
                                        </Badge>
                                    ))
                                }
                            </div>
                        </div>
                    ) :
                    (
                        <h2>
                            Loading<span> </span><Spinner />
                        </h2>
                    )
            }

            <ConfirmModal
                show={showProductDeleteModal}
                message={`Are you sure you want to delete ${productData?.name}?`}
                handleClose={() => setShowProductDeleteModal(false)}
                handleConfirm={() => handleProductDelete(productData!._id)}
            />

            <UpdateProductModal
                show={showProductEditModal}
                oldData={productData!}
                handleClose={() => setShowProductEditModal(false)}
                handleConfirm={(data) => handleProductEdit(data)}
            />
        </>
    );
}