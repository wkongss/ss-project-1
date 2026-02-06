import { useState } from "react"
import { SortDown, SortUp } from "react-bootstrap-icons";

interface SortableHeaderProps {
    children: string,
    setParams: (asc: number) => void
}

export default function SortableHeader({ children, setParams }: SortableHeaderProps) {
    const [ascending, setAscending] = useState(-1);

    function handleClick() {
        const newValue = ascending * -1;
        setAscending(newValue);
        setParams(newValue);
    }

    return (
        <th onClick={handleClick} style={{ cursor: 'pointer' }}>
            <div className="d-flex justify-content-between align-items-center">
                {children} 
                {ascending === -1 ? <SortDown /> : <SortUp />}
            </div>
        </th>
    );
}