import { Dropdown } from 'react-bootstrap'
import {useState} from 'react'


export default function WeaponSelection (props) {    

    const [selWeapons, setSelWeapons] = useState([])
    const [index, setIndex] = useState(0)

    function addWeapon(weapon){
        let exist=false
        selWeapons.forEach(item => {
            if(item.weapon_id === weapon.weapon_id){
                exist = true
            }
        })
        console.log(selWeapons)
        if (!exist) {
            console.log(index)
            index!==0?setSelWeapons(selWeapons.push(weapon)):setSelWeapons(selWeapons[0]=[weapon])
            setIndex(index+1)
        }

    }

    function renderDropdownItems(){
        return props.weapons.map(weapon => {
            return (
                <Dropdown.Item key={weapon.weapon_id} onClick={(e)=> {addWeapon(weapon)}}>{weapon.name}</Dropdown.Item>
            )
        })
    } 

    return (
        <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-weapon1">
                Please select a weapon
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {renderDropdownItems()}
            </Dropdown.Menu>
        </Dropdown>    
        )
}