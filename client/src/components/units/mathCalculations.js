const {combinations,sqrt} = require('mathjs')

class MathCalc {
    constructor(attacker={}, defender={}) {
        this.attacker = attacker;
        this.defender = defender;
    }

    //Methods
    calcBasicHits(attacks = this.attacker.attacks, type="ranged") {
        let skill = this.attacker.ballistic_skill
        if (type == "melee") {
            skill = this.attacker.weapon_skill
        }

        if(attacks) {
            //converts raw value of ballistic skill(BS) into probability. 
            //E.g., a BS of 4 means a roll of a D6 of 4 or more hits thus prob=(7-4)/6=1/2
            let prob = (7-skill)/6

            //Generates probability distribution with number of hits ranging from  0,1,...,attacks-1, attacks hits
            let probDist = []
            for (let i = 0; i < attacks + 1; i++) {
                probDist.push(combinations(attacks, i)*(prob)**i*(1-prob)**(attacks-i))
              
            }
            return probDist
        } else {
            return []
        }
    }

    calcBasicWounds(hits = this.attacker.atacks, weapon_strength=this.attacker.strength){
        let strength = weapon_strength
        //Converts attacker's strength(S) and defender's toughness(T) into a probability.
        //E.g., if S is less than T but greater than 1/2T the probability is 1/3
        if(this.attacker && this.defender) {
            let prob
            if (strength*2 <= this.defender.toughness) {
                prob = 1/6
            } else if ((strength*2 > this.defender.toughness) && (strength < this.defender.toughness)){
                prob = 1/3
            } else if (strength == this.defender.toughness) {
                prob = 1/2
            } else if ((strength > this.defender.toughness) && (strength < 2*this.defender.toughness)) {
                prob = 2/3
            } else {
                prob = 5/6
            }

            //Generates probability distribution for number of wounds ranging from 0,1,...,hits-1, hits wounds
            let probDist = []
            for (let i = 0; i < hits + 1; i++) {
                probDist.push(combinations(hits, i)*(prob)**i*(1-prob)**(hits-i))
              
            }
            return probDist
        } else {
            return []
        }
    }

    calcBasicFailedSaves(wounds=this.attacker.attacks){
        if(this.defender){
            let prob = (7-this.defender.save)/6

            let probDist = []
            for (let i = 0; i < wounds + 1; i++) {
                probDist.push(combinations(wounds, i)*(prob)**(wounds-i)*(1-prob)**i )
              
            }
            return probDist
        } else {
            return []
        }

        

    }

    //Returns distribution of overarching results. 

    /*
        total possible = n
            Hits       Wounds     FailedSaves

                Pw(n|n)      Ps(n|n)
          /  n  --------- n --------  n     -->   P(n) = Ph(n)*Pw(n|n)*Ps(n|n)
         /Ph(n) \            \
        /        \Pw(n-1|n)   \Ps(n-1|n)
       |          \            \
       |   /  n-1 ------- n-1 ------- n-1   --->  P(n-1) = Ph(n)*Pw(n|n)*Ps(n-1|n) + Ph(n)*Pw(n-1|n)*Ps(n-1|n-1) + Ph(n-1)*Pw(n-1|n-1)*Ps(n-1|n-1)
       |  /Ph(n-1)  \            \
       | /           \Pw(n-2|n),  \
       |/             \Pw(n-2|n-1) \
        ----- n-2  ------- n-2 ------- n-2  --->  P(n-2) = TripleSum(Ph(i)*Pw(j|i)*Ps(k|j))   (i,j,k from n-2 to n))
        
        . . . . . . . . . . . . . . . . . . . 

         \            \ P(0|n)    \ P(0|n)
          \ Ph(0)      \ ...       \ ... 
           \            \ P(0|0)    \ P(0|0)
            \ 0 ----------- 0 --------- 0  ----->  P(0) = TripleSum(Ph(i)*Pw(j|i)*P(k|j))  (i,j,k from 0 to n)
    */
    calcBasicResultsDist(attacks=this.attacker.attacks){
        if(attacks) {
            let probDist = []
            for (let i = 0; i < attacks+1; i++){
                probDist.push(0)
            }
            let hitsDist = this.calcBasicHits(attacks)
            let woundsDist = []
            let fSavesDist = []

            for(let j = 0; j < attacks + 1; j++) {
                woundsDist.push(this.calcBasicWounds(j))
                fSavesDist.push(this.calcBasicFailedSaves(j))

            }

            for(let i = attacks; i >= 0; i--) {
                for(let j = woundsDist[i].length-1; j >= 0; j--) {
                    for(let k = fSavesDist[j].length-1; k>=0; k--) {

                        probDist[k] += hitsDist[i]*woundsDist[i][j]*fSavesDist[j][k]
                    }
                }
            }

            return probDist
            

        } else {
            return []
        }


    }

    //Calculates Expectation(mean) and Standard Deviation
    // Expectation = Sum(x * P(x))
    // Standard Deviation = Sqrt(Sum( x^2 * P(x)))
    calcStats(attacks=this.attacker.attacks) {
        if(attacks) {
            let dist = this.calcBasicResultsDist(attacks)
            let exp = 0
            let std = 0
    
            for(let i=0; i < dist.length; i++){
                exp+=i*dist[i]
                std+=i**2*dist[i]
            }
            std=sqrt(std)
    
            return[exp, std, dist]
        } else {
            return [0,0,[]]
        }
    }
}

attacker = {
    "unit_id": 7,
    "name": "Scout",
    "army": "Marines",
    "weapon_skill": 3,
    "ballistic_skill": 2,
    "strength": 5,
    "toughness": 4,
    "attacks": 3,
    "wounds": 2,
    "save": 3,
    "createdAt": "2022-08-11T04:21:14.079Z",
    "updatedAt": "2022-08-11T04:21:14.079Z",
    "weapons": [
        {
            "weapon_id": 2,
            "name": "Rifle",
            "range_type": "Ranged",
            "strength": 4,
            "attacks": 2,
            "damage": "1",
            "armor_penetration": 2,
            "special_rules": null,
            "createdAt": "2022-08-11T03:23:48.137Z",
            "updatedAt": "2022-08-11T03:23:48.137Z",
            "UnitWeapons": {
                "unit_weapons_id": 1,
                "unit_id": 7,
                "weapon_id": 2
            }
        }
    ]
}
defender = {
    "unit_id": 7,
    "name": "Scout",
    "army": "Marines",
    "weapon_skill": 4,
    "ballistic_skill": 4,
    "strength": 4,
    "toughness": 4,
    "attacks": 3,
    "wounds": 2,
    "save": 6,
    "createdAt": "2022-08-11T04:21:14.079Z",
    "updatedAt": "2022-08-11T04:21:14.079Z",
    "weapons": [
        {
            "weapon_id": 2,
            "name": "Rifle",
            "range_type": "Ranged",
            "strength": 4,
            "attacks": 2,
            "damage": "1",
            "armor_penetration": 2,
            "special_rules": null,
            "createdAt": "2022-08-11T03:23:48.137Z",
            "updatedAt": "2022-08-11T03:23:48.137Z",
            "UnitWeapons": {
                "unit_weapons_id": 1,
                "unit_id": 7,
                "weapon_id": 2
            }
        }
    ]
}

test = new MathCalc(attacker, defender)

console.log(test.calcStats(10))