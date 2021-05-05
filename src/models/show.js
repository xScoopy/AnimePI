const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ShowSchema = new Schema({
    title: { type:String, required: true }, 
    publisher: { type:String, required: true},
    genres: [{ type: Schema.Types.ObjectId, ref: "Genre"}],
    platforms: [{ type: Schema.Types.ObjectId, ref: "Platform"}]
})

ShowSchema.pre('findOne', function (next) {
    this.populate('platforms')
    this.populate('genres')
    next()
})

ShowSchema.pre('find', function (next) {
    this.populate('platforms')
    this.populate('genres')
    next()
})

const Show = mongoose.model('Show', ShowSchema)

module.exports = Show