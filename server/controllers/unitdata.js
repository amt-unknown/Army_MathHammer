const router = require('express').Router()
const db = require("../models")

const { UnitData, UnitWeapons, WeaponData } = db


// GET route for entire unitdata table
router.get('/', async (req, res) => {
    const unitData = await UnitData.findAll()
    res.json(unitData)
})

// GET route via id
router.get('/:unitName', async (req, res) => {
    const unitName = req.params.unitName;
    const unitData = await UnitData.findOne({
            where: { name: unitName},
            include: [
                {
                    model: WeaponData,
                    as: 'weapons'
                }
            ]
        });
        if (!unitData) {
            res.status(404).json({message: "Could not find an entry with that id: ${unitDataId"});
        } else {
            res.json(unitData);
        }   
});

//POST route for new entries
router.post('/', async (req, res) => {
    const unit = {
        name: req.body.name,
        army: req.body.army, 
        weapon_skill: req.body.weapon_skill, 
        ballistic_skill: req.body.ballistic_skill, 
        strength: req.body.strength, 
        toughness: req.body.toughness, 
        attacks: req.body.attacks, 
        wounds: req.body.wounds, 
        save: req.body.save
    }
    let unitData = await UnitData.findOne({
        where: { name: unit.name}
    })

    if (unitData) {
        res.status(404).json({message: "Sorry, a unit with name already exists"})
    } else {
        unitData = await UnitData.create(req.body);
    }
    //Add weapon associations if necessary
    const unitWeapons = req.body.weapons
    console.log(unitWeapons)
    if (unitWeapons) {
        unitWeapons.forEach(async weapon => {
            let weaponData = await WeaponData.findOne({
                where: {name: weapon.name}
            })
            if (weaponData) { 
                const unitWeaponData = await UnitWeapons.create({
                        unit_id: unitData.unit_id,
                        weapon_id: weaponData.weapon_id
                })
            } else {
                console.log("Sorry, that weapon does not exist")
            }
        })
    }
        
        res.json(unitData);
    

});

//PUT route via name
router.put('/:unitName', async (req, res) => {
    const unitName = req.params.unitName;
    const unitData = await UnitData.findOne({
        where: { name: unitName}
    });
    if (!unitData) {
        res.status(404).json({message: `Could not find an entry with that id: ${unitName}`});
    } else {
        Object.assign(unitData, req.body)
        await unitData.save()
        res.json(unitData);
    }
    
});

//DELETE route via name
router.delete('/:unitName', async (req, res) => {
    const unitName = req.params.unitName;
    const unitData = await UnitData.findOne({
        where: { name: unitName}
    });
    if (!unitData) {
        res.status(404).json({message: `Could not find an entry with that id: ${unitName}`});
    } else {
        await unitData.destroy()
        res.json(unitData);
    }
    
});


module.exports = router;