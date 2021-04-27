const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: {type: String, required: true },
    password: {type: String, select: false }, 
    watchedShows: [{type:Schema.Types.ObjectId, ref: "Show"}],
    favoritedShows: [{type:Schema.Types.ObjectId, ref: "Show"}]
})

UserSchema.pre('findOne', function (next) {
    this.populate('watchedShows')
    this.populate('favoritedShows')
    next()
})

UserSchema.pre('find', function (next) {
    this.populate('watchedShows')
    this.populate('favoritedShows')
    next()
})

const User = mongoose.model('User', UserSchema)

module.exports = User