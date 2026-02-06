import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useParams, useOutletContext, useNavigate } from "react-router";
import { deleteWarehouse, getWarehouseById, updateWarehouse, type IWarehouse } from "../helpers/api/warehouses.api";

import ConfirmModal from "../components/modals/ConfirmModal";
import UpdateWarehouseModal from "../components/modals/UpdateWarehouseModal";
import ActionRow from "../components/elements/ActionRow";
import InventoryDetails from "./InventoryDetails";

/**
 * Context item that re-render's parent's state
 */
interface WarehouseContext {
  refreshWarehouses: () => Promise<void>,
  resetSelected: () => void
}

/**
 * Component that displays detailed warehouse information
 */
export default function WarehouseDetails() {
  const { id } = useParams();
  const [warehouseData, setWarehouseData] = useState<IWarehouse | undefined>(undefined);

  const navigate = useNavigate();
  const { refreshWarehouses, resetSelected } = useOutletContext<WarehouseContext>();

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

  // Handles display of confirmation modal
  const [showWarehouseDeleteModal, setShowWarehouseDeleteModal] = useState(false);

  /**
   * Callback function for on delete confirmation
   */
  async function handleWarehouseDelete(id: string) {
    await deleteWarehouse(id);
    await refreshWarehouses();
    resetSelected();
    navigate("/warehouses", { replace: true });
    setShowWarehouseDeleteModal(false);
  }

  // Handles display of warehouse edit modal
  const [showWarehouseEditModal, setShowWarehouseEditModal] = useState(false);

  /**
   * Callback function for unit editing
   */
  async function handleWarehouseEdit(data: IWarehouse) {
    await updateWarehouse(data);
    await refreshWarehouses();
    setWarehouseData(data);
    setShowWarehouseEditModal(false);
  }

  return (
    <>
      {
        warehouseData ? (
          <>
            <h2 className="d-flex gap-2">
              {warehouseData.name}
              <ActionRow 
                showDeleteModal={() => setShowWarehouseDeleteModal(true)}
                showEditModal={() => setShowWarehouseEditModal(true)}
              />
            </h2>
            <h5>{`${warehouseData.location}, ${warehouseData.currentCapacity}/${warehouseData.capacity} units`}</h5>
            <InventoryDetails warehouse={warehouseData} setWarehouse={(data) => setWarehouseData(data)} />
          </>
        ) :
          (
            <h2>
              Loading<span> </span><Spinner />
            </h2>
          )
      }

      <ConfirmModal 
        show={showWarehouseDeleteModal}
        message={`Are you sure you want to delete ${warehouseData?.name}?`}
        handleClose={() => setShowWarehouseDeleteModal(false)}
        handleConfirm={() => handleWarehouseDelete(warehouseData!._id)}
      />

      <UpdateWarehouseModal
        show={showWarehouseEditModal}
        oldData={warehouseData!}
        handleClose={() => setShowWarehouseEditModal(false)}
        handleConfirm={(data) => handleWarehouseEdit(data)}
      />
    </>
  );
}