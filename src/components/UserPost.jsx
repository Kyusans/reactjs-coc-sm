import React from 'react';
import { Card, Col, Container, Image, Row } from 'react-bootstrap';
import secureLocalStorage from 'react-secure-storage';

function UserPost({ username, userImage, title, description, dateTime, image, status }) {
  return (
    <div className='flex justify-center'>
      <Card className='text-white bg-dark'>
        <Container className='bg-zinc-800 p-3'>
          <Row className='align-items-center mb-2'>
            <Col xs='auto'>
              <Image
                style={{ maxWidth: 50, maxHeight: 50 }}
                src={secureLocalStorage.getItem("url") + "images/" + userImage}
                roundedCircle
              />
            </Col>
            <Col >
              <h5 className='text-sm'>{username}</h5>
            </Col>
          </Row>

          <Row className='flex justify-center mt-3'>
            <Col>
              <h3><b>{title}</b></h3>
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

          <p className='mt-3'>{description}</p>
        </Container>
      </Card>
    </div>
  );
}

export default UserPost;
