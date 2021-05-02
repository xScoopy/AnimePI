const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.get('/', (req,res) => {
    User.find().then((users) => {
        return res.json({users})
    })
    .catch((err) => {
        throw err.message
    })
})