import { useState, useEffect } from "react"
import { Container, Button, Form, Row, Col, InputGroup} from 'react-bootstrap'

export default function NewWeaponForm(props) {
    const [validated, setValidated] = useState(false)

    const [weapon, setWeapon] = useState({
        name: '',
        range_type: 'Ranged', 
        strength: null, 
        attacks: null, 
        damage: '', 
        armor_penetration: null,
        special_rules: null
    })

    async function handleSubmit(e) {
        const form = e.currentTarget
        if (form.checkValidity() === false){
            e.preventDefault()
            e.stopPropagation()
        } else {
            setValidated(true)
        }

        console.log(weapon)
        if(validated) {
            await fetch(`${process.env.REACT_APP_SERVER_URL}weapondata`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(weapon)
            })


            props.selectWeapon(weapon)
            props.setShowForm(false)
        }


    }
    return(
        <Container> 
        <Form noValidate validated={validated}>
            <Row sm={1}>
                <Form.Group as={Col} controlId="formGridNames">
                    <Form.Label>Weapon</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control type="text" placeholder="Enter weapon name" onChange={e => setWeapon({...weapon, name: e.target.value})}/>
                        <Form.Control.Feedback type="invalid">Please enter the weapons's name</Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Range-Type</Form.Label>
                    <Form.Select aria-label="WeaponSelect" onChange={e => setWeapon({...weapon, range_type: e.target.value})}>
                        <option key="Ranged" value="Ranged">Ranged</option>
                        <option key="Melee" value="Melee">Melee</option>
                    </Form.Select>
                </Form.Group>
            </Row>
            <Row xs={4} sm={7}>
                <Form.Group as={Col}>
                    <Form.Label>S</Form.Label>
                    <Form.Control type="number" placeholder="1-20" min={1} max={20} onChange={e => setWeapon({...weapon, strength: e.target.value})}/>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>A</Form.Label>
                    <Form.Control type="number" placeholder="1-20" min={1} max={20} onChange={e => setWeapon({...weapon, attacks: e.target.value})}/>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>D</Form.Label>
                    <Form.Control type="text" placeholder="1-6" onChange={e => setWeapon({...weapon, damage: e.target.value})}/>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>AP</Form.Label>
                    <Form.Control type="number" placeholder="-6-0" min={-6} max={0} onChange={e => setWeapon({...weapon, armor_penetration: e.target.value})}/>
                </Form.Group>
            </Row>
            <Row>
                <Form.Group as={Col}>
                    <Form.Label>Special Rules</Form.Label>
                    <Form.Select aria-label="SpecialSelect" onChange={e => setWeapon({...weapon, special_rules: e.target.value})}>
                        <option key="none" value={null}>Null</option>
                    </Form.Select>
                </Form.Group>
            </Row>
            <Button variant="dark" type="submit" onClick={handleSubmit}>
                Submit New Weapon
            </Button>
        </Form>
        </Container >
    )
}