import React from 'react'
import { Button, Image, Modal } from 'react-bootstrap'
import secureLocalStorage from 'react-secure-storage'

function ViewImage({ show, onHide, fileName }) {
  return (
    <Modal show={show} onHide={onHide} size='lg'>
      <Modal.Body className='d-flex justify-content-center'>
        <Image
          src={secureLocalStorage.getItem("url") + "images/" + fileName}
          style={{ maxWidth: 800, maxHeight: 800, minHeight: 700, minWidth: 700 }}

        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant='outline-dark' onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ViewImage