import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Modal, Button, Form, ListGroup, Alert } from 'react-bootstrap';
import { Comment, Task } from '../types';
import { addComment, getComments, getTask } from '../services/api';

interface DetailTaskModalProps {
  show: boolean;
  handleClose: () => void;
  taskId: number;
}

const DetailTaskModal: React.FC<DetailTaskModalProps> = ({ show, handleClose, taskId }) => {
  const [commentContent, setCommentContent] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [task, setTask] = useState<Task | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loadComments = useCallback(async () => {
    const { data, isError, error } = await getComments(taskId);
    if (isError) {
      setErrorMessage(error);
      return;
    }
    setComments(data.data);
  }, [taskId]);

  const loadTask = useCallback(async () => {
    const { data, isError, error } = await getTask(taskId);
    if (isError) {
      setErrorMessage(error);
      return;
    }
    setTask(data);
  }, [taskId]);

  const handleSubmitComment = useCallback(async () => {
    if (commentContent !== '') {
      const { isError, error } = await addComment({ taskId, comment: commentContent });
      if (isError) {
        setErrorMessage(error);
        return;
      }

      setErrorMessage(null);
      await loadComments();
      setCommentContent('');
    }
  }, [commentContent, taskId, loadComments]);

  useEffect(() => {
    if (show && taskId !== 0) {
      loadComments();
      loadTask();
    }
  }, [taskId, show, loadComments, loadTask]);

  const memoizedErrorMessage = useMemo(() => {
    return errorMessage && (
      <Alert variant={'danger'} className='mb-2'>
        {errorMessage}
      </Alert>
    );
  }, [errorMessage]);

  const memoizedComments = useMemo(() => {
    return comments.map((comment) => (
      <ListGroup.Item key={comment.id}>
        <strong>{comment.user.name}:</strong> {comment.comment}
        <div className="text-muted" style={{ fontSize: '0.8em' }}>
          {new Date(comment.createdAt).toLocaleString()}
        </div>
      </ListGroup.Item>
    ));
  }, [comments]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Task Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {memoizedErrorMessage}
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
          {memoizedComments}
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
