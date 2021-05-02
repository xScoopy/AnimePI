require('dotenv').config()
const app = require('../server.js')
const mongoose = require('mongoose')
const chai = require('chai')
const chaiHttp = require('chai-http')
const assert = chai.assert

const Show = require('../models/show.js')
const User = require('../models/user.js')
const Genre = require('../models/genre.js')
const Platform = require('../models/platform.js')

chai.config.includeStack = true 

const expect = chai.expect
const should = chai.should()
chai.use(chaiHttp)

after((done) => {
    // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
    mongoose.models = {}
    mongoose.modelSchemas = {}
    mongoose.connection.close()
    done()
  })

describe('Shows API endpoints', () => {
    // creates a sample user, show, 
    beforeEach((done) => {
        const sampleUser = new User({
            username: 'test', 
            password: 'testpass'
        })
        const sampleGenre = new Genre({
            name: 'test genre',
            shows: []
        })
        const samplePlatform = new Platform({
            name: 'test platform',
            shows: []
        })
        const sampleShow = new Show({
            title: 'test show', 
            publisher: 'test publisher',
            genres: [],
            platforms: [],
            watchedBy: [],
            favoritedBy: []
        })
        sampleGenre.save()
        .then(() => {
            sampleShow.genres.unshift(sampleGenre)
            return sampleShow.save()
        })
        .then(() => {
            sampleGenre.shows.unshift(sampleGenre)
            return sampleGenre.save()
        })
        .then(() => {
            return samplePlatform.save()
        })
        .then(() => {
            sampleShow.platforms.unshift(samplePlatform)
            return sampleShow.save()
        })
        .then(() => {
            samplePlatform.shows.unshift(sampleShow)
            return samplePlatform.save()
        })
        .then(() => {
            return sampleUser.save()
        })
        .then(() => {
            done()
        })
    })

    afterEach((done) => {
        User.deleteMany({ username: ['test'] })
        Genre.deleteMany({ name: ['test genre'] })
        Platform.deleteMany({ name: ['test platform'] })
        Show.deleteMany({ title: ['test show', 'another show'] })
        .then(() => {
            done()
        })
        .catch((err) => {
            console.log(err)
        })
    })

    it('should load all shows in json format', (done) => {
        chai.request(app)
        .get('/shows')
        .end((err,res) => {
            if (err) { done(err) }
            expect(res).to.have.status(200)
            expect(res.body.shows).to.be.an("array")
            done();
        })
    })

    it('should get one specific show', (done)  => {
        Show.findOne({title: 'test show'})
        .then((show) => {
            chai.request(app)
            .get(`/shows/${show._id}`)
            .end((err, res) => {
                if (err) {done(err)}
                expect(res).to.have.status(200)
                expect(res.body).to.be.an('object')
                expect(res.body.title).to.equal('test show')
                expect(res.body.publisher).to.equal('test publisher')
                expect(res.body.genres).to.be.an('array')
                done()
            })
        })
    })

    it('should post a new show', (done) => {
        
    })
})