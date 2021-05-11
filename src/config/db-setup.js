
const mongoose = require('mongoose');

// connect to mongo db
const mongoUri = `mongodb+srv://scoopy:${process.env.MONGODB_PASSWORD}@webcluster.jdw9h.mongodb.net/AnimePI?retryWrites=true&w=majority`|| 'AnimePI'
mongoose.set('useUnifiedTopology', true)
mongoose.set('useFindAndModify', false)
mongoose.connect(mongoUri, { useNewUrlParser: true })

mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`)
})

module.exports = mongoose.connection