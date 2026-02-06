import type { IWarehouse } from "../../helpers/api/warehouses.api";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface BarGraphProps {
    warehouseList: IWarehouse[]
}

export default function BarGraph({ warehouseList }: BarGraphProps) {
const options = {
        plugins: {
            title: {
                display: true,
                text: "Total Warehouse Capacity",
            },
        },
        responsive: true,
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
                title: {
                    display: true,
                    text: "Capacity"
                }
            },
        },
        tooltip: {
            callbacks: {
                footer: (tooltipItems: any) => {
                    const index = tooltipItems[0].dataIndex;
                    return `Total Capacity: ${warehouseList[index].capacity}`;
                }
            }
        }
    };

    const data = {
        labels: warehouseList.map(w => w.name),
        datasets: [
            {
                label: 'Current Storage',
                // Bottom bar: currentCapacity
                data: warehouseList.map(w => w.currentCapacity),
                backgroundColor: 'rgba(168, 25, 61, 0.8)',
            },
            {
                label: 'Remaining Room',
                // Top bar: calculated as max - current
                data: warehouseList.map(w => w.capacity - w.currentCapacity),
                backgroundColor: 'rgba(22, 71, 170, 0.5)',
            },
        ],
    };

    return <Bar options={options} data={data} />;
}