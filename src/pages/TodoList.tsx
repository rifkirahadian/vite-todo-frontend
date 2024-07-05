/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Task } from '../types/Task';
import { Container, Row, Col, Card, Button, Form, Dropdown } from 'react-bootstrap';
import { getTasks } from '../services/api';

const TodoList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');

  const addTodo = () => {
    const newTodo: Task = {
      id: Date.now(),
      title: newTodoTitle,
      status: 'todo'
    };
    setTasks([...tasks, newTodo]);
    setNewTodoTitle('');
  };

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

  console.log({ tasks });
  

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
      <Row className="my-4">
        <Col>
          <h2 className="text-center">Todo List</h2>
          <Form onSubmit={e => { e.preventDefault(); addTodo(); }}>
            <Form.Group controlId="formNewTodo">
              <Form.Control
                type="text"
                placeholder="Enter new todo"
                value={newTodoTitle}
                onChange={(e) => setNewTodoTitle(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 mt-2">Add Todo</Button>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col md="4">
          <h3>To Do</h3>
          {tasks.filter(todo => todo.status === 'todo').map(renderTask)}
        </Col>
        <Col md="4">
          <h3>In Progress</h3>
          {tasks.filter(todo => todo.status === 'inprogress').map(renderTask)}
        </Col>
        <Col md="4">
          <h3>Done</h3>
          {tasks.filter(todo => todo.status === 'done').map(renderTask)}
        </Col>
      </Row>
    </Container>
  );
};

export default TodoList;
