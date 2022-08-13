import UnitSelection from "./UnitSelection"
import {Button, Container} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import {useState, useEffect} from 'react'

export default function Home() {
    const navigate = useNavigate()

    const [units, setUnits] = useState([])
    const [pageDisplayed, setPageDisplayed] = useState("home")
    const [calcSelection, setCalcSelection] = useState({
        attacker: "", 
        defender: ""
    })

    console.log(pageDisplayed)
    useEffect(() => {
        const fetchData = async () => {
            const unitRepsonse = await fetch(`http://localhost:5000/unitdata`)

            const unitResData = await unitRepsonse.json()
            setUnits(unitResData)
        }
        fetchData()

    },[])


    const renderPageDisplay = () => {
        switch (pageDisplayed) {
            case "home": 
                return (<div>
                        <h3>Overview:</h3>
                        <p>Inspired by the tabletop game Warhammer 40k by Gamesworkshop,
                        this website is dedicated to providing detailed probabilty 
                        and statistics for unit interactions. It is often seen that 
                        the basic probabilites do not sufficiently cover special rules such as "Re-rolls"
                        and "Re-roll a result of 1." The aim is to provide further 
                        insight to these special cases.  </p>

                        <UnitSelection units={units} calcSelection={calcSelection} setCalcSelection={setCalcSelection} setPageDisplayed={setPageDisplayed}/>

                        <br/>
                        <p>Don't see the unit your are looking for? Click below to add your desired unit.</p>
                        <Button variant="dark" onClick={e => navigate('/createUnit')}>Create a Unit</Button>
                    </div>
                )
                break;
            case "calculate":
                return <div>Calculate</div>
                break;
            }
    }

    return (
        <Container>
            

            {renderPageDisplay()}

            
        </Container>
    )
}