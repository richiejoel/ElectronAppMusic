import React from "react";
import { Modal, Icon, Button } from "semantic-ui-react";

import "./ModalConfirmation.scss";

export default function ModalConfirmation(props) {
  const { show, setShow, title, children, logOut } = props;

  const onClose = () => {
    setShow(false);
  };

  return (
    <Modal
      open={show}
      onClose={onClose}
      className="modal-confirmation "
      size="tiny"
    >
      <Modal.Header>
        <h3>{title}</h3>
        <Icon name="close" onClick={onClose} />
      </Modal.Header>
      <Modal.Content>{children}</Modal.Content>
      <Modal.Actions>
        <Button
          basic
          color="red"
          className="button-modal"
          onClick={onClose}
          inverted
        >
          <Icon name="remove" /> No
        </Button>
        <Button
          className="button-modal"
          color="green"
          onClick={logOut}
          inverted
        >
          <Icon name="checkmark" /> Yes
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
