const express = require('express')
const router = express.Router()

const Show = require('../models/show')

/* Routes for Shows */ 

//Retrieves all shows
router.get('/', (req, res) => {
    Show.find().then((shows) => {
        return res.json({shows})
    })
    .catch((err) => {
        throw err.message
    })
})

//Retrieves a show by Id
router.get('/:showId', (req, res) => {
    Show.findOne({_id: req.params.showId})
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
        return res.json({show: showResult})
    })
    .catch((err) => {
        throw err.message
    })
})

//Updates an existing show
router.put('/:showId', (req, res) => {
    Show.findByIdAndUpdate({_id: req.params.showId}, req.body)
    .then(() => {
        return Show.findOne({_id:req.params.showId})
    })
    .then((updatedShow) => {
        return res.json({updatedShow})
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
            return res.json({message: 'Show does not exist'})
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