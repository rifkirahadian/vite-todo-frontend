import React, { useState } from 'react';
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
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e: React.FormEvent) => {
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
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Assign Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorMessage && (
            <Alert variant={'danger'} className='mb-2'>
              {errorMessage}
            </Alert>
          )}
          <Form.Group controlId="formTitle">
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
