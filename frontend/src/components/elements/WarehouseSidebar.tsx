import { Link } from "react-router";
import type { IWarehouse } from "../../helpers/api/warehouses.api";
import { ListGroup } from "react-bootstrap";

interface WarehouseSidebarProps {
    warehouses: IWarehouse[],
    selected: string,
    handleSelection: (i: string) => void
}

export default function WarehouseSidebar({ warehouses, selected, handleSelection }: WarehouseSidebarProps) {
    return (
        <>
            <ListGroup variant="flush">
                {warehouses.map((warehouse) => {
                    const isSelected = selected === warehouse._id;

                    return (
                        <ListGroup.Item
                            key={warehouse._id}
                            action
                            active={isSelected}
                            onClick={() => handleSelection(warehouse._id)}
                            className={`p-3 ${isSelected ? "bg-primary" : "bg-transparent"}`}
                            as={Link}
                            to={`/warehouses/${warehouse._id}`}
                        >
                            <div className="me-2">
                                <div className={`fw-bold`}>
                                    {warehouse.name}
                                </div>
                                <div className={`small`}>
                                    {warehouse.location}
                                </div>
                            </div>
                        </ListGroup.Item>
                    );
                })}
            </ListGroup>
        </>
    );
}