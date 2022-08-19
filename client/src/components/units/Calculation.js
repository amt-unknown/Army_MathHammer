import { Container, Table , Button} from "react-bootstrap"
import { useEffect, useState} from "react"
import {useNavigate} from 'react-router'
import MathCalc from "./MathCalculations"
import UnitSelection from './UnitSelection'


export default function Calculation(props) {

    const navigate = useNavigate()
    const [units, setUnits] = useState([])
    const [weapons, setWeapons] = useState([])
    const [calcSelection, setCalcSelection] = useState([{},{}])

    useEffect(() => {
        const fetchData = async () => {
            const unitRepsonse = await fetch(`${process.env.REACT_APP_SERVER_URL}unitdata`)

            const unitResData = await unitRepsonse.json()
            setUnits(unitResData)
        }
        fetchData()

    },[])


    function renderUnitDataTables () {
        let type = ["Attacking", "Defending"]
        
        if(units){
            return calcSelection.map((unit, index) => {
                return (
                    <div>
    
                        <Table striped bordered>
                            <thead>
                                <tr sm={1}>
                                    <th colSpan={4} width="50%">{type[index]} Unit's Name</th>
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
                            <tbody>
                                <tr xs={3}>
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
                        {}
                    </div>
                )
            })
        }
    }


    function renderWeaponStats(weapons=[]){
        const calcSetup = new MathCalc(units[0], units[1])

        let weaponStats = weapons.map(weapon => {
            return(calcSetup.calcStats(weapon.attacks, weapon.strength))
        })
        let weaponNames = weapons.map(weapon => weapon.name)
        
        let allStats = [calcSetup.calcStats(),...weaponStats]
        let allNames = ['Unarmed', ...weaponNames]
        
        function createRowEntries() {
            return(
                allNames.map((entry,index) => {
                    return(
                        <tr>
                                <td>{entry}</td>
                                <td>{allStats[index][0]}</td>
                                <td>{allStats[index][1]}</td>
                        </tr>
                    )
                })
            )
        }

        return (
            <Table striped bordered>
                <thead>
                    <tr>
                        <th>Weapon Name:</th>
                        <th>Average Wounds</th>
                        <th>Average Variation</th>
                    </tr>
                </thead>
                <tbody>
                    {createRowEntries()}
                </tbody>
            </Table>
        )
    }

    function displayTables(){
        if(Object.keys(calcSelection[0]).length && Object.keys(calcSelection[1]).length) {
            return(
                <>
                <br />
                <h2>Character Datasheets</h2>
                {renderUnitDataTables()}
                <h3>Statistics based on weapons:</h3>
                {renderWeaponStats(calcSelection[0].weapons)}
                </>
            )
        }
    }

    return (
        <Container>
            <UnitSelection units={units} calcSelection={calcSelection} setCalcSelection={setCalcSelection}/>
            {displayTables()}
            <Button variant='dark' type='button' onClick={e => navigate('/')}>Back</Button>
        </Container>
    )

}