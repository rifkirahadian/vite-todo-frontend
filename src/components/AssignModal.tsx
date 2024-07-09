import React, { useState, useCallback, useMemo } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { assignTask } from '../services/api';

interface AssignModalProps {
  show: boolean;
  handleClose: () => void;
  handleAssignTask: () => void;
  id: number;
}

const AssignModal: React.FC<AssignModalProps> = ({ show, handleClose, handleAssignTask, id }) => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    
    const { isError, error } = await assignTask({ taskId: id, email });
    if (isError) {
      setErrorMessage(error);
      return;
    }

    handleAssignTask();
    setEmail('');
    handleClose();
  }, [id, email, handleAssignTask, handleClose]);

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
          <Modal.Title>Assign Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {memoizedErrorMessage}
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type='submit'>
            Submit
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AssignModal;
