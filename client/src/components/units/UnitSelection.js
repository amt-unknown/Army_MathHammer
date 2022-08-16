import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router'


export default function UnitSelection (props) {    

    const navigate = useNavigate()

    function renderOptions(option=0){
        return props.units.map(unit => {
            return (
                <option value={unit.id} key={option+unit.unit_id}>{unit.name}</option>
            )
        })
    } 

    function onSubmit() {
        if (props.calcSelection.attaker !== "" && props.calcSelection.defender !== "") {
            props.setPageDisplayed("calculate")
        }
    }

    return (
        <Form >
            <Form.Label>To begin, please select the attacking unit:</Form.Label>
            <Form.Select aria-label="Attacking unit select" onChange={e => props.setCalcSelection({...props.calcSelection, attacker: e.target.value})}>
                <option key="attackerSelect">Select a unit...</option>
                {renderOptions("attacker")}
            </Form.Select>
            <Form.Label>Next, please select the defending unit:</Form.Label>
            <Form.Select aria-label="Defending unit select" onChange={e => props.setCalcSelection({...props.calcSelection, defender: e.target.value})}>
                <option key="defenderSelect">Select a unit...</option>
                {renderOptions("defender")}
            </Form.Select>
            <br />
            <Button variant="dark" onClick={() => {onSubmit()}} >
                Calculate
            </Button>
        </Form>
    )
}