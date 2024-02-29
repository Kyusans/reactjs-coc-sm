import React from 'react'
import { Card, Col, Container, Image, Row } from 'react-bootstrap'
import secureLocalStorage from 'react-secure-storage'

function UserPost({ username, userImage, title, description, dateTime, image, status }) {
  return (
    <Container className='flex justify-center'>
      <Col xs={12} md={7}>
        <Card bg='secondary text-white' >
          <Card.Header>
            <Row>
              <Row xs={6} md={4}>
                <Image
                  style={{ width: 75 }}
                  src={secureLocalStorage.getItem("url") + "images/" + userImage}
                  roundedCircle
                />
                <h5 className='mt-2'>{username}</h5>
              </Row>
            </Row>
            <Row className='flex justify-center'>
              <Col xs={6} md={4}>
                <h3 className='text-center'>{title}</h3>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <Container>
              {image === "" ? (
                null
              ) : (
                <div className='flex justify-center'>
                  <Image
                    className='w-75'
                    src={secureLocalStorage.getItem("url") + "images/" + image}
                    rounded
                  />
                </div>
              )}
            </Container>
            <p className='text-center mt-3'>{description}</p>
          </Card.Body>
        </Card>
      </Col>
    </Container>
  )
}

export default UserPost