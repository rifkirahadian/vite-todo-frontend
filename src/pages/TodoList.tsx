/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Task } from '../types/Task';
import { Container, Row, Col, Card, Button, Dropdown } from 'react-bootstrap';
import { getTasks } from '../services/api';
import AddModal from '../components/AddModal';

const TodoList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);

  // const updateTaskStatus = (id: number, status: 'todo' | 'inprogress' | 'done') => {
  //   setTasks(tasks.map(todo => todo.id === id ? { ...todo, status } : todo));
  // };

  // const removeTask = (id: number) => {
  //   setTasks(tasks.filter(todo => todo.id !== id));
  // };

  const loadTasks = async () => {
    const task: any = await getTasks()
    
    setTasks(task.data.data.map((item: any) => ({
      id: item.id,
      title: item.title,
      status: item.status,
    })));
  };

  useEffect(() => {
    loadTasks();
  }, []);
  

  const renderTask = (task: Task) => (
    <Card key={task.id} className="mb-2">
      <Card.Title>{task.title}</Card.Title>
      <Card.Body>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Action
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Edit</Dropdown.Item>
            <Dropdown.Item href="#/action-1">Assign</Dropdown.Item>
            <Dropdown.Item href="#/action-1">Delete</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        {/* {task.status === 'todo' && (
          <Button variant="success" onClick={() => updateTaskStatus(task.id, 'inprogress')} >In Progress</Button>
        )}
      
        {task.status === 'inprogress' && (
          <Button variant="warning" onClick={() => updateTaskStatus(task.id, 'done')} className="ms-2">Done</Button>
        )}

        <Button variant="warning" onClick={() => updateTaskStatus(task.id, 'done')} className="ms-2">Assign</Button>
        
        <Button variant="danger" onClick={() => removeTask(task.id)} className="ms-2">Remove</Button> */}
      </Card.Body>
    </Card>
  );

  return (
    <Container>
      <Row className="my-4 pt-3">
        <Col lg="6" className='text-start'>
          <h2>Task List</h2>
        </Col>
        <Col lg="6" className='text-end'>
          <Button variant="primary" onClick={() => setShowAddModal(true)}>Add Task</Button>
        </Col>
      </Row>
      <Row>
        <Col md="4">
          <h3>To Do</h3>
          {tasks.filter(task => task.status === 'todo').map(renderTask)}
        </Col>
        <Col md="4">
          <h3>In Progress</h3>
          {tasks.filter(task => task.status === 'inprogress').map(renderTask)}
        </Col>
        <Col md="4">
          <h3>Done</h3>
          {tasks.filter(task => task.status === 'done').map(renderTask)}
        </Col>
      </Row>
      <AddModal show={showAddModal} handleClose={() => setShowAddModal(false)} handleAddTask={loadTasks} />
  </Container>
  );
};

export default TodoList;
