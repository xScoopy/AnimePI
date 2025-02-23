const express = require('express')
const { deleteOne } = require('../models/platform')
const router = express.Router()
const Platform = require('../models/platform')

/* Routes for Platforms */

//Retrieves list of all platforms
router.get('/', (req, res) => {
    Platform.find().then((platforms) => {
        return res.json({platforms})
    })
    .catch((err) => {
        throw err.message
    })
})

//Retrieves a platform by Id
router.get('/:platformId', (req, res) => {
    Platform.findOne({_id: req.params.platformId})
    .then((result) => {
        return res.json(result)
    })
    .catch((err) => {
        throw err.message
    })
})

//Retrieves all shows of a specific platform
router.get('/:platformId/shows', (req, res) => {
    Platform.findOne({_id: req.params.platformId}).populate("shows")
    .then((result) => {
        res.json(result["shows"])
    })
    .catch((err) => {
        throw err.message
    })
})

//Posts a new Platform
router.post('/', (req, res) => {
    let platform = new Platform(req.body)
    platform.save()
    .then(() => {
        return res.send(platform)
    })
    .catch((err) => {
        throw err.message  
    })
})

//Updates an existing platform by id
router.put('/:platformId', (req, res) => {
    Platform.findByIdAndUpdate(req.params.platformId, req.body)
    .then(() => {
        return Platform.findOne({_id: req.params.platformId})
    })
    .then((updatedPlatform) => {
        return res.json({updatedPlatform})
    })
    .catch((err) => {
        throw err.message
    })
})

//Deletes an existing platform
router.delete('/:platformId', (req, res) => {
    Platform.findByIdAndDelete(req.params.platformId)
    .then((result) => {
        if (result === null) {
            return res.json({message: 'Platform does not exist.'})
        }
        return res.json({
            'message' : 'Successfully deleted.',
            '_id': req.params.platformId
        })
    })
    .catch((err) => {
        throw err.message
    })
})


module.exports = router