import { Container, Nav, Navbar } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { CurrentUser } from '../contexts/CurrentUser'

export default function Navigation () {

    const navigate = useNavigate()

    const { currentUser } = useContext(CurrentUser)
    
    let loginActions = (
      <>
        <Nav.Link onClick={(e) => navigate('/signup')}>Sign Up</Nav.Link>
        <Nav.Link onClick={(e) => navigate('/login')}>Login</Nav.Link>
      </>
    )

    if (currentUser) {
      loginActions = (
        <Nav.Link>Logged in as {currentUser.firstName}</Nav.Link>
      )
    }

    return(
    <Navbar bg="dark" expand="md" variant="dark">
      <Container>
        <Navbar.Brand >Army MathHammer</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate('/')}>Home</Nav.Link>
            <Nav.Link onClick={() => navigate('/createUnit')}>Create Unit</Nav.Link>
            <Nav.Link onClick={() => navigate('/calculation')}>Statistics</Nav.Link>
            {loginActions}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    )
}