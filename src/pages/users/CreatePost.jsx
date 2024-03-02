import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useState } from 'react';
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import secureLocalStorage from 'react-secure-storage';
import { toast } from 'sonner';

function CreatePost({ show, onHide }) {
  const [validated, setValidated] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleOnHide = () => {
    setTitle('');
    setDescription('');
    setImage(null);
    setImagePreview(null);
    setValidated(false);
    onHide();
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(selectedImage);
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  const createPost = async () => {
    setIsLoading(true);
    try {
      const url = secureLocalStorage.getItem("url") + "user.php";
      const userId = secureLocalStorage.getItem("userId");
      console.log("image mo to : ", image);
      const jsonData = {
        userId: userId,
        title: title,
        image: image,
        description: description
      };

      console.log('userId mo to: ', userId);
      console.log('url mo to: ', url);
      console.log('jsonData mo to: ', jsonData);

      const formData = new FormData();
      formData.append("json", JSON.stringify(jsonData));
      formData.append("operation", "createPost");
      formData.append('file', image !== null ? image : "");

      const res = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (res.data === 2) {
        toast.error("You cannot Upload files of this type!");
      } else if (res.data === 3) {
        toast.error("There was an error uploading your file!");
      } else if (res.data === 4) {
        toast.error("Your file is too big (25mb maximum)!");
      } else if (res.data === 1) {
        toast.success("Post created successfully!", {
          autoClose: 3000,
          description: 'Wait for admin to approve your post',
        });
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        toast.error("Something went wrong!");
        console.log("res: ", res.data);
      }
    } catch (error) {
      toast.error("Network error!");
      console.log("error: ", error);
    } finally {
      setIsLoading(false);
    }

  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity()) {
      createPost();
    }
    setValidated(true);
  }

  return (
    <Modal show={show} onHide={handleOnHide} fullscreen>
      <Modal.Body className='bg-zinc-900 text-white'>
        <Row>
          <Col>
            <div onClick={handleOnHide}>
              <Button variant='outline-light'>
                <FontAwesomeIcon icon={faArrowLeft} size='lg' />{' '}
              </Button>
            </div>
          </Col>
        </Row>
        <Row className='justify-content-center mt-5'>
          <Col md={6} xs={12} className='p-2'>
            <div className='flex justify-between'>
              <h1 className='text-[22px]'>Create a post</h1>
            </div>
            <div className='w-full border-[1px] border-[#ffffff]' />
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group className='mb-3 mt-4'>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  className='bg-dark text-white'
                  type='text'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Description (Optional)</Form.Label>
                <Form.Control
                  className='bg-dark text-white'
                  as='textarea'
                  style={{ height: '100px' }}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
              <Form.Group className='mb-4'>
                <Form.Label>Image (Optional)</Form.Label>
                <Form.Control
                  className='bg-dark text-white'
                  type='file'
                  onChange={handleImageChange}
                />
              </Form.Group>
              <Container className='text-end'>
                <Button variant='outline-secondary' onClick={handleOnHide}>Cancel</Button>{' '}
                <Button type='submit' variant='outline-light' disabled={isLoading}><b>Post</b></Button>
              </Container>
            </Form>
          </Col>
          <Col>
            <Container
              className='mt-3 w-75 border-[1px] border-[#ffffff] d-flex justify-content-center align-items-center'
              style={{ minHeight: '150px' }}
            >
              {imagePreview === null ? (
                <div>No image selected</div>
              ) : (
                <div style={{ marginTop: '10px', maxWidth: '100%', overflow: 'hidden' }}>
                  <img
                    src={imagePreview}
                    alt='Preview'
                    style={{ width: '100%', height: 'auto' }}
                  />
                </div>
              )}
            </Container>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}

export default CreatePost;
