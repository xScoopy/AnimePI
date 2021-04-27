const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GenreSchema = new Schema({
    name: {type: String, required: true },
    shows: [{type: Schema.Types.ObjectId, ref: "Show" }]
})

GenreSchema.pre('findOne', function (next) {
    this.populate('shows')
    next()
})

GenreSchema.pre('find', function (next) {
    this.populate('shows')
    next()
})

const Genre = mongoose.model('Genre', GenreSchema)

module.exports = Genre