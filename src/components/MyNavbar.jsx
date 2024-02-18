import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Container, Dropdown, Form, Nav, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';

function MyNavbar() {
  const navigateTo = useNavigate();

  const handleCreatePost = () => {
    navigateTo("/submit");
  };

  return (
    <>
      <Navbar className='bg-zinc-900' variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="./dashboard">BrandNameMoTo</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="./dashboard">Home</Nav.Link>
          </Nav>
          <Container className="w-25">
            <Form.Control
              type="search"
              placeholder="Search"
              className="mr-2"
              rounded
            />
          </Container>


          <Nav.Item >
            <FontAwesomeIcon className='clickable' icon={faPlus} onClick={handleCreatePost} />
          </Nav.Item>


            <Nav.Item className="ml-auto">
              <Nav.Link>
                <Dropdown className='text-white'>
                  <Dropdown.Toggle variant='outline-dark'>
                    {secureLocalStorage.getItem("username").toString().replace(/"/g, '')}
                  </Dropdown.Toggle>
                </Dropdown>
              </Nav.Link>
            </Nav.Item>
        </Container>
      </Navbar>
    </>
  );
}

export default MyNavbar;
