import { useState, useEffect } from "react"
import {Form, Button, Row, Col, Container} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import WeaponSelection from "./WeaponSelection"

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
    const [weapons, setWeapons] = useState([])

    const [selWeapons, setSelWeapons] = useState([])


    useEffect(() => {
        const fetchData = async () => {
            const weaponResponse = await fetch(`http://localhost:5000/weapondata`)

            const weaponResData = await weaponResponse.json()
            setWeapons(weaponResData)
        }
        fetchData()

    },[])

    async function handleSubmit(e) {
        e.preventDefault()

        setUnit()
        

        await fetch(`http://localhost:5000/unitdata`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...unit,weapons:selWeapons})
        })

        navigate('../')
    }

    // function addWeaponSlot() {
    //     return(

    //     )
    // }

    return(
        <Container>
            <br />
            <Form >
                <Row sm={1}>
                    <Form.Group as={Col} controlId="formGridNames">
                        <Form.Label>Unit</Form.Label>
                        <Form.Control type="text" placeholder="Enter unit name" onChange={e => setUnit({...unit, name: e.target.value})}/>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Army</Form.Label>
                        <Form.Control type="text" placeholder="Enter army name" onChange={e => setUnit({...unit, army: e.target.value})}/>
                    </Form.Group>
                </Row>
                <Row xs={4} sm={7}>
                    <Form.Group as={Col}>
                        <Form.Label>WS</Form.Label>
                        <Form.Control type="number" onChange={e => setUnit({...unit, weapon_skill: e.target.value})}/>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>BS</Form.Label>
                        <Form.Control type="number" onChange={e => setUnit({...unit, ballistic_skill: e.target.value})}/>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>S</Form.Label>
                        <Form.Control type="number" onChange={e => setUnit({...unit, strength: e.target.value})}/>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>T</Form.Label>
                        <Form.Control type="number" onChange={e => setUnit({...unit, toughness: e.target.value})}/>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>A</Form.Label>
                        <Form.Control type="number" onChange={e => setUnit({...unit, attacks: e.target.value})}/>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>W</Form.Label>
                        <Form.Control type="number" onChange={e => setUnit({...unit, wounds: e.target.value})}/>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Sv</Form.Label>
                        <Form.Control type="number" onChange={e => setUnit({...unit, save: e.target.value})}/>
                    </Form.Group>
                </Row>
            </Form>
            <br/>
            {weapons.length!==0? <WeaponSelection weapons={weapons} selWeapons={selWeapons} setSelWeapons={setSelWeapons}/>: ""}
            <br />
            <Button variant="dark" type="button" onClick={handleSubmit}>
                Submit New Unit
            </Button>
        </Container>
    )
}