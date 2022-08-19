import { Dropdown, Container, Table, Button} from 'react-bootstrap'
import {useState} from 'react'
import { useNavigate } from 'react-router'
import NewWeaponForm from './NewWeaponForm'


export default function WeaponSelection (props) {    
    const navigate = useNavigate()

    const [index, setIndex] = useState(0)
    const [newWeapon, setNewWeapon] = useState({})
    const [showForm, setShowForm] = useState(false)

    function selectWeapon(weapon){
        let exist=false

        props.selWeapons.forEach(selWeapon => {
            if(selWeapon.weapon_id === weapon.weapon_id) {
                exist=true
            }
        })

        if (!exist) {
            if(index !== 0) {
                props.setSelWeapons([...props.selWeapons, weapon])
            } else {
                props.setSelWeapons([weapon])
            }
            setIndex(index+1)
        }
        
    }

    function renderDropdownItems(){
        return props.weapons.map(weapon => {
            return (
                <Dropdown.Item key={weapon.weapon_id} onClick={(e)=> {selectWeapon(weapon)}}>{weapon.name}</Dropdown.Item>
            )
        })
    } 

    function renderWeaponTable(){
        return props.selWeapons.map(weapon => {
            return(
                <Table key={"tableWeapon"+weapon.name}striped bordered>
                    <thead>
                            <tr sm={1}>
                                <th colSpan={2} width="50%">Weapon Name</th>
                                <th colSpan={2}>Range Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr sm={1}>
                                <td colSpan={2}>{weapon.name}</td>
                                <td colSpan={2}>{weapon.range_type}</td>
                            </tr>
                        </tbody>
                        <thead>
                            <tr xs={3}>
                                <th colSpan={1} width="25%">S </th>
                                <th colSpan={1} width="25%">A </th>
                                <th colSpan={1} width="25%">D </th>
                                <th colSpan={1} width="25%">AP</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr xs={3}>
                                <td colSpan={1}>{weapon.strength}</td>
                                <td colSpan={1}>{weapon.attacks}</td>
                                <td colSpan={1}>{weapon.damage}</td>
                                <td colSpan={1}>{weapon.armor_penetration}</td>
                            </tr>
                        </tbody>
                        <thead>
                            <tr>
                                <th colSpan={4}>Special Rule</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan={4}>{weapon.special_rule? weapon.special_rule: "none"}</td>
                            </tr>
                        </tbody>
                </Table>
            )
        })
    }

    return(
        <Container>
                <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="dropdown-weapon1">
                        Please select a weapon
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {renderDropdownItems()}
                    </Dropdown.Menu>
                </Dropdown>
                <Button variant="dark" key="newWeapon" onClick={(e) => navigate("/createweapon")}>Create new weapon</Button>
                <br />
                {showForm? <NewWeaponForm index={index} selectWeapon={selectWeapon} setShowForm={setShowForm} selWeapons={props.selWeapons} setSelWeapons={props.setSelWeapons}/>: ""}
            <br />
            {renderWeaponTable()}
        </Container>
    )
}