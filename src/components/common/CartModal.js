import React from 'react';
// import Modal from './Modal';
import Button from "../mini/Button";
import Modal from "./Modal";

const CartModal = ({isOpen, onClose, onConfirm, desc, buttonChild}) => {

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="small"
    >
      <div className="modal-content">
        <h3>{desc}</h3>
        <div className="modal-actions">
          <Button
            onClick={buttonChild === "Yes" ? onConfirm : onClose}
            className="confirm-btn"
          >
            {buttonChild}
          </Button>

          {buttonChild !== "Close" && <Button onClick={onClose} className="cancel-btn">No</Button>}
        </div>
      </div>
    </Modal>
  );
};

export default CartModal;
