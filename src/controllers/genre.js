const express = require('express')
const router = express.Router()

const Genre = require('../models/genre')


/* Routes */

//Retrieves list of all genres
router.get('/', (req, res) => {
    Genre.find().then((genres) => {
        return res.json({genres})
    })
    .catch((err) => {
        throw err.message
    })
})

//Retrieves a genre of a specified Id
router.get('/:genreId', (req, res) => {
    Genre.findOne({_id: req.params.genreId})
    .then((result) => {
        res.json(result)
    })
    .catch((err) => {
        throw err.message
    })
})

//Retrieves all shows of a specific genre
router.get('/:genreId/shows', (req, res) => {
    Genre.findOne({_id: req.params.genreId}).populate("shows")
    .then((result) => {
        res.json(result["shows"])
    })
    .catch((err) => {
        throw err.message
    })
})

//Posts a new Genre
router.post('/', (req,res) => {
    let genre = new Genre(req.body)
    genre.save()
    .then(() => {
        return res.send(genre)
    })
    .catch(err => {
        throw err.message
    })
})

//Updates an Existing Genre
router.put('/:genreId', (req, res) => {
    Genre.findByIdAndUpdate(req.params.genreId, req.body)
    .then(() => {
        return Genre.findOne({_id: req.params.genreId })
    })
    .then((updatedGenre) => {
        return res.json({updatedGenre})
    })
    .catch((err) => {
        throw err.message
    })
})

//Deletes an existing Genre
router.delete('/:genreId', (req, res) => {
    Genre.findByIdAndDelete(req.params.genreId)
    .then((result) => {
        if (result === null) {
            return res.json({message: 'Genre does not exist'})
        }
        return res.json({
            'message': 'Successfully deleted.',
            '_id': req.params.genreId
        })
    })
    .catch((err) => {
        throw err.message
    })
})

module.exports = router