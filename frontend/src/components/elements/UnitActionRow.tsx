import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import { PencilSquare, TrashFill, ArrowLeftRight } from "react-bootstrap-icons";

interface UnitActionRowProps {
  setActive: () => void,
  showEditModal: () => void,
  showDeleteModal: () => void,
  showTransferModal: () => void
}

export default function UnitActionRow({ setActive, showEditModal, showDeleteModal, showTransferModal }: UnitActionRowProps) {
  return (
    <ButtonGroup>
      <Button
        variant="outline-light"
        className="rounded-circle border-0 d-flex justify-content-center align-items-center py-2"
        onClick={() => {
          setActive();
          showEditModal();
        }}>
        <PencilSquare />
      </Button>
      <Button 
        variant="outline-light" 
        className="rounded-circle border-0 d-flex justify-content-center align-items-center py-2"
        onClick={() => {
          setActive();
          showDeleteModal();
        }}>
        <TrashFill />
      </Button>
      <Button 
        variant="outline-light" 
        className="rounded-circle border-0 d-flex justify-content-center align-items-center py-2"
        onClick={() => {
          setActive();
          showTransferModal();
        }}>
        <ArrowLeftRight />
      </Button>
    </ButtonGroup>
  );
}