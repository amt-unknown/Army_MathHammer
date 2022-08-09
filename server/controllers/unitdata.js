const router = require('express').Router()
const db = require("../models")

const { UnitData } = db



router.get('/', async (req, res) => {
    const unitData = await UnitData.findAll()
    res.json(unitData)
})

router.post('/', async (req, res) => {
    const unitData = await UnitData.create(req.body)
    res.json(unitData)
})

module.exports = router