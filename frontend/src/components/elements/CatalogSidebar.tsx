import { useState, useEffect } from "react";
import { Link } from "react-router";
import type { IProduct } from "../../helpers/api/products.api";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";

import productSearch from "../../helpers/search/productSearch";

interface ProductSidebarProps {
    products: IProduct[],
    selected: string,
    handleSelection: (i: string) => void
}

export default function ProductSidebar({ products, selected, handleSelection }: ProductSidebarProps) {
    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState("");
    const [filteredList, setFilteredList] = useState<IProduct[]>([]);

    useEffect(() => {
        setFilteredList(productSearch(products, filters));
    }, [products, filters]);

    return (
        <>
            <Form action={"#"} onSubmit={(e) => {
                e.preventDefault();
                setFilters(search);
            }}
            >
                <Form.Group className="my-3" controlId="formSearch">
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

            <ListGroup variant="flush" className="mt-4">
                {filteredList.map((e) => {
                    const isSelected = selected === e._id;

                    return (
                        <ListGroup.Item
                            key={e._id}
                            action
                            active={isSelected}
                            onClick={() => handleSelection(e._id)}
                            className={`p-3 ${isSelected ? "bg-primary" : "bg-transparent"}`}
                            as={Link}
                            to={`/catalog/${e._id}`}
                        >
                            <div className="me-2">
                                <div className={`fw-bold`}>
                                    {e.name}
                                </div>
                                <div className={`small`}>
                                    {e.sku}
                                </div>
                            </div>
                        </ListGroup.Item>
                    );
                })}
            </ListGroup>
        </>
    );
}