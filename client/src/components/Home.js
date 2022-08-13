import UnitSelection from "./UnitSelection"
import {Button} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'

export default function Home() {
    const navigate = useNavigate()

    return (
        <main>
            <h3>Overview:</h3>
            <p>Inspired by the tabletop game Warhammer 40k by Gamesworkshop,
                 this website is dedicated to providing detailed probabilty 
                 and statistics for unit interactions. It is often seen that 
                 the basic probabilites do not sufficiently cover special rules such as "Re-rolls"
                  and "Re-roll a result of 1." The aim is to provide further 
                  insight to these special cases.  </p>

            <h3>Calculator:</h3>
            <UnitSelection />

            <p>Don't see the unit your are looking for? Click below to add your desired unit.</p>
            <Button variant="dark" onClick={navigate('./createUnit')}>Create a Unit</Button>
        </main>
    )
}