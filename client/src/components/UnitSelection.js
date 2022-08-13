import {useState } from 'react';
import { Form, Button } from 'react-bootstrap'


export default function UnitSelection (props) {    

    console.log(props)

    function renderOptions(option=0){
        return props.units.map(unit => {
            return (
                <option value={unit.id} key={option+unit.unit_id}>{unit.name}</option>
            )
        })
    } 

    // let renderUnitData

    return (
        <Form>
            <Form.Label>To begin, please select the attacking unit:</Form.Label>
            <Form.Select aria-label="Unit select" onChange={e => props.setCalcSelection({...props.calcSelection, attacker: e.target.value})}>
                <option key="attackerSelect">Select a unit...</option>
                {renderOptions("attacker")}
            </Form.Select>
            <Form.Label>Next, please select the defending unit:</Form.Label>
            <Form.Select aria-label="Unit select" onChange={e => props.setCalcSelection({...props.calcSelection, defender: e.target.value})}>
                <option key="defenderSelect">Select a unit...</option>
                {renderOptions("defender")}
            </Form.Select>
            <br />
            <Button variant="dark" type="submit" >
                Calculate
            </Button>
        </Form>
    )
}