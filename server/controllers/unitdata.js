const router = require('express').Router()
const db = require("../models")

const { UnitData } = db


// GET route for entire unitdata table
// '../unitdata/'
router.get('/', async (req, res) => {
    const unitData = await UnitData.findAll()
    res.json(unitData)
})

// GET route via id
// '../unitdata/:id'
router.get('/:unitDataId', async (req, res) => {
    const unitDataId = Number(req.params.unitDataId);
    if (isNaN(unitDataId)) {
        res.status(404).json({message: "Invalid ID: ${unitDataId}"});
    } else {
        const unitData = await UnitData.findOne({
            where: { id: unitDataId}
        });
        if (!unitData) {
            res.status(404).json({message: "Could not find an entry with that id: ${unitDataId"});
        } else {
            res.json(unitData);
        }   
    }
});

//POST route for new entries
// '../unitdata/'
router.post('/', async (req, res) => {
    const unitData = await UnitData.create(req.body);
    res.json(unitData);
});

//PUT route via id
// '../unitdata/:id'
router.put('/:unitDataId', async (req, res) => {
    const unitDataId = Number(req.params.unitDataId);
    if (isNaN(unitDataId)) {
        res.status(404).json({message: "Invalid ID: ${unitDataId}"});
    } else {
        const unitData = await UnitData.findOne({
            where: { id: unitDataId}
        });
        if (!unitData) {
            res.status(404).json({message: "Could not find an entry with that id: ${unitDataId"});
        } else {
            Object.assign(unitData, req.body)
            await unitData.save()
            res.json(unitData);
        }
    }
});

//DELETE route via id
router.delete('/:unitDataId', async (req, res) => {
    const unitDataId = Number(req.params.unitDataId);
    if (isNaN(unitDataId)) {
        res.status(404).json({message: "Invalid ID: ${unitDataId}"});
    } else {
        const unitData = await UnitData.findOne({
            where: { id: unitDataId}
        });
        if (!unitData) {
            res.status(404).json({message: "Could not find an entry with that id: ${unitDataId"});
        } else {
            await unitData.destroy()
            res.json(unitData);
        }
    }
});





module.exports = router;