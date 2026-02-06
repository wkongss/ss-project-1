import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import { PencilSquare, TrashFill } from "react-bootstrap-icons";

interface ActionRowProps {
  showEditModal: () => void,
  showDeleteModal: () => void,
}

export default function ActionRow({ showEditModal, showDeleteModal }: ActionRowProps) {
  return (
    <ButtonGroup>
      <Button
        variant="outline-light"
        className="rounded-circle border-0 d-flex justify-contnet-center align-items-center p-2"
        onClick={() => {
          showEditModal();
        }}>
        <PencilSquare size={20}/>
      </Button>
      <Button 
        variant="outline-light" 
        className="rounded-circle border-0 d-flex justify-contnet-center align-items-center p-2"
        onClick={() => {
          showDeleteModal();
        }}>
        <TrashFill size={20}/>
      </Button>
    </ButtonGroup>
  );
}