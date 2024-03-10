import axios from 'axios';
import React, { useState } from 'react'
import { Button, Modal, Spinner } from 'react-bootstrap'
import secureLocalStorage from 'react-secure-storage'
import { toast } from 'sonner';

function DeletePostModal({ show, onHide, postId }) {
  const [isLoading, setIsLoading] = useState(false);

  const deletePost = async () => {
    setIsLoading(true);
    try {
      const url = secureLocalStorage.getItem("url") + "user.php";
      const jsonData = {
        postId: postId,
      }
      const formData = new FormData();
      formData.append("json", JSON.stringify(jsonData));
      formData.append("operation", "deletePost");
      const res = await axios.post(url, formData);
      if (res.data === 1) {
        toast.success("Post deleted successfully!");
        setTimeout(() => {
          window.location.reload();
        }, 800);
      } else {
        toast.error("Something went wrong");
        console.log("res.data: ", res.data);
      }
    } catch (error) {
      toast.error("Network error");
      console.log("error: ", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Modal show={show} onHide={onHide} className='bg-dark' centered>
        <Modal.Header>
          <h3>Are you sure?</h3>
        </Modal.Header>
        <Modal.Body>
          <h5 className='text-muted p-3'>This will <span className='font-bold text-danger'>PERMANENTLY DELETE</span> your post</h5>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='outline-dark' onClick={onHide}>Cancel</Button>
          <Button variant='danger' onClick={deletePost} disabled={isLoading}>{isLoading && <Spinner animation="border" size="sm" />} Delete</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default DeletePostModal