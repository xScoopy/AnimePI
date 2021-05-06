const express = require('express')
const Genre = require('../models/genre')
const Platform = require('../models/platform')
const router = express.Router()

const Show = require('../models/show')

/* Routes for Shows */

//Retrieves all shows
router.get('/', (req, res) => {
    Show.find().then((shows) => {
        return res.json({ shows })
    })
        .catch((err) => {
            throw err.message
        })
})

//Retrieves a show by Id
router.get('/:showId', (req, res) => {
    Show.findOne({ _id: req.params.showId })
        .then((result) => {
            res.json(result)
        })
        .catch(err => {
            throw err.message
        })
})

//Posts a new show
router.post('/', (req, res) => {
    let show = new Show(req.body)
    show.save()
        .then((showResult) => {
            return res.json({ show: showResult })
        })
        .catch((err) => {
            throw err.message
        })
})

//Updates an existing show
router.put('/:showId', (req, res) => {
    Show.findByIdAndUpdate({ _id: req.params.showId }, req.body)
        .then(() => {
            return Show.findOne({ _id: req.params.showId })
        })
        .then((updatedShow) => {
            return res.json({ updatedShow })
        })
        .catch((err) => {
            throw err.message
        })
})

//Adds a genre to a show
router.put('/:showId/addGenre', (req, res) => {
    console.log(req.body.genre)
    Genre.findOne({ name: req.body.genre })
        .then((genre) => {
            Show.findOne({ _id: req.params.showId })
                .then((show) => {
                    show.genres.unshift(genre)
                    return show.save()
                })
                .then((show) => {
                    //breaking here
                    genre.shows.unshift(show)
                    return genre.save()
                })
                .then(() => {
                    return Show.findOne({ _id: req.params.showId })
                })
                .then((updatedShow) => {
                    return res.json({ updatedShow})
                })
                .catch((err) => {
                    throw err.message
                 })      
        })
        .catch((err) => {
            throw err.message
        })
})

//Adds a platform to a show
router.put('/:showId/addPlatform', (req, res) => {
    console.log(req.body.platform)
    Platform.findOne({ name: req.body.platform })
        .then((platform) => {
            Show.findOne({ _id: req.params.showId })
                .then((show) => {
                    show.platforms.unshift(platform)
                    return show.save()
                })
                .then((show) => {
                    platform.shows.unshift(show)
                    return platform.save()
                })
                .then(() => {
                    return Show.findOne({ _id: req.params.showId })
                })
                .then((updatedShow) => {
                    return res.json({ updatedShow})
                })
                .catch((err) => {
                    throw err.message
                 })      
        })
        .catch((err) => {
            throw err.message
        })
})

//Deletes an existing show
router.delete('/:showId', (req, res) => {
    Show.findByIdAndDelete(req.params.showId)
        .then((result) => {
            if (result === null) {
                return res.json({ message: 'Show does not exist' })
            }
            return res.json({
                'message': 'Successfully deleted.',
                '_id': req.params.userId
            })
        })
        .catch((err) => {
            throw err.message
        })
})
module.exports = router