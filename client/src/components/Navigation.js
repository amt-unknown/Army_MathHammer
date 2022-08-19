import { Container, Nav, Navbar } from 'react-bootstrap'
import { useNavigatem, useContext } from 'react-router-dom'

export default function Navigation () {

    const navigate = useNavigate()

    const { currentUser } = useContext(CurrentUser)
    
    let loginActions = (
      <>
        <Nav.Link onClick={() => navigate('/signup')}>Sign Up</Nav.Link>
        <Nav.Link onClick={() => navigate('/login')}></Nav.Link>
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
        <Navbar.Brand href="#home">Army MathHammer</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate('/')}>Home</Nav.Link>
            <Nav.Link onClick={() => navigate('/createUnit')}>Create Unit</Nav.Link>
            {}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    )
}