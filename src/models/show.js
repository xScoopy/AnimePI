const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ShowSchema = new Schema({
    title: { type:String, required: true }, 
    publisher: { type:String, required: true},
    genres: [{ type: Schema.Types.ObjectId, ref: "Genre", required: true }],
    platforms: [{ type: Schema.Types.ObjectId, ref: "Platform", required: true }],
    watchedBy: [{ type: Schema.Types.ObjectId, ref: "User"}],
    favoritedBy: [{ type: Schema.Types.ObjectId, ref: "User"}]
})

ShowSchema.pre('findOne', function (next) {
    this.populate('platforms')
    this.populate('watched_by')
    this.populate('genres')
    this.populate('favorited_by')
    next()
})

ShowSchema.pre('find', function (next) {
    this.populate('platforms')
    this.populate('watched_by')
    this.populate('genres')
    this.populate('favorited_by')
    next()
})

const Show = mongoose.model('Show', ShowSchema)

module.exports = Show