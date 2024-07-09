import React, { useState, useCallback, useMemo } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { deleteTask } from '../services/api';

interface DeleteModalProps {
  show: boolean;
  handleClose: () => void;
  handleDeleteTask: () => void;
  id: number;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ show, handleClose, handleDeleteTask, id }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    
    const { isError, error } = await deleteTask(id);
    if (isError) {
      setErrorMessage(error);
      return;
    }

    handleDeleteTask();
    handleClose();
  }, [id, handleDeleteTask, handleClose]);

  const memoizedErrorMessage = useMemo(() => {
    return errorMessage && (
      <Alert variant={'danger'} className='mb-2'>
        {errorMessage}
      </Alert>
    );
  }, [errorMessage]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {memoizedErrorMessage}
          <p>Are you sure you want to delete this task?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" type='submit'>
            Yes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default DeleteModal;
