import { Container, Table } from "react-bootstrap"
import { useEffect, useState} from "react"

export default function Calculation(props) {

    const [attacker, setAttacker] = useState({})
    const [defender, setDefender] = useState({})

    useEffect(() => {

        const fetchData = async () => {
            const attackerRepsonse = await fetch(`http://localhost:5000/unitdata/${props.calcSelection.attacker}`)
            const defenderResponse = await fetch(`http://localhost:5000/unitdata/${props.calcSelection.defender}`)

            const attackerResData = await attackerRepsonse.json()
            const defenderResData = await defenderResponse.json()
            setAttacker(attackerResData)
            setDefender(defenderResData)
        }
        fetchData()

    },[])

    console.log(attacker)

    return (
        <Container>
            
        </Container>
    )

}