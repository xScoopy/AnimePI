const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PlatformSchema = new Schema({
    name: {type: String, required: true },
    shows: [{type: Schema.Types.ObjectId, ref: "Show" }]
})

PlatformSchema.pre('findOne', function (next){
    this.populate('shows')
    next()
})

PlatformSchema.pre('find', function (next) {
    this.populate('shows')
})

const Platform = mongoose.model('Platform', PlatformSchema)

module.exports = Platform 