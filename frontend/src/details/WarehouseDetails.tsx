import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useParams } from "react-router";
import { getWarehouseById, type IWarehouse } from "../helpers/api/warehouses.api";

import ConfirmModal from "../components/modals/ConfirmModal";
import InventoryDetails from "./InventoryDetails";

/**
 * Component that displays detailed warehouse information
 */
export default function WarehouseDetails() {
  const { id } = useParams();
  const [warehouseData, setWarehouseData] = useState<IWarehouse | undefined>(undefined);

  /**
   * Fetches all warehouse data
   */
  useEffect(() => {
    getWarehouseById(id!)
      .then((data) => {
        if (data) {
          setWarehouseData(data);
        }
      });
    return () => { setWarehouseData(undefined) };
  }, [id]);

  return (
    <>
      {
        warehouseData ? (
          <>
            <h2>{warehouseData?.name}</h2>
            <h5>{`${warehouseData?.location}, ${warehouseData?.currentCapacity}/${warehouseData?.capacity} units`}</h5>
            <InventoryDetails warehouse={warehouseData} setWarehouse={(data) => setWarehouseData(data)} />
          </>
        ) :
          (
            <h2>
              Loading<span> </span><Spinner />
            </h2>
          )
      }
    </>
  );
}