import React from 'react';
import { createPortal } from 'react-dom';
import Modal from 'react-bootstrap/Modal';

type Props = {
  children: React.ReactNode;
  show: boolean;
  title: string;
  close: () => void;
};

export const ModalWindow: React.FC<Props> = ({
  show,
  close,
  children,
  title = 'Modal heading',
}) => {
  const modal = (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );

  return createPortal(modal, document.body);
};
