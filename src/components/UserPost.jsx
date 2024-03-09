import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { Card, Col, Container, Image, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
import { toast } from 'sonner';

function UserPost({ userPost }) {
  const [postPoints, setPostpoints] = useState(userPost.likes);
  const [isUserLiked, setIsUserLiked] = useState(false);
  const navigateTo = useNavigate();

  const handleHeartPost = async (postId, userId) => {
    try {
      const url = secureLocalStorage.getItem("url") + "user.php";
      const jsonData = {
        postId: postId,
        userId: userId
      }

      const formData = new FormData();
      formData.append("operation", "heartPost");
      formData.append("json", JSON.stringify(jsonData));
      const res = await axios.post(url, formData);

      if (res.data === 5) {
        setPostpoints(postPoints - 1);
      } else if (res.data === 1) {
        setPostpoints(postPoints + 1);
      } else {
        toast.error("Something wrong");
        console.log("error: ", res.data);
      }
      setIsUserLiked(!isUserLiked);
    } catch (error) {
      alert("Network Error");
      console.log(error);
    }
  }

  const isUserLike = useCallback(async () => {
    try {
      const url = secureLocalStorage.getItem("url") + "user.php";
      const jsonData = {
        postId: userPost.post_id,
        userId: userPost.post_userId
      }

      const formData = new FormData();
      formData.append("operation", "isUserLiked");
      formData.append("json", JSON.stringify(jsonData));

      const res = await axios.post(url, formData);
      console.log("res.data ko to", res.data);
      setIsUserLiked(res.data === 1 ? true : false);
    } catch (error) {
      alert("Network error")
      console.log(error);
    }
  }, [userPost.post_id, userPost.post_userId])

  function alertMoTo() {
    navigateTo("/user", { state: { userId: userPost.post_userId } })
  }

  useEffect(() => {
    setPostpoints(userPost.likes);
    isUserLike();
  }, [isUserLike, userPost.likes])


  return (
    <div className='flex justify-center'>
      <Card className='text-white w-full bg-black p-1' rounded>
        <Container className='p-3 bg-zinc-950'>
          <Row className='align-items-center mb-2'>
            <Col xs='auto'>
              <Image
                style={{ maxWidth: 50, maxHeight: 50 }}
                src={secureLocalStorage.getItem("url") + "images/" + userPost.user_image}
                roundedCircle
              />
            </Col>
            <Col>
              <h5 onClick={() => alertMoTo()} className='text-sm clickable'>{userPost.user_username}</h5>
            </Col>
            <Col xs='auto' className='d-flex flex-column align-items-center'>
              <h6 className='w-50'>{postPoints}</h6>
              <FontAwesomeIcon icon={faHeart} size='lg' className={`clickable ${isUserLiked ? "text-red-500" : ""}`}
                onClick={() => handleHeartPost(userPost.post_id, userPost.post_userId)}
              />
            </Col>
          </Row>

          <Row className='flex justify-center mt-3'>
            <Col>
              <h5><b>{userPost.post_title}</b></h5>
            </Col>
          </Row>

          {userPost.post_image !== "" && (
            <div className='flex justify-center'>
              <Image
                style={{ maxWidth: 500, maxHeight: 500, minHeight: 100, minWidth: 200 }}
                className='w-100'
                src={secureLocalStorage.getItem("url") + "images/" + userPost.post_image}
                rounded
              />
            </div>
          )}

          <p className='mt-3'>{userPost.post_description}</p>
        </Container>
      </Card>
    </div>
  );
}

export default UserPost;
