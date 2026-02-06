import { Link } from "react-router";
import type { IWarehouse } from "../../helpers/api/warehouses.api";
import ListGroup from "react-bootstrap/ListGroup";

interface WarehouseSidebarProps {
    warehouses: IWarehouse[],
    selected: string,
    handleSelection: (i: string) => void
}

export default function WarehouseSidebar({ warehouses, selected, handleSelection }: WarehouseSidebarProps) {
    return (
        <>
            <ListGroup variant="flush" className="mt-4">
                {warehouses.map((e) => {
                    const isSelected = selected === e._id;

                    return (
                        <ListGroup.Item
                            key={e._id}
                            action
                            active={isSelected}
                            onClick={() => handleSelection(e._id)}
                            className={`p-3 ${isSelected ? "bg-primary" : "bg-transparent"}`}
                            as={Link}
                            to={`/warehouses/${e._id}`}
                        >
                            <div className="me-2">
                                <div className={`fw-bold`}>
                                    {e.name}
                                </div>
                                <div className={`small`}>
                                    {e.location}
                                </div>
                            </div>
                        </ListGroup.Item>
                    );
                })}
            </ListGroup>
        </>
    );
}