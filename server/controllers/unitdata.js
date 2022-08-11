const router = require('express').Router()
const db = require("../models")

const { UnitData } = db


// GET route for entire unitdata table
router.get('/', async (req, res) => {
    const unitData = await UnitData.findAll()
    res.json(unitData)
})

// GET route via id
router.get('/:unitName', async (req, res) => {
    const unitName = req.params.unitName;
    const unitData = await UnitData.findOne({
            where: { name: unitName}
        });
        if (!unitData) {
            res.status(404).json({message: "Could not find an entry with that id: ${unitDataId"});
        } else {
            res.json(unitData);
        }   
});

//POST route for new entries
router.post('/', async (req, res) => {
    let unitName = req.body.name
    const unitData = await UnitData.findOne({
        where: { name: unitName}
    })

    if (unitData) {
        res.status(404).json({message: "Sorry, a unit with name already exists"})
    } else {
        unitData = await UnitData.create(req.body);
        res.json(unitData);
    }

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