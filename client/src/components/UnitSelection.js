import {useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap'


export default function UnitSelection () {
    const [units, setUnits] = useState([])

    const [calcSelection, setCalcSelection] = useState({
        attacker: "", 
        defender: ""
    })



    useEffect(() => {
        const fetchData = async () => {
            const unitRepsonse = await fetch(`http://localhost:5000/unitdata`)

            const unitResData = await unitRepsonse.json()
            setUnits(unitResData)
        }
        fetchData()

    },[])

    let renderOptions = units.map(unit => {
        return (
            <option value={unit.id} key={unit.id}>{unit.name}</option>
        )
    })

    let renderUnitData

    return (
        <Form>
            <Form.Label>To begin, please select the attacking unit:</Form.Label>
            <Form.Select aria-label="Unit select" onChange={e => {
                setCalcSelection({...calcSelection, attacker: e.target.value})
                console.log(e.target.value)
            }}>
                <option key="-1">Select a unit...</option>
                {renderOptions}
            </Form.Select>
            <Form.Label>Next, please select the defending unit:</Form.Label>
            <Form.Select aria-label="Unit select" onChange={e => setCalcSelection({...calcSelection, defender: e.target.value})}>
                <option>Select a unit...</option>
                {renderOptions}
            </Form.Select>
            <br />
            <Button variant="dark" type="submit" onClick={console.log(calcSelection)}>
                Calculate
            </Button>
        </Form>
    )
}