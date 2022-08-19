const router = require('express').Router()
const db = require('../models')
const bcrypt = require('bcrypt')

const {User} = db

router.get('/profile', async (req, res) => {
    console.log(req.session.userId)
    try {
        let user = await User.findOne({
            where: {user_id: req.session.userId}
        })
        res.json(user)
    } catch {
        res.json(null)
    }
})



router.post('/', async (req,res) => {
    
    let user = await User.findOne({
        where: {email: req.body.email}
    })

    if (!user || !await bcrypt.compare(req.body.password, user.passwordDigest)){
        res.status(404).json({
            message: `Could not find a user with the provided email and password`
        })
    } else {
        req.session.userId = user.user_id
        res.json({user})
    }
})

module.exports = router