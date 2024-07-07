import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { Task } from '../types/Task';
import { addTask, getTask, updateTask } from '../services/api';

interface AddModalProps {
  show: boolean;
  handleClose: () => void;
  handleAddTask: () => void;
  id: number;
  type: string;
}

const AddModal: React.FC<AddModalProps> = ({ show, handleClose, handleAddTask, id, type }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('todo');
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    const newTodo: Task = {
      id: Date.now(),
      title,
      description,
      dueDate: new Date(dueDate).toISOString().split('T')[0],
      status,
    };

    if (type === 'Add') {
      const { isError, error } = await addTask(newTodo);
      if (isError) {
        setErrorMessage(error);
        return;
      }
    }

    if (type === 'Edit') {
      const { isError, error } = await updateTask(id, newTodo);
      if (isError) {
        setErrorMessage(error);
        return;
      }
    }
    

    handleAddTask();
    setTitle('');
    setDescription('');
    setDueDate('');
    handleClose();
  };

  

  useEffect(() => {
    const loadTask = async() => {
      const { data } = await getTask(id);
      setTitle(data.title);
      setDescription(data.description);
      setDueDate(new Date(data.dueDate).toISOString().split('T')[0]);
    };

    if (show && type === 'Edit' && id !== 0) {
      loadTask();
    }

    if (show && type === 'Add' && id === 0) {
      setTitle('');
      setDescription('');
      setDueDate('');
      setStatus('todo')
    }
  },[id, type, show])

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{type} Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorMessage && (
            <Alert variant={'danger'} className='mb-2'>
              {errorMessage}
            </Alert>
          )}
          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formDescription" className="mt-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter description"
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formDueDate" className="mt-3">
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="date"
              value={dueDate}
              required
              onChange={(e) => setDueDate(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formDueDate" className="mt-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              aria-label="Select Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="todo">To Do</option>
              <option value="inprogress">In Progress</option>
              <option value="done">Done</option>
            </Form.Select>
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

export default AddModal;
