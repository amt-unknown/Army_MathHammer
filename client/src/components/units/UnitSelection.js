import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router'


export default function UnitSelection (props) {    

    const navigate = useNavigate()
    

    function renderOptions(option=0){
        if(props.units){
            return props.units.map(unit => {
                return (
                    <option value={unit.id} key={option+unit.unit_id}>{unit.name}</option>
                )
            })
        } 
    }

    async function fetchData(index, name) {
                const response = await fetch(`${process.env.REACT_APP_SERVER_URL}unitdata/${name}`)

                const resData = await response.json()
                if(index===0){
                    props.setCalcSelection([resData,props.calcSelection[1]])
                } else {
                    props.setCalcSelection([props.calcSelection[0], resData])
                }
    }


    return (
        <Form >
            <Form.Label>To begin, please select the attacking unit:</Form.Label>
            <Form.Select aria-label="Attacking unit select" onChange={e => fetchData(0,e.target.value)}>
                <option key="attackerSelect">Select a unit...</option>
                {renderOptions("attacker")}
            </Form.Select>
            <Form.Label>Next, please select the defending unit:</Form.Label>
            <Form.Select aria-label="Defending unit select" onChange={e => fetchData(1,e.target.value)}>
                <option key="defenderSelect">Select a unit...</option>
                {renderOptions("defender")}
            </Form.Select>
        </Form>
    )
}