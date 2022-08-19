import {Button, Container} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import {useState, useEffect} from 'react'

export default function Home({navigation}) {
    const navigate = useNavigate()

    return (
        <Container>
            <h3>Overview:</h3>
                        <p>Inspired by the tabletop game Warhammer 40k by Gamesworkshop,
                        this website is dedicated to providing detailed probabilty 
                        and statistics for unit interactions. It is often seen that 
                        the basic probabilites do not sufficiently cover special rules such as "Re-rolls"
                        and "Re-roll a result of 1." The aim is to provide further 
                        insight to these special cases.  </p>

                        <h4>Calculate statistics:</h4>
                        <p>To calculate statistics on existing character sheets press the button below.</p>

                        <Button variant="dark" onClick={e => navigate("/calculation")}>View Statistics</Button>
                        <br/>
                        <br/>
                        <p>Don't see the character your are looking for? Click below to add your desired unit.</p>
                        <Button variant="dark" onClick={e => navigate("/createUnit")}>Create a Unit</Button>
        </Container>
    )
}