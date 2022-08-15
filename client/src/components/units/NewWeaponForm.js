import { useState, useEffect } from "react"
import { Container, Button, Form, Row, Col} from 'react-bootstrap'

export default function NewWeaponForm(props) {
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
        e.preventDefault()
        
        await fetch(`http://localhost:5000/weapondata`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(weapon)
        })

        props.selectWeapon(weapon)
        props.setShowForm(false)

    }
    return(
        <Form onSubmit={handleSubmit}>
            <Row sm={1}>
                <Form.Group as={Col} controlId="formGridNames">
                    <Form.Label>Weapon</Form.Label>
                    <Form.Control type="text" placeholder="Enter weapon name" onChange={e => setWeapon({...weapon, name: e.target.value})}/>
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
                    <Form.Control type="number" onChange={e => setWeapon({...weapon, strength: e.target.value})}/>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>A</Form.Label>
                    <Form.Control type="number" onChange={e => setWeapon({...weapon, attacks: e.target.value})}/>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>D</Form.Label>
                    <Form.Control type="text" onChange={e => setWeapon({...weapon, damage: e.target.value})}/>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>AP</Form.Label>
                    <Form.Control type="number" onChange={e => setWeapon({...weapon, armor_penetration: e.target.value})}/>
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
            <Button variant="dark" type="submit">
                Submit New Weapon
            </Button>
        </Form>
    )
}