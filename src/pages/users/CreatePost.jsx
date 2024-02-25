import React from 'react'
import { Card, Col, Form, Row } from 'react-bootstrap'

function CreatePost({show, onHide}) {
  return (
    <Row className='justify-content-center mt-5'>
      <Col md={6} xs={12} className='p-2'>
        <div className='flex justify-between'>
          <h1 className='text-[22px]'>Create Post</h1>
        </div>
        <div className='w-full border-[1px] border-[#333435]' />
      </Col>
    </Row>
  )
}

export default CreatePost
  