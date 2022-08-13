import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'

export default function Navigation () {
    return(
    <Navbar bg="dark" expand="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">MathHammer</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    )
}