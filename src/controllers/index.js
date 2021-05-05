const express = require('express')
const showRoutes = require('./show.js')
const genreRoutes = require('./genre.js')
const platformRoutes = require('./platform.js')

const router = express.Router()


//route directories go here
router.use('/shows', showRoutes)
router.use('/genres', genreRoutes)
router.use('/platforms', platformRoutes)

module.exports = router