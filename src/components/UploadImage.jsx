import axios from 'axios';
import React, { useState } from 'react'
import { Button, Container, Form, Spinner } from 'react-bootstrap'
import secureLocalStorage from 'react-secure-storage';
import { toast } from 'sonner';

function UploadImage() {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleUpload = async () => {
    setIsLoading(true);
    try {
      const url = secureLocalStorage.getItem("url") + "user.php";
      const userId = secureLocalStorage.getItem("userId");
      const jsonData = { userId: userId, };

      const formData = new FormData();
      formData.append("operation", "updateProfilePicture");
      formData.append("json", JSON.stringify(jsonData));
      formData.append('file', image);

      const res = await axios({
        url: url,
        data: formData,
        method: "post",
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      switch (res.data) {
        case 1:
          toast.success("success", "Success!");
          setTimeout(() => {
            window.location.reload();
          }, 1000);
          break;
        case 2:
          toast.danger("You cannot Upload files of this type!");
          break;
        case 3:
          toast.danger("There was an error uploading your file!");
          break;
        case 4:
          toast.danger("Your file is too big (25mb maximum)");
          break;
        default:
          toast.danger("Unsuccessful");
          break;
      }
    } catch (error) {
      toast.error("Network error");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity()) {
      handleUpload();
    }
    setValidated(true);
  }
  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group className='mb-3 mt-3'>
        <Form.Control
          className='bg-dark text-white'
          type='file'
          onChange={handleImageChange}
          required
        />
        <Form.Control.Feedback type='invalid'>
          This field is required
        </Form.Control.Feedback>
        <Container className='mt-3'>
          <Button type='submit' variant='outline-success' disabled={isLoading}>{isLoading && <Spinner animation="border" size="sm" />}
            Submit
          </Button>
        </Container>
        <Container
          className='mt-3 w-75 border-[1px] border-[#000000] d-flex justify-content-center align-items-center'
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
      </Form.Group>
    </Form>
  )
}

export default UploadImage