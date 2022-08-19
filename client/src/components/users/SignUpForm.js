import { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import {Form, Button, Row, Col, Container} from 'react-bootstrap'

export default function SignUpForm() {
    const navigate = useNavigate()

    const [user, setUser ] = useState({
        firstName: '', 
        lastName: '', 
        password: ''
    })

    async function handleSubmit(e) {
        e.preventDefault()

        await fetch(`${process.env.REACT_APP_SERVER_URL}user`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(user)
        })

        navigate('/')
    }

    return (
        <Container>
            <h1>Sign Up</h1>
            <Form onSubmit={handleSubmit}>
                <Row sm={1}>
                    <Form.Group as={Col}>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter your first name" required onChange={e => setUser({...user, firstName: e.target.value})}/>
                    </Form.Group>
                </ Row>
                <Row sm={1} >
                    <Form.Group as={Col}>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter your last name" required onChange={e => setUser({...user, lastName: e.target.value})}/>
                    </Form.Group>
                </Row>
                <Row sm={1} >
                    <Form.Group as={Col}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter a password" required onChange={e => setUser({...user, password: e.target.value})}/>
                    </Form.Group>
                </Row>
                <Button variant="dark" type='submit'>
                    Submit
                </Button>
            </Form>
        </Container>
    )
}