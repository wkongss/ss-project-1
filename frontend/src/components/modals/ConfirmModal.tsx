import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

interface ConfirmModalProps {
    message: string,
    show: boolean,
    handleClose: () => void,
    handleConfirm: () => Promise<void>
}

/**
 * Represents a modal for confirming document deletions
 */
export default function ConfirmModal({ message, show, handleClose, handleConfirm }: ConfirmModalProps) {
  return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {message}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
  );
}