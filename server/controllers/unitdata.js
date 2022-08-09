const router = require('express').Router()
const db = require("../models")

const { UnitData } = db

router.post('/', async (req, res) => {
    const user = await UnitData.create(req.body)
    res.json(user)
})


router.get('/', async (req, res) => {
    const users = await UnitData.findAll()
    res.json(users)
})

module.exports = router