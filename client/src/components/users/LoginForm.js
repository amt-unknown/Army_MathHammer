import { useContext, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { Container, Form, Row, Button, Col } from "react-bootstrap"
import { CurrentUser } from "../../contexts/CurrentUser"

export default function LoginForm() {
    const navigate = useNavigate()

    const {setCurrentUser} = useContext(CurrentUser)

    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    })

    const [errorMessage, setErrorMessage] = useState(null)

    async function handleSubmit(e) {
        e.preventDefault()

        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}authentication`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })

        const data = await response.json()

        if (response.status === 200){
            setCurrentUser(data.user)
            navigate('/')
        } else {
            setErrorMessage(data.message)
        }
    }

    return(
        <Container>
            <h1>LoginForm</h1>
            {errorMessage !== null? <>{errorMessage}</>: null}
            <Form onSubmit={handleSubmit}>
                <Row sm={1} >
                    <Form.Group as={Col}>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter an email" value={credentials.email} required onChange={e => setCredentials({...credentials, email: e.target.value})}/>
                    </Form.Group>
                </Row>
                <Row sm={1} >
                    <Form.Group as={Col}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter a password" value={credentials.password} required onChange={e => setCredentials({...credentials, password: e.target.value})}/>
                    </Form.Group>
                </Row>
                <Button variant="dark" type='submit'>
                    Submit
                </Button>
            </Form>
        </Container>
    )
}