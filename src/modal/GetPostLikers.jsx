import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { Col, Image, Modal, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
import { toast } from 'sonner';
import LoadingSpinner from '../components/LoadingSpinner';

function GetPostLikers({ show, onHide, postId }) {
  const [isLoading, setIsLoading] = useState(false);
  const [postLikers, setPostLikers] = useState([]);
  const navigateTo = useNavigate();

  function navigateToUser(userId) {
    navigateTo("/user", { state: { userId: userId } })
  }

  const getPostLikers = useCallback(async () => {
    setIsLoading(true);
    try {
      const url = secureLocalStorage.getItem("url") + "user.php";
      const jsonData = {
        postId: postId
      }

      const formData = new FormData();
      formData.append("operation", "getPostLikers");
      formData.append("json", JSON.stringify(jsonData));
      const res = await axios.post(url, formData);
      console.log("res sa GetPostLikers", res.data);
      if (res.data !== 0) {
        setPostLikers(res.data);
      }
    } catch (error) {
      toast.error("Network error");
      console.log("error: ", error);
    } finally {
      setIsLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    if (show) {
      getPostLikers();
    }
  }, [getPostLikers, show])

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header>
        <h3>People who like this post</h3>
      </Modal.Header>
      <Modal.Body>
        {isLoading ? <LoadingSpinner /> :
          (postLikers.length > 0 ?
            (postLikers.map((likers, index) => (
              <Row key={index} className='align-items-center mb-3 clickable' onClick={() => navigateToUser(likers.user_id)} >
                <Col xs='auto'>
                  <Image
                    className='clickable'
                    style={{ maxWidth: 55, maxHeight: 100, minHeight: 50, minWidth: 20 }}
                    src={secureLocalStorage.getItem("url") + "images/" + likers.user_image}
                    roundedCircle
                  />
                </Col>
                <Col>
                  <h5 className='text-sm clickable'>{likers.user_username}</h5>
                </Col>
              </Row>
            )))
            :
            <p>No one likes this post yet</p>
          )}
      </Modal.Body>
    </Modal>
  )
}

export default GetPostLikers;
