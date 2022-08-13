import { useState } from "react"
import {Form, Button, Row, Col} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'

export default function NewUnitForm () {
    const navigate = useNavigate()

    const [unit, setUnit] = useState({
        name: '', 
        army: '', 
        weapon_skill: null, 
        ballistic_skill: null, 
        strength: null, 
        toughness: null, 
        attacks: null, 
        wounds: null, 
        save: null
    })

    async function handleSubmit(e) {
        e.preventDefault()

        await fetch(`http://localhost:5000/unitdata`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(unit)
        })

        navigate('../')
    }

    return(
        <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridNames">
                    <Form.Label>Unit</Form.Label>
                    <Form.Control type="text" placeholder="Enter unit name" onChange={e => setUnit({...unit, name: e.target.value})}/>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Army</Form.Label>
                    <Form.Control type="text" placeholder="Enter army name" onChange={e => setUnit({...unit, army: e.target.value})}/>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col}>
                    <Form.Label>WS</Form.Label>
                    <Form.Control type="number" onChange={e => setUnit({...unit, weapon_skill: e.target.value})}/>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>BS</Form.Label>
                    <Form.Control type="number" onChange={e => setUnit({...unit, ballistic_skill: e.target.value})}/>
                </Form.Group><Form.Group as={Col}>
                    <Form.Label>S</Form.Label>
                    <Form.Control type="number" onChange={e => setUnit({...unit, strength: e.target.value})}/>
                </Form.Group><Form.Group as={Col}>
                    <Form.Label>T</Form.Label>
                    <Form.Control type="number" onChange={e => setUnit({...unit, toughness: e.target.value})}/>
                </Form.Group><Form.Group as={Col}>
                    <Form.Label>A</Form.Label>
                    <Form.Control type="number" onChange={e => setUnit({...unit, attacks: e.target.value})}/>
                </Form.Group><Form.Group as={Col}>
                    <Form.Label>W</Form.Label>
                    <Form.Control type="number" onChange={e => setUnit({...unit, wounds: e.target.value})}/>
                </Form.Group><Form.Group as={Col}>
                    <Form.Label>Sv</Form.Label>
                    <Form.Control type="number" onChange={e => setUnit({...unit, save: e.target.value})}/>
                </Form.Group>
            </Row>

            <Button variant="dark" type="submit">
                Submit
            </Button>
        </Form>
    )
}