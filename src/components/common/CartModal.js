import React from 'react';
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
        <h3 className="modal-content_title">{desc}</h3>
        {buttonChild
          &&
          <div className="modal-actions">
            <Button
              onClick={onConfirm}
              className="active-button confirm"
            >
              {buttonChild}
            </Button>

            <Button onClick={onClose} className="cancel-btn">No</Button>
          </div>
        }

      </div>
    </Modal>
  );
};

export default CartModal;
