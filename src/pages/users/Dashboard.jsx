import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import secureLocalStorage from 'react-secure-storage'
import { toast } from 'sonner';
import LoadingSpinner from '../../components/LoadingSpinner';
import UserPost from '../../components/UserPost';
import { Col, Container } from 'react-bootstrap';

function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [post, setPost] = useState([]);

  const navigateTo = useNavigate();


  const getApprovedPost = async () => {
    setIsLoading(true);
    try {
      const url = secureLocalStorage.getItem("url") + "user.php";
      const formData = new FormData();
      formData.append("operation", "getApprovedPost");
      const res = await axios.post(url, formData);
      console.log("res nako ni approved post", res.data)
      if (res.data !== 0) {
        setPost(res.data);
      }
    } catch (error) {
      toast.error("Network error");
      console.log("error: ", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (secureLocalStorage.getItem("isLoggedIn") !== "true") {
      navigateTo("/");
    } else {
      getApprovedPost();

    }
  }, [navigateTo])
  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Container className='p-5 flex justify-center'>
          <Col xs={12} md={7}>
            {post === null && <div className='text-center'><b>No approved post yet</b></div>}
            {post && post.map((userPost, index) => (
              <div key={index} className='mt-3'>
                <UserPost userPost={userPost} />
              </div>
            ))}
          </Col>
        </Container>
      )}
    </>
  )
}

export default Dashboard