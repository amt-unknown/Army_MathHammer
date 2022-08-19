import { useState, useEffect } from "react"
import {Form, Button, Row, Col, Container, InputGroup} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import WeaponSelection from "./WeaponSelection"

export default function NewUnitForm () {
    const navigate = useNavigate()
    const [validated, setValidated] = useState(false)

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
            const weaponResponse = await fetch(`${process.env.REACT_APP_SERVER_URL}weapondata`)

            const weaponResData = await weaponResponse.json()
            setWeapons(weaponResData)
        }
        fetchData()

    },[])

    async function handleSubmit(e) {
        // e.preventDefault()
        // const form = e.currentTarget
        // if (form.checkValidity() === false){
            e.preventDefault()
        //     e.stopPropagation()
        // } else {
        //     setValidated(true)
        // }

        // if(validated) {
            // console.log(unit, selWeapons)
            await fetch(`${process.env.REACT_APP_SERVER_URL}unitdata`, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({...unit,weapons:selWeapons})
            })
            navigate('/')
    
        // } else {
        // }
    }


    return(
        <Container>
            <br />
            <Form validated={validated} onSubmit={handleSubmit}>
                <Button variant="dark" type="submit" >
                    Submit New Unit
                </Button>
                <Row sm={1}>
                    <Form.Group as={Col} controlId="formGridNames">
                        <Form.Label>Unit</Form.Label>
                            <Form.Control type="text" placeholder="Enter unit name" required onChange={e => setUnit({...unit, name: e.target.value})}/>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">Please enter the unit's name</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Army</Form.Label>
                        <Form.Control type="text" placeholder="Enter army name" required onChange={e => setUnit({...unit, army: e.target.value})}/>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">Please enter the unit's army</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row xs={4} sm={7}>
                    <Form.Group as={Col}>
                        <Form.Label>WS</Form.Label>
                        <Form.Control type="number" placeholder="2-6" min={2} max={6} required onChange={e => setUnit({...unit, weapon_skill: e.target.value})}/>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">Please select a number between 2 and 6</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>BS</Form.Label>
                        <Form.Control type="number" placeholder="2-6" min={2} max={6} required onChange={e => setUnit({...unit, ballistic_skill: e.target.value})}/>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">Please select a number between 2 and 6</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>S</Form.Label>
                        <Form.Control type="number" placeholder="1-20" min={1} max={20} required onChange={e => setUnit({...unit, strength: e.target.value})}/>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">Please select a number between 1 and 20</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>T</Form.Label>
                        <Form.Control type="number" placeholder="1-20" min={1} max={20} required onChange={e => setUnit({...unit, toughness: e.target.value})}/>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">Please select a number between 1 and 20</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>A</Form.Label>
                        <Form.Control type="number" placeholder="1-20" min={1} max={20} required onChange={e => setUnit({...unit, attacks: e.target.value})}/>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">Please select a number between 1 and 20</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>W</Form.Label>
                        <Form.Control type="number" placeholder="1-50" min={1} max={50} required onChange={e => setUnit({...unit, wounds: e.target.value})}/>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">Please select a number between 1 and 50</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Sv</Form.Label>
                        <Form.Control type="number" placeholder="2-6" min={2} max={6} required onChange={e => setUnit({...unit, save: e.target.value})}/>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">Please select a number between 2 and 6</Form.Control.Feedback>
                    </Form.Group>
                </Row>
            </Form>
            <br/>
            <p>Please select weapons before submission</p>
            {weapons.length!==0? <WeaponSelection weapons={weapons} selWeapons={selWeapons} setSelWeapons={setSelWeapons}/>: ""}
            <br />
        </Container>
    )
}