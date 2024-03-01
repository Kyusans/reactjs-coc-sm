import React from 'react';
import { Card, Col, Container, Image, Row } from 'react-bootstrap';
import secureLocalStorage from 'react-secure-storage';

function UserPost({ username, userImage, title, description, dateTime, image, status }) {
  return (
    <div className='flex justify-center'>
      <Col>
        <Card className='text-white bg-dark'>
          <Container className='bg-zinc-900 p-3'>
            <Row className='align-items-center'>
              <Col xs={3} md={3}>
                <Image
                  style={{ width: 40, height: 40 }}
                  src={secureLocalStorage.getItem("url") + "images/" + userImage}
                  roundedCircle
                />
              </Col>
              <Row>
                <h6 className='ms-2 text-sm'>{username}</h6>
              </Row>
            </Row>
            <Row className='flex justify-center mt-3'>
              <Col>
                <h3 className='text-start'><b>{title}</b></h3>
              </Col>
            </Row>
            {image !== "" && (
              <div className='flex justify-center'>
                <Image
                  className='w-100'
                  src={secureLocalStorage.getItem("url") + "images/" + image}
                  rounded
                />
              </div>
            )}
            <p className='text-start mt-3'>{description}</p>

          </Container>
        </Card>
      </Col>
    </div>
  );
}

export default UserPost;
