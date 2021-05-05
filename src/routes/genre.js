const express = require('express')
const router = express.Router()

const Genre = require('../models/genre')


/* Routes */

router.get('/', (req, res) => {
    Genre.find().then((genres) => {
        return res.json({genres})
    })
    .catch((err) => {
        throw err.message
    })
})



module.exports = router