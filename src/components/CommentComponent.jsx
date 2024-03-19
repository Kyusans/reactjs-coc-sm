import React, { useState } from 'react';
import { Card, Col, Image, Row, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';

function CommentComponent({ comments }) {
  const navigateTo = useNavigate();
  const [expanded, setExpanded] = useState(false);

  function navigateToUser() {
    navigateTo("/user", { state: { userId: comments.com_userId } });
    // navigateTo("/user");
  }

  const maxLength = 400; 
  const truncatedText = comments.com_commentText.length > maxLength ?
    comments.com_commentText.substring(0, maxLength) + "..." :
    comments.com_commentText;

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
          <h6>
            {expanded ? comments.com_commentText : truncatedText}
            {!expanded && comments.com_commentText.length > maxLength &&
              <Button className='float-end text-secondary' variant="link" onClick={() => setExpanded(true)}>See more</Button>
            }
            {expanded &&
              <Button className='float-end text-secondary' variant="link" onClick={() => setExpanded(false)}>Show less</Button>
            }
          </h6>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default CommentComponent;
