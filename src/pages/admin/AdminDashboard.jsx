import axios from 'axios';
import React, { useEffect, useState } from 'react'
import secureLocalStorage from 'react-secure-storage';
import { toast } from 'sonner';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap';

function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [pendingPost, setPendingPost] = useState([]);
  const navigateTo = useNavigate();

  const getPendingPost = async () => {
    setIsLoading(true);
    try {
      const url = secureLocalStorage.getItem("url") + "admin.php";
      const formData = new FormData();
      formData.append("operation", "getPendingPost");
      const res = await axios.post(url, formData);
      console.log("res.data: ", JSON.stringify(res.data));
      if (res.data !== 0) {
        setPendingPost(res.data);
      } else {
        setPendingPost([]);
      }
    } catch (error) {
      toast.error("Network error!");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  const approvePost = async (postId) => {
    setIsLoading(true);
    try {
      const url = secureLocalStorage.getItem("url") + "admin.php";
      const jsonData = { "postId": postId };
      const formData = new FormData();
      formData.append("operation", "approvePost");
      formData.append("json", JSON.stringify(jsonData));
      const res = await axios.post(url, formData);
      if (res.data === 1) {
        toast.success("Post approved!");
        getPendingPost();
      }
    } catch (error) {
      toast.error("Network error!");
      console.log("error: ", error);
    } finally {
      setIsLoading(false);
    }
  }

  const rejectPost = async (postId) => {
    setIsLoading(true);
    try {
      const url = secureLocalStorage.getItem("url") + "admin.php";
      const jsonData = { "postId": postId };
      const formData = new FormData();
      formData.append("operation", "rejectPost");
      formData.append("json", JSON.stringify(jsonData));
      const res = await axios.post(url, formData);
      console.log("res.data: ", JSON.stringify(res.data));

      if (res.data === 1) {
        toast.success("Post rejected!");
        getPendingPost();
      } else {
        toast.error("Something went wrong!");
        console.log("res.data: ", JSON.stringify(res.data));
      }
    } catch (error) {
      toast.error("Network error!");
      console.log("error: ", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (secureLocalStorage.getItem("isAdminLoggedIn") === "true") {
      getPendingPost();
    } else {
      navigateTo("/");
    }
  }, [navigateTo]);

  return (
    <div>
      {isLoading ? <LoadingSpinner /> :
        <div className='flex justify-center mt-16'>
          <div className='w-98 md:w-50'>
            {pendingPost.length > 0 ?
              <Container>
                {pendingPost.map((post, index) => (
                  <Card key={index} className='text-white bg-dark mt-3'>
                    <Container className='bg-zinc-900 p-3'>
                      <Row className='mb-2'>
                        <Col xs='auto'>
                          <Image
                            style={{ maxWidth: 50, maxHeight: 50 }}
                            src={secureLocalStorage.getItem("url") + "images/" + post.user_image}
                            rounded
                          />
                        </Col>
                        <Col>
                          <h5 className='text-sm'>{post.user_username}</h5>
                        </Col>
                        <Col xs='auto' className='d-flex flex-column align-items-center'>
                          <Button variant='outline-success' className='mt-2' onClick={() => approvePost(post.post_id)} >Approve</Button>
                          <Button variant='outline-danger' className='mt-2' onClick={() => rejectPost(post.post_id)}>Reject</Button>
                        </Col>
                      </Row>
                      <Row className='flex justify-center mt-3'>
                        <Col>
                          <h5><b>{post.post_title}</b></h5>
                        </Col>
                      </Row>
                      {post.post_image !== "" && (
                        <div className='flex justify-center'>
                          <Image
                            style={{ maxWidth: 500, maxHeight: 500, minHeight: 100, minWidth: 50 }}
                            className='w-full'
                            src={secureLocalStorage.getItem("url") + "images/" + post.post_image}
                            rounded
                          />
                        </div>
                      )}
                      <p className='mt-3'>{post.post_description}</p>
                    </Container>
                  </Card>
                ))}
              </Container>
              :
              <div className='text-center'><b>No pending posts</b></div>
            }
          </div>
        </div>
      }
    </div>
  )
}

export default AdminDashboard