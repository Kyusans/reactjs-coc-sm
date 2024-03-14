import React from 'react'
import { Card, Col, Image, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';

function CommentComponent({ comments }) {
  const navigateTo = useNavigate();

  function navigateToUser() {
    navigateTo("/user", { state: { userId: comments.com_userId } })
  }

  return (
    <Card>
      <Card.Body>
        <Row className='align-items-center mb-2'>
          <Col xs='auto'>
            <Image
              className='clickable'
              onClick={navigateToUser}
              style={{ maxWidth: 55, maxHeight: 100 }}
              src={secureLocalStorage.getItem("url") + "images/" + comments.user_image}
            />
          </Col>
          <Col>
            <h5 onClick={navigateToUser} className='text-sm clickable'>{comments.user_username}</h5>
          </Col>
        </Row>
        <Row>
          <h6>{comments.com_commentText}</h6>
        </Row>

      </Card.Body>
    </Card>
  )
}

export default CommentComponent