import React, { useState } from 'react'
import { Button, Col, Container, Modal, Row } from 'react-bootstrap'
import TakePicture from '../components/TakePicture';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function UpdateProfileModal({ show, onHide, userId }) {
  const [isTakePicture, setIsTakePicture] = useState(0); // 0 wala, 1 upload image, else take a picture
  const handleOnHide = () => {
    setIsTakePicture(0);
    onHide();
  }
  return (
    <Modal show={show} onHide={handleOnHide} centered size='lg' className='bg-dark'>
      <Modal.Header>
        <h5>Update profile picture</h5>
      </Modal.Header>
      <Modal.Body className='text-center' as={Row}>
        {isTakePicture === 0 ?
          <>
            <Col>
              <Button variant='outline-dark' onClick={() => setIsTakePicture(1)}>Upload image</Button>
            </Col>
            <Col>
              <p className='text-muted'><b>or</b></p>
            </Col>
            <Col>
              <Button variant='outline-dark' onClick={() => setIsTakePicture(2)}>Take a picture</Button>
            </Col>
          </> : isTakePicture === 1 ?
            <>
              <p>upload mo to</p>
            </> :
            <>
              <Container className='text-start'>
                <Button variant='outline-danger' onClick={() => setIsTakePicture(0)}>
                  <FontAwesomeIcon icon={faArrowLeft} />
                </Button>
              </Container>
              <TakePicture />
            </>
        }
      </Modal.Body>
      <Modal.Footer>
        <Button variant='outline-dark' onClick={handleOnHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default UpdateProfileModal