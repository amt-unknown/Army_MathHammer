import {useEffect, useState } from 'react';
import { Form } from 'react-bootstrap'


export default function UnitSelection () {
    const [units, setUnits] = useState([])

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
            <option value={unit.id}>{unit.name}</option>
        )
    })

    let renderUnitData

    return (
        <Form>
            <Form.Label>To begin, please select the attacking unit:</Form.Label>
            <Form.Select aria-label="Unit select">
                <option>Select a unit...</option>
                {renderOptions}
            </Form.Select>
            <Form.Label>Next, please select the defending unit:</Form.Label>
            <Form.Select aria-label="Unit select">
                <option>Select a unit...</option>
                {renderOptions}
            </Form.Select>
        </Form>
    )
}