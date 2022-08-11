const router = require('express').Router()
const db = require("../models")

const { WeaponData } = db


// GET route to find all weapons
router.get('/', async (req, res) => {
    const weaponData = await WeaponData.findAll()
    res.json(weaponData)
})

// GET route via id
router.get('/:weaponName', async (req, res) => {
    const weaponName = req.params.weaponName
    const weaponData = await WeaponData.findOne({
        where: {name: weaponName}
    })
    if (!weaponData) {
        res.status(404).json({message: `Could not find an entry with that name: ${weaponName}`});
    } else {
        res.json(weaponData);
    }  
})

//POST route for new entries
router.post('/', async (req, res) => {
    let weaponName = req.body.name
    const weaponData = await WeaponData.findOne({
        where: { name: weaponName}
    })

    if (weaponData) {
        res.status(404).json({message: "Sorry, a weapon with name already exists"})
    } else {
        weaponData = await WeaponData.create(req.body);
        res.json(weaponData);
    }
})

//PUT route via id
// '../weapondata/:id'
router.put('/:weaponName', async (req, res) => {
    const weaponName = req.params.weaponName;
    const weaponData = await WeaponData.findOne({
        where: { name: weaponName}
    });
    if (!weaponData) {
        res.status(404).json({message: `Could not find an entry with that name: ${weaponName}`});
    } else {
        Object.assign(weaponData, req.body)
        await weaponData.save()
        res.json(weaponData);
    }
    
});

//DELETE route via id
router.delete('/:weaponName', async (req, res) => {
    const weaponName = req.params.weaponName;
    const weaponData = await WeaponData.findOne({
        where: { name: weaponName}
    });
    if (!weaponData) {
        res.status(404).json({message: `Could not find an entry with that id: ${weaponName}`});
    } else {
        await weaponData.destroy()
        res.json(weaponData);
    }
    
});

module.exports = router