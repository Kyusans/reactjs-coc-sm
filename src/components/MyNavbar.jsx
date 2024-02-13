import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'

function MyNavbar() {
  return (
    <Navbar className='bg-zinc-900' variant="dark" expand="lg">
    <Container>
      <Navbar.Brand href="/">BrandNameMoTo</Navbar.Brand>
      <Navbar.Toggle aria-controls="reddit-navbar-nav" />
      <Navbar.Collapse id="reddit-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/popular">Popular</Nav.Link>
          <Nav.Link href="/all">All</Nav.Link>
          <Nav.Link href="/subreddits">Subreddits</Nav.Link>
          {/* Add more Nav.Link components for additional links */}
        </Nav>
        <Nav>
          <Nav.Link href="/login">Login</Nav.Link>
          <Nav.Link href="/signup">Sign Up</Nav.Link>
          {/* Add more Nav.Link components for additional links */}
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default MyNavbar