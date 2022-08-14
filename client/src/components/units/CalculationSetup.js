import { Container, Table , Form} from "react-bootstrap"
import { useEffect, useState} from "react"

export default function Calculation(props) {

    const [units, setUnits] = useState([{},{}])
    const [weapons, setWeapons] = useState([{},{}])

    useEffect(() => {

        const fetchData = async () => {
            const attackerRepsonse = await fetch(`http://localhost:5000/unitdata/${props.calcSelection.attacker}`)
            const defenderResponse = await fetch(`http://localhost:5000/unitdata/${props.calcSelection.defender}`)

            const attackerResData = await attackerRepsonse.json()
            const defenderResData = await defenderResponse.json()
            setUnits([attackerResData, defenderResData])
        }

        
        fetchData()

        

    },[])

    console.log(units)

    function renderWeaponOptions (weapons) {
        if(weapons){
            return weapons.map(weapon => {
                return (
                    <option value={weapon.id} key={weapon.weapon_id}>{weapon.name}</option>
                )
            })
        }
    }

    function renderTables () {
        
        return units.map((unit) => {
            return (
                <div>

                    <Table striped bordered hovered>
                        <thead>
                            <tr sm={1}>
                                <th colSpan={4} width="50%">Unit Name</th>
                                <th colSpan={4}>Army</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr sm={1}>
                                <td colSpan={4}>{unit.name}</td>
                                <td colSpan={4}>{unit.army}</td>
                            </tr>
                        </tbody>
                        <thead>
                            <tr xs={3}>
                                <th colSpan={1} width="12.5%">WS</th>
                                <th colSpan={1} width="12.5%">BS</th>
                                <th colSpan={1} width="12.5%">S </th>
                                <th colSpan={1} width="12.5%">T </th>
                                <th colSpan={1} width="12.5%">A </th>
                                <th colSpan={1} width="12.5%">W </th>
                                <th colSpan={1} width="12.5%">Sv</th>
                                <th colSpan={1} width="12.5%"></th>
                            </tr>
                        </thead>
                        <tbody><tr xs={3}>
                            <td colSpan={1}>{unit.weapon_skill}</td>
                            <td colSpan={1}>{unit.ballistic_skill}</td>
                            <td colSpan={1}>{unit.strength}</td>
                            <td colSpan={1}>{unit.toughness}</td>
                            <td colSpan={1}>{unit.attacks}</td>
                            <td colSpan={1}>{unit.wounds}</td>
                            <td colSpan={1}>{unit.save}</td>
                            <td colSpan={1}></td>
                        </tr>
                        </tbody>
                    </Table>
                    <Form>

                        {/* // Use Dropdown Buttons */}

                        <Form.Label>Select a Weapon:</Form.Label>
                        <Form.Select aria-label="Unit select">
                            {renderWeaponOptions(unit.weapons)}
                        </Form.Select>
                    </Form>
                </div>
            )
        })
    }

    

    return (
        <Container>
            {renderTables()}
        </Container>
    )

}