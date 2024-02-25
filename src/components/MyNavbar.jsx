import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faBars, faHome, faKey, faPlus, faSearch, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons'; // Added faHome icon
import secureLocalStorage from 'react-secure-storage';
import { useNavigate } from 'react-router-dom';

function MyNavbar() {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [userFullName, setUserFullName] = useState(secureLocalStorage.getItem("username"));

  const navigateTo = useNavigate();

  useEffect(() => {
    if (userFullName !== null) {
      setUserFullName(userFullName.replace(/"/g, ""));

    } else {
      setUserFullName("");
    }

  }, [userFullName])

  const handleCreatePost = () => {
    navigateTo("/submit");
  };



  const handleToggleOffcanvas = () => {
    setShowOffcanvas(!showOffcanvas);
  };

  return (
    <Navbar className="navbar-dark bg-zinc-900 text-white">
      <Container fluid>
        <Button variant="outline-light" onClick={handleToggleOffcanvas}>
          <FontAwesomeIcon icon={faBars} size='lg' />
        </Button>

        <Navbar.Brand href="/coc/dashboard">
          Social media mo to
        </Navbar.Brand>
        <Offcanvas
          show={showOffcanvas}
          onHide={() => setShowOffcanvas(false)}
          placement="start"
          className="custom-offcanvas"
        >

          <Offcanvas.Header closeButton={false} className='mt-1'>
            <Navbar.Brand><h5>{userFullName}</h5></Navbar.Brand>
            <div className="custom-close-button" onClick={() => setShowOffcanvas(false)}>
              <Button variant='outline-light'><FontAwesomeIcon icon={faArrowLeft} size='lg' /> </Button>
            </div>
          </Offcanvas.Header>

          <Offcanvas.Body className='mt-4 flex flex-col justify-between'>
            <Nav >
              <Nav.Link href="/coc/dashboard">
                <FontAwesomeIcon icon={faUser} className="mr-2" />
                View Profile
              </Nav.Link>
              <Nav.Link href="/coc/dashboard">
                <FontAwesomeIcon icon={faHome} className="mr-2" />
                Home
              </Nav.Link>

              <hr className='bg-secondary w-100' />
              <Nav.Link onClick={handleCreatePost}>
                <FontAwesomeIcon className='clickable mr-2' icon={faPlus} />
                Create Post
              </Nav.Link>
              <Nav.Link>
                <FontAwesomeIcon icon={faSearch} className="mr-2" />
                Search
              </Nav.Link>
            </Nav>


            <div>
              <NavDropdown title="Account" drop='up'>
                {/* <NavDropdown.Item href="/gsd/account/password"><FontAwesomeIcon icon={faKey} /> Change Password</NavDropdown.Item> */}
                <NavDropdown.Item href="/coc/dashboard" onClick={handleSignout}><FontAwesomeIcon icon={faSignOutAlt} /> Signout</NavDropdown.Item>
              </NavDropdown>
            </div>
          </Offcanvas.Body>

        </Offcanvas>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;



export function handleSignout() {
  secureLocalStorage.setItem("username", "");
  secureLocalStorage.setItem("url", "");
  secureLocalStorage.setItem("image", "");
  secureLocalStorage.setItem("email", "");
  secureLocalStorage.setItem("userId", "");
  secureLocalStorage.setItem("isLoggedIn", "");
  secureLocalStorage.setItem("level", "");

}

// import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import React from 'react';
// import { Container, Dropdown, Nav, Navbar } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import secureLocalStorage from 'react-secure-storage';

// function MyNavbar() {
//   const navigateTo = useNavigate();

//   const handleCreatePost = () => {
//     navigateTo("/submit");
//   };

//   return (
//     <Navbar className='bg-zinc-900 ' variant="dark" expand="lg">
//       <Container>
//         <Navbar.Brand href="./dashboard">BrandNameMoTo</Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="mr-auto">
//             <Nav.Link href="./dashboard">Home</Nav.Link>
//           </Nav>
//           <Nav className="ml-auto">
//             <Nav.Link onClick={() => { }}>
//               <FontAwesomeIcon className='clickable' icon={faSearch} />
//             </Nav.Link>
//             <Nav.Link onClick={handleCreatePost}>
//               <FontAwesomeIcon className='clickable' icon={faPlus} />
//             </Nav.Link>
//             <Nav.Item>
//               <Nav.Link>
//                 <Dropdown>
//                   <Dropdown.Toggle variant='outline-light'>
//                     {secureLocalStorage.getItem("username").toString().replace(/"/g, '')}
//                   </Dropdown.Toggle>
//                 </Dropdown>
//               </Nav.Link>
//             </Nav.Item>
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }

// export default MyNavbar;
