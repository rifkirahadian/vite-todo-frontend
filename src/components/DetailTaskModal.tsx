import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, ListGroup } from 'react-bootstrap';
import { Comment, Task } from '../types';
import { getComments, getTask } from '../services/api';

interface DetailTaskModalProps {
  show: boolean;
  handleClose: () => void;
  taskId: number;
}

const DetailTaskModal: React.FC<DetailTaskModalProps> = ({ show, handleClose, taskId }) => {
  const [commentContent, setCommentContent] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [task, setTask] = useState<Task | null>(null);

  const handleSubmitComment = () => {
    // handleAddComment(task.id, newComment);
    setCommentContent('');
  };

  useEffect(() => {
    const loadComments = async() => {
      const { data } = await getComments(taskId);
      setComments(data.data);
    };

    const loadTask = async() => {
      const { data } = await getTask(taskId);
      setTask(data);
    };

    if (show && taskId !== 0) {
      loadComments();
      loadTask();
    }
  },[taskId, show]);

  console.log({ task });
  

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Task Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {task && (
          <>
            <h4>{task.title}</h4>
            <p>{task.description}</p>
            <p>Due Date: {task.dueDate}</p>
            <p>Assigned to: {task.userAssignee ? task.userAssignee.name : '-'}</p>
          </>
        )}
        <h5>Comments</h5>
        <ListGroup>
          {comments.map((comment) => (
            <ListGroup.Item key={comment.id}>
              <strong>{comment.user.name}:</strong> {comment.comment}
              <div className="text-muted" style={{ fontSize: '0.8em' }}>
                {new Date(comment.createdAt).toLocaleString()}
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
        <Form.Group className="mt-3">
          <Form.Label>Add Comment</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmitComment}>
          Add Comment
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DetailTaskModal;
