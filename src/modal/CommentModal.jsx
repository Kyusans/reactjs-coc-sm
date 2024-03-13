import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { Button, FloatingLabel, Form, Modal, } from 'react-bootstrap'
import secureLocalStorage from 'react-secure-storage'
import { toast } from 'sonner';
import CommentComponent from '../components/CommentComponent';
import LoadingSpinner from '../components/LoadingSpinner';

function CommentModal({ show, onHide, postId }) {
  const [comments, setComments] = useState([]);
  const [userComment, setUserComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [validated, setValidated] = useState(false);

  const getComments = useCallback(async () => {
    setIsLoading(true);
    try {
      const url = secureLocalStorage.getItem("url") + "user.php";
      const jsonData = { postId: postId }
      const formData = new FormData();
      formData.append("json", JSON.stringify(jsonData));
      formData.append("operation", "getComment");
      const res = await axios.post(url, formData);
      console.log("res.data: ", JSON.stringify(res.data));
      if (res.data !== 0) {
        setComments(res.data);
      }
    } catch (error) {
      toast.error("Network error");
      console.log("error: ", error);
    } finally {
      setIsLoading(false);
    }
  }, [postId]);

  const addComment = async () => {
    setIsLoading(true);
    try {
      const url = secureLocalStorage.getItem("url") + "user.php";
      const userId = secureLocalStorage.getItem("userId");
      const jsonData = {
        postId: postId,
        userId: userId,
        comment: userComment
      }

      const formData = new FormData();
      formData.append("operation", "addComment");
      formData.append("json", JSON.stringify(jsonData));

      const res = await axios.post(url, formData);

      if (res.data === 1) {
        toast.success("Comment successfully added");
        getComments();
        setUserComment("");
        setValidated(false);
      } else {
        toast.error("Something wrong");
        console.log("Res data ni addcomment: ", res.data);

      }
    } catch (error) {
      toast.error("Network error");
      console.log("error: ", error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity()) {
      addComment();
    }
    setValidated(true);
  }


  function handleOnHide() {
    onHide();
    setValidated(false);
    setUserComment("");
  }

  useEffect(() => {
    if (show) {
      getComments();
    }
  }, [getComments, show]);
  return (
    <>

      <Modal show={show} onHide={handleOnHide} size="lg" centered>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Modal.Body>
            {isLoading ? <LoadingSpinner /> : (
              comments.length > 0 ? comments.map((comment, index) => (
                <div className='mb-3' key={index}>
                  <CommentComponent comments={comment} />
                </div>
              ))
                : <p className='text-muted text-center'>No comments yet</p>
            )}
            <FloatingLabel label="Add a comment">
              <Form.Control as="textarea" value={userComment} onChange={(e) => setUserComment(e.target.value)} placeholder="" style={{ height: '75px' }} required />
            </FloatingLabel>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='dark' onClick={handleOnHide}>Back</Button>
            <Button variant='success' type='submit'>Submit</Button>
          </Modal.Footer>
        </Form >
      </Modal >
    </>
  )
}

export default CommentModal